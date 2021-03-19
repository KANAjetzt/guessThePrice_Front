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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: var(--color-gradient-1--90deg);
    padding: 1.2rem 1.4rem 1rem 1.4rem;
    box-shadow: var(--shadow-3);
  }
  .playerInfo {
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

  p {
    font-size: var(--heading-3);
    font-weight: 500;
    text-align: left;
    line-height: 1.4;
  }

  /* .scoreBG {
    background-image: linear-gradient(
      90deg,
      #5c5c5c62 0%,
      #5c5c5c62 50%,
      transparent 50%
    );
    background-size: 200%;
  } */

  /* .roundScore {
    display: inline-block;
    color: green;
  }

  .winner {
    border: solid 3px #ffd700;
  }

  .ownName {
    font-weight: 700;
  } */
</style>
