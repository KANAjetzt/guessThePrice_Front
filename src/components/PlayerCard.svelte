<script>
  import { tweened } from "svelte/motion";
  import { cubicInOut, cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { roomStore, roomState, appStore } from "../stores";
  import Currency from "./Currency.svelte";
  import Avatar from "./Avatar.svelte";

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
    // Calculate based on the max posible score ( 1000 * roundCount )
    const maxScore = $roomState.gameSettings.rounds * 1000;

    const value = 100 - (100 / maxScore) * score;

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
  <div class="playerInfo">
    <div class="avatar">
      <Avatar img={avatar} />
    </div>
    <caption class="name">{name}</caption>
  </div>

  <div class="stats">
    {#if $roomState.gameSettings.showGuessedPrice || $roomState.isBetweenRounds}
      <p class="price">
        <Currency cent={guessedPrice} />
      </p>
    {/if}
    {#if roundScore !== 0 && showRoundScore}
      <span
        class="roundScore"
        in:fade={{ duration: 300 }}
        out:fly={{ duration: 1500, delay: 2000, x: 30 }}
        on:introend={() => {
          showRoundScore = false;
        }}
      >
        +{roundScore}</span
      >
    {/if}
    <p class="score">
      {Math.floor($tweenedScore)}
    </p>
  </div>
</div>

<style>
  .playerCard {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    align-items: center;
    background-image: var(--color-gradient-1--90deg);
    padding: 1.2rem 1.4rem 1rem 1.4rem;
    box-shadow: var(--shadow-3);
  }

  /* .playerCard--betweenRounds {
    display: grid;
  } */

  .playerInfo {
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    width: 5.3rem;
    height: 5.3rem;
  }
  .name {
    margin-top: 1rem;
    font-weight: 500;
    font-size: var(--smallFontSize);
  }

  .stats {
    grid-column: 3 / 4;
    display: grid;
    grid-template-columns: min-content 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
  p {
    font-size: var(--heading-3);
    font-weight: 500;
    line-height: 1.4;
    text-align: right;
  }
  .price {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  .score {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }

  .roundScore {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    background-image: var(--color-gradient-2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: var(--heading-4);
    font-weight: 500;
    filter: drop-shadow(var(--shadow-1--color1));
  }
</style>
