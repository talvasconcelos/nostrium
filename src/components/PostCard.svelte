<script>
  import {nip19} from 'nostr-tools'
  import {link} from 'svelte-spa-router'
  import {getRelaysForEvent, state} from '../store'
  import Avatar from './Avatar.svelte'

  export let post

  $: name = $state.profiles.get(post.pubkey)?.name
  $: picture = $state.profiles.get(post.pubkey)?.picture
  $: date = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(post.created_at * 1000)
  $: npub = nip19.npubEncode(post.pubkey)
  $: relays = getRelaysForEvent(post.id)
  $: nprofile =
    relays.length > 0
      ? nip19.nprofileEncode({pubkey: post.pubkey, relays})
      : npub
  const naddr = nip19.naddrEncode({
    pubkey: post.pubkey,
    kind: 30023,
    identifier: post.d,
    relays
  })
</script>

<article>
  <div class="content">
    {#if post.image}
      <a href={`/p/${naddr}`} use:link>
        <figure style={`background-image: url(${post.image})`}>
          <img src={post.image} alt={post.title} />
        </figure>
      </a>
    {/if}
    <hgroup>
      <div>
        <a href={`/p/${naddr}`} use:link><h5>{post.title}</h5></a>
        {#if post.summary}
          <p>
            <small>{post.summary}</small>
          </p>
        {/if}
      </div>
      <a href={`/p/${naddr}`} use:link><small>{date}</small></a>
    </hgroup>
  </div>
  <footer>
    <div class="author">
      {#if picture}
        <Avatar {picture} />
      {/if}
      <div class="detail">
        {#if name}
          <small>{name}</small>
        {/if}
        <a class="npub" href={`nostr:${nprofile}`}>{npub}</a>
      </div>
    </div>
  </footer>
</article>

<style>
  article .content {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  a {
    text-decoration: none;
  }
  hgroup {
    /* max-height: 150px;
    overflow-y: clip; */
    margin-bottom: 0;
    margin-left: 1rem;
    display: flex;
    justify-content: space-between;
  }
  figure {
    margin: 0;
    width: 150px;
    height: 150px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 3px;
  }
  img {
    display: none;
  }
  footer {
    /* display: flex;
    flex-direction: row; */
    /* justify-content: space-evenly;
    align-items: center; */
  }
  .npub {
    font-size: 0.7rem;
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
