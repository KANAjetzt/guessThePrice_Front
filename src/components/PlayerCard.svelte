<script>
  // - Player Name
  // - Player Avatar (later)
  // - Guesed Price
  // - Current Score

  import { tweened } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import Currency from "./Currency.svelte";

  export let name;
  export let avatar;
  export let roundScore = 0;
  export let score = 0;
  export let guessedPrice = 0;

  let showRoundScore = true;

  const tweenedScore = tweened(score - roundScore, {
    duration: 4000,
    easing: cubicInOut,
  });

  $: tweenedScore.set(score);
</script>

<div class="playerCard">
  <img class="avatar" src={avatar} alt="" />

  <div class="info">
    {#if name}
      <p>{name}</p>
    {/if}

    <p>
      <Currency cent={guessedPrice} />
    </p>
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
    grid-template-columns: 10rem 1fr;
  }

  .avatar {
    grid-column: 1 / 2;
  }
  .info {
    grid-column: 2 / 3;
  }
  .roundScore {
    display: inline-block;
    color: green;
  }
</style>
