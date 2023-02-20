import Index from "./Index.svelte";
import Author from "./Author.svelte";
import Post from "./Post.svelte";
const routes = {
  // Exact path
  "/": Index,
  "/:author": Author,
  "/:author/:id": Post
};

export { routes };
