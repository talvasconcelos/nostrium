<script>
  import {nip19} from 'nostr-tools'
  import {onMount} from 'svelte'
  import {link} from 'svelte-spa-router'
  import Avatar from './components/Avatar.svelte'
  import Markdown from './components/Markdown.svelte'
  import {init, state} from './store'

  export let params
  let {type, data} = nip19.decode(params.naddr)

  $: d = data.identifier
  $: kind = data.kind
  $: pubkey = data.pubkey
  $: relays = data.relays || []

  onMount(async () => {
    //if (!post) {
    await init({author: pubkey, relays, d})
    //}
  })

  $: post = $state.posts.get(d)

  $: profile = $state.profiles?.get(pubkey)
  $: npub = pubkey ? nip19.npubEncode(pubkey) : null
  $: nprofile = npub
    ? relays.length > 0
      ? nip19.nprofileEncode({pubkey, relays})
      : npub
    : null
</script>

<div aria-busy={$state.loading}>
  {#if post}
    <header>
      <h1>{post.title}</h1>
      {#if post.image}
        <section>
          <figure style={`background-image: url(${post.image})`}>
            <img src={post.image} alt={post.title} />
          </figure>
        </section>
      {/if}
    </header>
    <Markdown>{post?.content}</Markdown>
  {:else if !post && !$state.loading}
    <p>Article "{d}" not found.</p>
    <p>
      Go back to <a href={`/${nprofile}`} use:link>{npub}</a>.
    </p>
  {/if}
  <section>
    <footer>
      {#if profile}
        <div class="author">
          {#if profile.picture}
            <Avatar picture={profile.picture} />
          {/if}
          <div class="detail">
            {#if profile.name}
              <small>{profile.name}</small>
            {:else}
              <small>{pubkey.slice(0, 5)}...{pubkey.slice(-5)}</small>
            {/if}
            <a href={`/${nprofile}`} use:link>More from this author...</a>
          </div>
        </div>
      {/if}
    </footer>
  </section>
</div>

<style>
  figure {
    margin: 0;
    width: 100%;
    height: 350px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  img {
    display: none;
  }
  .author {
    display: flex;
  }
  .detail {
    display: flex;
    flex-flow: column nowrap;
    margin-left: 1rem;
  }
</style>
