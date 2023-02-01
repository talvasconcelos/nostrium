<script>
  import Avatar from "./Avatar.svelte";
  export let profile, pubkey;

  $: name = profile && profile.name;
  $: picture = profile ? profile.picture : "/img/avatar-default.png";
  //   $: date = new Intl.DateTimeFormat("en-US").format(post.timestamp * 1000);
</script>

<div class="details">
  <Avatar {picture} />
  <div class="detail">
    {#if name}
      <small>{name}</small>
    {:else}
      <small>{pubkey.slice(0, 5)}...{pubkey.slice(-5)}</small>
    {/if}
    {#if profile.lud06}
      <small><a href={`lightning:${profile.lud06}`}>⚡︎ Tip author</a></small>
    {/if}
  </div>
</div>

<style>
  .details {
    display: flex;
  }

  .detail {
    display: flex;
    flex-flow: column nowrap;
    margin-left: 1rem;
  }
</style>
