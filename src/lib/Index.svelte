<script>
  // import { link } from "svelte-spa-router";
  import { state } from "../store";
  import PostCard from "./components/PostCard.svelte";

  $: posts = Array.from($state.posts.values()) || [];
  $: console.log($state.posts.size);
  $: loading = !Boolean($state.posts.size);
</script>

<div aria-busy={loading}>
  {#each posts as post}
    <!-- <p>{post.slug}</p> -->
    <!-- <a
      href={`/post/${post.slug}`}
      use:link></a
    > -->
    <PostCard {post} />
  {/each}
</div>
