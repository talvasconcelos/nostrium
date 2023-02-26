<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { state, initAuthor } from "./store";
  import Avatar from "./components/Avatar.svelte";
  import Markdown from "./components/Markdown.svelte";

  export let params;

  let post = $state.posts.find((p) => p.d === params.id);

  onMount(() => {
    if (!post) initAuthor(params)
  })

  $: profile = $state.profiles?.get(post?.pubkey)
  $: pubkey = post?.pubkey
</script>

<div aria-busy={$state.loading}>
  {#if post}
    <header>
      <h1>{post.title}</h1>
      {#if post.image}
        <section>
          <figure style={`background-image: url(${post.image})`}>
            <img
              src={post.image}
              alt={post.title}
            />
          </figure>
        </section>
      {/if}
    </header>
    <Markdown>{post?.content}</Markdown>
  {:else if !$state.loading}
    <p>Article "{params.id}" not found.</p>
    <p>Go back to <a href={`/${params.author}`} use:link>{params.author}</a>.</p>
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
