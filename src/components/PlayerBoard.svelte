<script>
  import { roomState } from "../stores.js";
  import PlayerCard from "./PlayerCard.svelte";
</script>

<div class="playerBoard">
  {#if $roomState}
    {#each [...$roomState.playerStates.$items] as player}
      <PlayerCard
        name={player[1].name}
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
