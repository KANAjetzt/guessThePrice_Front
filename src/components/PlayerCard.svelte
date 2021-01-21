<script>
  export let id;
  export let name;
  export let score = 0;
  // - Player Name
  // - Player Avatar (later)
  // - Guesed Price
  // - Current Score
</script>

{#if name}
  <p>{name}</p>
{/if}

<p>12,33€</p>
<p>{score}</p>
