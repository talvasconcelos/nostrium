<script>
  import { marked } from "marked";
  import { state } from "../store";

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
  <div>{@html marked(post.content)}</div>
  <footer>
    <a href={`lightning:${author.lud06}`}>Tip author</a>
  </footer>
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
