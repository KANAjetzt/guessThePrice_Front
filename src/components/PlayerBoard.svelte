<script>
  import { roomState } from "../stores.js";
  import PlayerCard from "./PlayerCard.svelte";

  $: if ($roomState) {
    $roomState.playerStates.$items.forEach(e => {});
  }
</script>

<style>
  .playerBoard {
    border: solid 3px black;
  }
</style>

<div class="playerBoard">
  {#if $roomState}
    {#each [...$roomState.playerStates.$items] as player}
      <PlayerCard
        id={player[1].id}
        name={player[1].name}
        guessedPrice={player[1].guessedPrice}
        score={player[1].score} />
    {/each}
  {/if}
</div>
