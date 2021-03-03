<script>
  import PlayerCard from "./PlayerCard.svelte";

  export let store;
</script>

<div class="playerBoard">
  {#if $store}
    {#each [...$store.playerStates.$items] as player}
      <PlayerCard
        name={player[1].name}
        avatar={player[1].avatar}
        roundScore={player[1].roundScore}
        guessedPrice={player[1].guessedPrice}
        score={player[1].score}
      />
    {/each}
  {/if}
</div>

<style>
  .playerBoard {
    border: solid 3px black;
  }
</style>
