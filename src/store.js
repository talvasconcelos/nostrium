import { writable } from "svelte/store";
import { SimplePool, nip19 } from "nostr-tools";

export const state = writable({
  posts: [],
  profiles: new Map(),
  relaysForProfile: new Map(),
  loading: true
});

const defaultRelays = [
  "wss://relay.damus.io",
  "wss://relay.snort.social",
  "wss://nos.lol",
  "wss://nostr.wine",
  "wss://relay.nostr.bg",
  "wss://nostr-pub.wellorder.net",
  "wss://nostr-pub.semisol.dev",
  "wss://eden.nostr.land",
  "wss://nostr.mom",
  "wss://nostr.fmt.wiz.biz",
  "wss://nostr.zebedee.cloud",
];

const pool = new SimplePool()
let relays = defaultRelays;

export async function initAuthor(params) {
  let {author: pubkey, relays} = params;

  // detemine relays to use for pubkey
  let givenRelays = relays || [];
  try {
    let { type, data } = nip19.decode(pubkey)
    if (type === 'npub') pubkey = data
    else if (type === 'nprofile') {
      pubkey = data.pubkey
      givenRelays = data.relays
    }
  } catch (err) { /**/ }

  if (givenRelays.length < 4) {
    givenRelays = [...givenRelays, ...(await searchDefaultRelaysForKind10002(pubkey))]
  }

  if (givenRelays.length >= 4) {
    relays = givenRelays
  }

  // connect to all relays
  console.log(relays)

  let awaitables = []

  // fetch metadata
  let r1 = pool.get(relays, {authors: [pubkey], kinds: [0]}).then((event) => {
    if (!event) return

    try {
      state.update(s => {
        s.profiles.set(event.pubkey, JSON.parse(event.content))
        return s
      })
    } catch (err) { /**/ }
  })
  awaitables.push(r1)

  // fetch all posts regardless
  let r2 = pool.list(relays, [{authors: [pubkey], kinds: [30023], limit: 15}]).then((events) => {
    state.update(s => {
      s.posts = events.map(eventToPost)
      if (!params.id || s.posts.find(post => post.id === params.id)) s.loading = false
      return s
    })
  })
  awaitables.push(r2)

  if (params.id) {
    // fetch specific post
    let r3 = pool.get(relays, {kinds: [30023], limit: 1, authors: [pubkey], '#d': [params.id]}).then((event) => {
      state.update(s => {
        if (event) {
          let post = eventToPost(event)
          if (!s.posts.find(post => post.d === post.d)) s.posts.push(post)
        }
        s.loading = false
        return s
      })
    })
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
  let relaysList = await pool.get(defaultRelays, {kinds: [10002], authors: [pubkey]})
  if (!relaysList) return []

  let relays = []

  relaysList.tags.forEach(([t, v]) => {
    if (t === 'r' && v) {
      relays.push(v)
    }
  })

  await pool.close(defaultRelays)

  return relays
}
