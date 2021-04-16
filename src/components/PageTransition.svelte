<script>
  import { blur } from "svelte/transition";
</script>

<main in:blur={{ duration: 550, amount: 10 }}>
  <slot />
</main>
