<script>
  import {nip19} from 'nostr-tools'
  import {onMount} from 'svelte'
  import PostCard from './components/PostCard.svelte'
  import {init, state} from './store'

  export let params
  let pubkey

  onMount(async () => {
    pubkey = params.author
    let givenRelays, d, kind
    if (!pubkey.toLowerCase().match(/^[0-9a-f]{64}$/)) {
      try {
        let {type, data} = nip19.decode(pubkey)
        if (type === 'npub') pubkey = data
        else if (type === 'nprofile') {
          pubkey = data.pubkey
          givenRelays = data.relays
        } else if (type === 'naddr') {
          d = data.identifier
          kind = data.kind
          if (kind !== 30023) throw new Error(`invalid kind ${kind}`)
          pubkey = data.pubkey
          givenRelays = data.relays
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    await init({author: pubkey, relays: givenRelays})
  })

  $: posts = Array.from($state.posts.values()).filter(p => p.pubkey == pubkey)
</script>

<div aria-busy={$state.loading}>
  {#if posts && posts.length}
    {#each Array.from(posts.values()) as post}
      <PostCard {post} />
    {/each}
  {:else if !$state.loading}
    <p>No posts found for "{params.author}".</p>
  {/if}
</div>
