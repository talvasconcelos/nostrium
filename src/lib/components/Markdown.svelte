<script>
  import dompurify from "dompurify";
  import { marked } from "marked";

  const parseMd = (node) => {
    const sanitizeConfig = {
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false
    };
    if (node.textContent) {
      node.innerHTML = String(
        dompurify.sanitize(marked(node.textContent), sanitizeConfig)
      );
    }
  };
</script>

<div use:parseMd>
  <slot />
</div>
