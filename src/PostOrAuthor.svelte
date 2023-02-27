<script>
  import { nip19 } from "nostr-tools";
  import { onMount } from "svelte";

  import Author from "./Author.svelte";
  import Post from "./Post.svelte";

  export let params;

  let pubkey, givenRelays, d, error, kind;

  onMount(() => {
    try {
      let { type, data } = nip19.decode(params.code);
      if (type === "npub") pubkey = data;
      else if (type === "nprofile") {
        pubkey = data.pubkey;
        givenRelays = data.relays;
      } else if (type === "naddr") {
        d = data.identifier;
        kind = data.kind;
        if (kind !== 30023) throw new Error(`invalid kind ${kind}`);
        pubkey = data.pubkey;
        givenRelays = data.relays;
      }
    } catch (err) {
      error = err.message;
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else if d}
  <Post params={{ author: pubkey, relays: givenRelays, id: d }} />
{:else if pubkey}
  <Author params={{ author: pubkey, relays: givenRelays }} />
{:else}
  <p>loading...</p>
{/if}
