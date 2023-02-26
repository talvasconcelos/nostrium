import Index from "./Index.svelte";
import Author from "./Author.svelte";
import Post from "./Post.svelte";
const routes = {
  // Exact path
  "/": Index,
  "/:code": PostOrAuthor,
  "/:author/:id": Post
};

export { routes };
