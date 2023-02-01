import Index from "./lib/Index.svelte";
import Post from "./lib/Post.svelte";
const routes = {
  // Exact path
  "/": Index,

  // Using named parameters, with last being optional
  "/post/:slug": Post

  // Catch-all
  // This is optional, but if present it must be the last
  //'*': NotFound,
};

export { routes };
