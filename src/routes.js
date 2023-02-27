import Author from "./Author.svelte";
import Index from "./Index.svelte";
import Post from "./Post.svelte";
import PostOrAuthor from "./PostOrAuthor.svelte";

const routes = {
  // Exact path
  "/": Index,
  "/:code": PostOrAuthor,
  "/:author": Author,
  "/:author/:id": Post
};

export { routes };
