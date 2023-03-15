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
    if (!pubkey.match(/^[0-9a-f]{64}$/)) {
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
    if (!$state.authors.has(pubkey)) {
      await init({author: pubkey, relays: givenRelays})
    }
  })

  $: posts = Array.from($state.posts.values()).filter(p => p.pubkey == pubkey)
  $: profile = $state.profiles?.get(pubkey)
  $: npub = pubkey ? nip19.npubEncode(pubkey) : null
</script>

<svelte:head>
  <title>Author</title>
  <!-- Open Graph -->
  {#if profile}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={profile.name ?? 'Anon'} />
    {#if profile.about}
      <meta
        name="twitter:description"
        content={`${profile.name ?? 'Anon'} articles on Nostr`}
      />
      <meta
        property="og:description"
        content={`${profile.name ?? 'Anon'} articles on Nostr`}
      />
    {:else}
      <meta name="twitter:description" content="Nostrium author page" />
      <meta property="og:description" content="Nostrium author page" />
    {/if}
    {#if profile.image}
      <meta name="twitter:image" content={profile.image} />
      <meta property="og:image" content={profile.image} />
    {/if}
    <meta property="twitter:url" content={`https://read.nostr.com/${npub}`} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={`https://read.nostr.com/${npub}`} />
    <meta property="og:title" content={profile.name ?? 'Anon'} />
  {/if}
</svelte:head>

<div aria-busy={$state.loading}>
  {#if posts && posts.length}
    {#each Array.from(posts.values()) as post}
      <PostCard {post} />
    {/each}
  {:else if !$state.loading}
    <p>No posts found for "{params.author}".</p>
  {/if}
</div>
