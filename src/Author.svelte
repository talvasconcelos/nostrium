<script>
  import { onMount } from "svelte";
  import PostCard from "./components/PostCard.svelte";
  import { initAuthor, state } from "./store";

  export let params;

  onMount(() => {
    initAuthor(params);
  });
</script>

<div aria-busy={$state.loading}>
  {#if $state.posts.length}
    {#each $state.posts as post}
      <PostCard
        {params}
        {post}
      />
    {/each}
  {:else if !$state.loading}
    <p>No posts found for "{params.author}".</p>
  {/if}
</div>
