<script>
  import Router, { link } from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<header class="container-fluid">
  <nav>
    <ul>
      <li>
        <a href="/" use:link><strong>Nostrium</strong></a>
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
        rel="noopener noreferrer">Source code</a
      >.
    </p>
  </div>
</footer>
