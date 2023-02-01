<script>
  import { state } from "../store";
  import AuthorDetailed from "./components/AuthorDetailed.svelte";
  import Markdown from "./components/Markdown.svelte";

  export let params;

  $: post = Array.from($state.posts.values()).find(
    (p) => p.uuid == params.slug
  );
  $: author = $state.profiles.get(post.author);
</script>

<div>
  <header>
    <h1>{post.title}</h1>
    {#if post.hero}
      <section>
        <figure style={`background-image: url(${post.hero})`}>
          <img
            src={post.hero}
            alt={post.slug}
          />
        </figure>
      </section>
    {/if}
  </header>
  <Markdown>{post.content}</Markdown>
  <!-- <div>{@html marked(post.content)}</div> -->
  <section>
    <footer>
      <AuthorDetailed
        profile={author}
        pubkey={post.author}
      />
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
</style>
