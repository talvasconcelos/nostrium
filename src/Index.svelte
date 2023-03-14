<script>
  import {link, push} from 'svelte-spa-router'

  let searchAuthor

  function handleSearch() {
    if (!searchAuthor || !searchAuthor.length) return
    searchAuthor = searchAuthor.trim()
    if (searchAuthor.startsWith('naddr')) {
      push(`/p/${searchAuthor}`)
    } else {
      push(`/${searchAuthor}`)
    }
  }
</script>

<div class="hero">
  <hgroup>
    <h1>Nostrium</h1>
    <h3>Unfiltered Content for Independent Thinkers</h3>
  </hgroup>
  <p>
    <small
      >Nostrium is a <a
        href="https://github.com/nostr-protocol/nips/blob/master/23.md"
        >NIP-23</a
      > article reader client.</small
    >
  </p>
</div>
<div>
  <details>
    <summary>Search Nostr</summary>
    <article>
      <div class="grid">
        <div>
          <label for="search">Search for author</label>
          <input
            type="text"
            id="search"
            name="search"
            bind:value={searchAuthor}
            placeholder="pubkey/npub/nprofile/naddr"
          />
          <small>Enter a pubkey, nprofile, or naddr</small>
          <!-- Button -->
          <button on:click={handleSearch}>Submit</button>
        </div>
        <!-- <div>
          <label for="content">Search for content</label>
          <input
            type="text"
            id="content"
            name="content"
            bind:value={searchTerm}
            placeholder="bitcoin nostr"
          />
          <small>Enter some space separated search terms</small>
          <a href="#" role="button" on:click={searchNostr}
            >Submit</a
          >
        </div> -->
      </div>
    </article>
  </details>
  <details>
    <summary>Notable authors</summary>
    <ul>
      <li>
        <a
          use:link
          href="/npub13a56exdeda7y44vtnrxr3ljaxh8q9kh04e73vzw8jl8rknuj7h7sst4t9m"
          >talvasconcelos</a
        >
      </li>
      <li>
        <a
          use:link
          href="/npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6"
          >fiatjaf</a
        >
      </li>
    </ul>
  </details>
</div>

<style>
  button {
    width: auto;
  }
  .hero {
    padding: 3rem 0;
  }
</style>
