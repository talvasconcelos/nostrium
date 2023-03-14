import Author from './Author.svelte'
import Index from './Index.svelte'
import Post from './Post.svelte'

const routes = {
  // Exact path
  '/': Index,
  '/:author': Author,
  '/p/:naddr': Post
}

export {routes}
