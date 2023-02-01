<script>
  import grayMatter from "gray-matter";
  import { relayInit } from "nostr-tools";
  import { decode } from "nostr-tools/nip19";
  import { onMount } from "svelte";
  import Router, { link } from "svelte-spa-router";
  import config from "./config";
  import { routes } from "./routes";
  import { state } from "./store";

  function addPost(id, data) {
    state.update((state) => {
      state.posts.set(id, { ...data });
      return state;
    });
  }

  function addProfile(id, data) {
    state.update((state) => {
      state.profiles.set(id, { ...data });
      return state;
    });
  }

  onMount(async () => {
    // return; //Test
    for (const url of config.relays) {
      const relay = relayInit(url);
      try {
        await relay.connect();

        relay.on("connect", () => {
          console.log(`connected to ${relay.url}`);
        });
        relay.on("error", () => {
          console.log(`failed to connect to ${relay.url}`);
        });

        let sub = relay.sub([
          {
            kinds: [0, 33333],
            authors: config.authors.map((a) =>
              a.startsWith("npub") ? decode(a).data : a
            )
          }
        ]);

        sub.on("event", (event) => {
          if (event.kind == 0) {
            if (
              $state.profiles.has(event.pubkey) &&
              $state.profiles.get(event.pubkey)?.created_at > event.created_at
            ) {
              return;
            }
            let info = JSON.parse(event.content);
            addProfile(event.pubkey, {
              created_at: event.created_at,
              ...info
            });
          }
          let tagID = event.tags.find(
            ([k, v]) => k === "d" && v && v !== ""
          )[1];
          //if it's in posts and older do nothing
          if (
            $state.posts.has(tagID) &&
            $state.posts.get(tagID).timestamp > event.created_at
          ) {
            return;
          }
          if (!grayMatter.test(event.content)) return;

          let { data, content } = grayMatter(event.content);
          if (data.draft) return;

          addPost(tagID, {
            author: event.pubkey,
            timestamp: event.created_at,
            content,
            ...data
          });
        });
        sub.on("eose", () => {
          console.log("we've reached the end");
          sub.unsub();
        });
      } catch (error) {
        console.error(error);
        continue;
      }
    }
  });
</script>

<header class="container-fluid">
  <nav>
    <ul>
      <li>
        <a
          href="/"
          use:link><strong>{$state.siteTitle}</strong></a
        >
      </li>
    </ul>
  </nav>
</header>
<main class="container">
  <Router {routes} />
</main>
<footer>
  <hr />
  <div class="container-fluid">
    <p>
      <a
        href="https://github.com/talvasconcelos/nostrium"
        target="_blank"
        rel="noopener noreferrer">GitHub</a
      >
    </p>
  </div>
</footer>
