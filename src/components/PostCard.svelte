<script>
  import { nip19 } from 'nostr-tools';
  import { link } from "svelte-spa-router";
  import { state, getRelaysForEvent } from "../store";
  import Avatar from "./Avatar.svelte";

  export let post, params;

  $: name = $state.profiles.get(post.pubkey)?.name;
  $: picture = $state.profiles.get(post.pubkey)?.picture;
  $: date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.created_at * 1000)
  $: npub = nip19.npubEncode(post.pubkey)
  $: relays = getRelaysForEvent(post.id)
  $: nostrLink = relays.length > 0 ? nip19.nprofileEncode({ pubkey: post.pubkey, relays }) : npub
</script>

<article>
  <div class="content">
    {#if post.image}
      <a href={`/${params.author}/${post.d}`} use:link>
        <figure style={`background-image: url(${post.image})`}>
          <img src={post.image} alt={post.title} />
        </figure>
      </a>
    {/if}
    <hgroup>
      <a href={`/${params.author}/${post.d}`} use:link><h5>{post.title}</h5></a>
      <a href={`/${params.author}/${post.d}`} use:link><small>{date}</small></a>
      {#if post.excerpt}
        <p>
          <small>{post.excerpt}</small>
        </p>
      {/if}
    </hgroup>
  </div>
  <footer>
    {#if picture}
      <Avatar {picture} />
    {/if}
    {#if name}
      <small>{name}</small>
    {/if}
    <a class="npub" href={`nostr:${nostrLink}`}>{npub}</a>
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
    max-height: 150px;
    overflow-y: clip;
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
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  .npub {
    font-size: 0.7rem;
  }
</style>
