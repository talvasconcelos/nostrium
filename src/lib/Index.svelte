<script>
  import { state } from "../store";
  import PostCard from "./components/PostCard.svelte";

  $: posts = Array.from($state.posts.values()) || [];
  $: loading = !Boolean($state.posts.size);
</script>

<div aria-busy={loading}>
  {#each posts as post}
    <PostCard {post} />
  {/each}
</div>
