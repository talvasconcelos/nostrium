<script>
  import { link } from "svelte-spa-router";
  import { state } from "../../store";
  import Avatar from "./Avatar.svelte";
  export let post;

  const getName = (pubkey) => {
    if (!$state.profiles.has(pubkey) || !$state.profiles.get(pubkey)?.name)
      return false;
    return $state.profiles.get(pubkey).name;
  };

  const getPicture = (pubkey) => {
    if (!$state.profiles.has(pubkey) || !$state.profiles.get(pubkey)?.picture)
      return "vite.svg";
    return $state.profiles.get(pubkey).picture;
  };

  $: name = getName(post.author);
  $: picture = getPicture(post.author);
  $: date = new Intl.DateTimeFormat("en-US").format(post.timestamp * 1000); //new Date(post.timestamp * 1000).toLocaleDateString();
</script>

<article>
  <div class="content">
    {#if post.hero}
      <figure style={`background-image: url(${post.hero})`}>
        <img
          src={post.hero}
          alt={post.slug}
        />
      </figure>
    {/if}
    <hgroup>
      <a
        href={`/post/${post.uuid}`}
        use:link><h5>{post.title}</h5></a
      >
      {#if post.excerpt}
        <p><small>{post.excerpt}</small></p>
      {/if}
    </hgroup>
  </div>
  <footer>
    <Avatar {picture} />
    <div class="detail">
      {#if name}
        <small>{name}</small>
      {:else}
        <small>{post.author.slice(0, 5)}...{post.author.slice(-5)}</small>
      {/if}
      <small>{date}</small>
    </div>
  </footer>
</article>

<style>
  article .content {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  hgroup {
    max-height: 150px;
    overflow-y: clip;
    margin-bottom: 0;
  }
  figure {
    margin: 0;
    margin-right: 1rem;
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
  }

  footer .detail {
    display: flex;
    flex-flow: column nowrap;
    margin-left: 1rem;
  }
</style>
