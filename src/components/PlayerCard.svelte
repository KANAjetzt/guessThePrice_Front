<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut, cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { roomStore, roomState, appStore } from "../stores";
  import Currency from "./Currency.svelte";

  export let id;
  export let name;
  export let avatar;
  export let roundScore = 0;
  export let score = 0;
  export let guessedPrice = 0;
  export let winner = false;

  let showRoundScore = true;

  const tweenedScore = tweened(score - roundScore, {
    duration: 4000,
    easing: cubicInOut,
  });

  $: tweenedScore.set(score);

  const getTweenedScoreBGValue = () => {
    // Check if singleplayer
    // TODO: add a playerCount Value some where on the backend
    if ([...$roomState.playerStates.$items].length === 1) {
      // Calculate based on the max posible score ( 1000 * roundCount )
      const maxScore = $roomState.gameSettings.rounds * 1000;

      const value = 100 - (100 / maxScore) * score;

      console.log(value);
      return value;
    }
    // Calculate based on the max posible score ( 1000 * roundCount )
    const maxScore = $roomState.gameSettings.rounds * 1000;

    const value = 100 - (100 / maxScore) * score;

    console.log(value);
    return value;
  };

  const tweenedScoreBG = tweened(100, {
    duration: 4000,
    easing: cubicOut,
  });

  $: tweenedScoreBG.set(getTweenedScoreBGValue());

  const handlePlayerCardStyle = () => {
    let styles = ["playerCard", "scoreBG"];

    if (winner) {
      styles = [...styles, "winner"];
    }

    return styles.join(" ");
  };
</script>

<div
  class={handlePlayerCardStyle()}
  style="background-position-x: {$tweenedScoreBG}%;"
>
  <img class="avatar" src={avatar} alt="" />

  <div class="info">
    {#if name}
      <p class={$appStore.currentPlayer.id === id ? "name ownName" : "name"}>
        {name}
      </p>
    {/if}

    {#if $roomState.gameSettings.showGuessedPrice || $roomState.isBetweenRounds}
      <p>
        <Currency cent={guessedPrice} />
      </p>
    {/if}
    <p>
      {Math.floor($tweenedScore)}
      {#if roundScore !== 0 && showRoundScore}
        <span
          class="roundScore"
          in:fade={{ duration: 300 }}
          out:fly={{ duration: 1500, delay: 2000, x: -30 }}
          on:introend={() => {
            showRoundScore = false;
          }}
        >
          +{roundScore}</span
        >
      {/if}
    </p>
  </div>
</div>

<style>
  .playerCard {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  .scoreBG {
    background-image: linear-gradient(
      90deg,
      #5c5c5c62 0%,
      #5c5c5c62 50%,
      transparent 50%
    );
    background-size: 200%;
  }

  .avatar {
    grid-column: 1 / 2;
    max-width: 6rem;
    padding: 2rem;
  }
  .info {
    grid-column: 2 / 3;
  }
  .roundScore {
    display: inline-block;
    color: green;
  }

  .winner {
    border: solid 3px #ffd700;
  }

  .ownName {
    font-weight: 700;
  }
</style>
