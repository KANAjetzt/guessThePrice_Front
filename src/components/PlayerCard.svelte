<script>
  import { onMount } from "svelte";
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
  export let connected = true;

  let showRoundScore = true;
  let style;
  let width;

  appStore.subscribe((data) => {
    style = data.currentRoom === "gameEnd" ? "gameEnd" : "";
  });

  const tweenedScore = tweened(score - roundScore, {
    duration: 4000,
    easing: cubicInOut,
  });

  $: tweenedScore.set(score);

  onMount(() => {
    // if subgrid is support skip all of this
    if ($appStore.subgridSupported) return;

    // Get the width of all playerInfos
    const playerInfoWidth = Array.from(
      document.querySelectorAll(".playerInfo")
    ).map((playerInfo) => playerInfo.getBoundingClientRect().width);

    // Get the highest width
    const playerInfoMaxWidth = playerInfoWidth.reduce((acc, cur) => {
      return acc < cur ? (acc = cur) : (acc = acc);
    }, 0);

    // Save the highest width in appStore
    $appStore.playerInfoMaxWidth = Math.round(playerInfoMaxWidth);

    // Set the highest width as css variable
    document.documentElement.style.setProperty(
      "--playerInfoMaxWidth",
      `${playerInfoMaxWidth}px`
    );
  });
</script>

{#if !winner}
  <div
    class={`playerCard ${!connected ? "playerCard--disconnected" : ""} ${
      width <= $appStore.playerInfoMaxWidth && !$appStore.subgridSupported
        ? "playerCard--smaller"
        : ""
    }`}
  >
    <div class="playerInfo" bind:offsetWidth={width}>
      <div class="avatar">
        <Avatar
          img={avatar}
          style={{
            avatar: `smallBorder ${
              $appStore.currentRoom === "gameEnd" ? "gameEnd" : ""
            }`,
            border: "playerCard",
          }}
          showCheckIcon={guessedPrice !== 0 && $appStore.currentRoom === "game"}
          showDisconnectedIcon={!connected}
          showBtnExit={!$roomState.gameEnded &&
            id === $appStore.currentPlayer.id}
        />
      </div>
      <caption
        class={`name name--${style} ${
          id === $appStore.currentPlayer.id ? "name--currentPlayer" : ""
        }`}>{name}</caption
      >
    </div>

    <div class={`stats stats--${style}`}>
      {#if $appStore.currentRoom !== "gameEnd"}
        {#if $roomState.gameSettings.showGuessedPrice || $roomState.isBetweenRounds || id === $appStore.currentPlayer.id}
          <p class="price">
            <Currency cent={guessedPrice} />
          </p>
        {/if}
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
      <p class={`score score--${style}`}>
        {Math.floor($tweenedScore)}
      </p>
    </div>
  </div>
{/if}

<style>
  .playerCard {
    display: grid;
    /* grid-template-columns: min-content 1fr min-content; */
    grid-template-columns: min-content 1fr min-content;
    align-items: center;
    background-image: var(--color-gradient-1--90deg);
    padding: 1.2rem 1.4rem 1rem 1.4rem;
    box-shadow: var(--shadow-3);
    transition: all 0.2s ease-out;
  }

  @supports (grid-template-columns: subgrid) {
    .playerCard {
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }
  }
  .playerCard--smaller {
    grid-template-columns: var(--playerInfoMaxWidth) 1fr min-content;
  }

  .playerCard--disconnected {
    filter: saturate(0.8);
    opacity: 0.8;
  }
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

  .name--currentPlayer {
    font-weight: bold;
  }

  .name--gameEnd {
    font-size: var(--baseFontSize);
    font-weight: 500;
    background-image: var(--color-gradient-2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .stats {
    grid-column: 3 / 4;
    display: grid;
    grid-template-columns: 5rem 20rem;
    grid-template-rows: 1fr 1fr;
    align-items: center;
  }

  .stats--gameEnd {
    grid-template-columns: min-content 1fr;
  }

  @supports (grid-template-columns: subgrid) {
    .stats,
    .stats--gameEnd {
      grid-column: 2 / 3;
      justify-self: end;
    }
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
    justify-self: end;
  }
  .score--gameEnd {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    font-size: var(--heading-2);
    background-image: var(--color-gradient-2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(var(--shadow-1--color1));
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
