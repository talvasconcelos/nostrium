import {SimplePool} from 'nostr-tools'
import {writable} from 'svelte/store'

export const state = writable({
  authors: new Set(),
  posts: new Map(),
  profiles: new Map(),
  relaysForProfile: new Map(),
  loading: true
})

const defaultRelays = [
  'wss://relay.damus.io',
  'wss://relay.snort.social',
  'wss://nos.lol',
  'wss://nostr.wine',
  'wss://relay.nostr.bg',
  'wss://nostr-pub.wellorder.net',
  'wss://nostr-pub.semisol.dev',
  'wss://eden.nostr.land',
  'wss://nostr.mom',
  'wss://nostr.fmt.wiz.biz',
  'wss://nostr.zebedee.cloud'
]

const pool = new SimplePool({
  getTimeout: 100000
})
let relays = defaultRelays

export async function init({author: pubkey, relays, d}) {
  state.update(s => ({...s, loading: true}))

  // detemine relays to use for pubkey
  let givenRelays = relays || []

  if (givenRelays.length < 4) {
    givenRelays = [
      ...givenRelays,
      ...defaultRelays
      //...(await searchDefaultRelaysForKind10002(pubkey)) // sometimes this takes too long
    ]
  }

  if (givenRelays.length >= 4) {
    relays = givenRelays
  }

  // connect to all relays
  console.log(relays)

  let awaitables = []

  // fetch metadata
  let r1 = await pool
    .get(relays, {authors: [pubkey], kinds: [0]})
    .then(event => {
      if (!event) return

      try {
        state.update(s => {
          s.profiles.set(event.pubkey, JSON.parse(event.content))
          if (!s.authors.has(event.pubkey)) {
            s.authors.add(event.pubkey)
          }
          return s
        })
      } catch (err) {
        console.debug(err)
      }
      console.log('R1')
      return
    })
    .catch(err => console.debug(err))
  awaitables.push(r1)

  // fetch all posts regardless
  let r2 = pool
    .list(relays, [{authors: [pubkey], kinds: [30023], limit: 15}])
    .then(events => {
      if (!events || events.length == 0) return
      state.update(s => {
        events.map(ev => {
          let post = eventToPost(ev)
          s.posts.set(post.d, post)
        })
        s.loading = false
        return s
      })
      console.log('R2')
      return
    })
    .catch(err => console.debug(err))
  awaitables.push(r2)

  if (d) {
    // fetch specific post
    let r3 = await pool
      .get(relays, {
        kinds: [30023],
        limit: 1,
        authors: [pubkey],
        '#d': [d]
      })
      .then(event => {
        if (!event) return
        state.update(s => {
          if (event) {
            let post = eventToPost(event)
            if (post.d && !s.posts.has(post.d)) {
              s.posts.set(post.d, post)
            }
          }
          s.loading = false
          return s
        })
        console.log('R3')
        return
      })
      .catch(err => console.debug(err))
    awaitables.push(r3)
  }
  await Promise.all(awaitables)

  pool.close(relays)
}

export function getRelaysForEvent(id) {
  return pool.seenOn(id)
}

function eventToPost(event) {
  return {...event, ...Object.fromEntries(event.tags)}
}

async function searchDefaultRelaysForKind10002(pubkey) {
  let relaysList = await pool.get(defaultRelays, {
    kinds: [10002],
    authors: [pubkey]
  })
  if (!relaysList) return defaultRelays

  let relays = []

  relaysList.tags.forEach(([t, v]) => {
    if (t === 'r' && v) {
      relays.push(v)
    }
  })

  return relays
}
