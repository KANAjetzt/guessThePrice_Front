<script>
  import Currency from "./Currency.svelte";

  export let name;
  export let roundScore = 0;
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
<p>
  {score}
  {#if roundScore !== 0}
    <span class="roundScore"> +{roundScore}</span>
  {/if}
</p>

<style>
  .roundScore {
    color: green;
  }
</style>
