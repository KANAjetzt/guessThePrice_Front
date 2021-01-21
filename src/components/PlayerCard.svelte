<script>
  import Currency from "./Currency.svelte";

  export let id;
  export let name;
  export let score = 0;
  export let guessedPrice = 0;
  // - Player Name
  // - Player Avatar (later)
  // - Guesed Price
  // - Current Score
</script>

{#if name}
  <p>{name}</p>
{/if}

<p>
  <Currency cent={guessedPrice} />
</p>
<p>{score}</p>
