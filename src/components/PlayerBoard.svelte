<script>
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { roomState, roomStore, appStore } from "../stores";
  import PlayerCard from "./PlayerCard.svelte";

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  // TODO: Animation wird nicht abgespielt da die Comp neu gemounted wird im InBetweenRound state
  $: sortedPlayers = [...$roomState.playerStates.$items].sort(
    (a, b) => b[1].score - a[1].score
  );
</script>

<div class="playerBoard">
  {#if $roomState}
    {#each sortedPlayers as player, i (i)}
      <div
        class="playerCard"
        in:receive|local={{ key: player[1].id }}
        out:send|local={{ key: player[1].id }}
        animate:flip
      >
        <PlayerCard
          id={player[1].id}
          name={player[1].name}
          avatar={player[1].avatar}
          roundScore={player[1].roundScore}
          guessedPrice={player[1].guessedPrice}
          score={player[1].score}
          winner={player[1].winner}
          connected={player[1].connected}
        />
      </div>
    {/each}
  {/if}
</div>

<style>
  .playerBoard {
    position: sticky;
    top: 0;
  }

  @supports (grid-template-columns: subgrid) {
    .playerBoard {
      display: grid;
      grid-template-columns: min-content 1fr;
    }

    .playerCard {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: subgrid;
    }
  }
</style>
