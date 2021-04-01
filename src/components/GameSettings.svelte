<script>
  import { roomState, roomStore, appStore } from "../stores";
  import ArrowIcon from "./Icons/Arrow.svelte";

  let rounds = 5;
  let showGuessedPrice = true;
  let maxPlayers = 5;

  const handleRoundsInput = async () => {
    // setTimeout because bind:value can't update rounds before we send it
    setTimeout(async () => {
      // Send guessed price to BE
      await $roomStore.send("settings", {
        rounds: parseInt(rounds, 10),
      });
    }, 0);
  };

  const handleShowGuessedPriceInput = async () => {
    // setTimeout because bind:value can't update showGuessedPrice before we send it
    setTimeout(async () => {
      // Send guessed price to BE
      await $roomStore.send("settings", {
        showGuessedPrice: showGuessedPrice === "true" ? true : false,
      });
    }, 0);
  };

  const handleMaxPlayersInput = async () => {
    // setTimeout because bind:value can't update rounds before we send it
    setTimeout(async () => {
      // Send guessed price to BE
      await $roomStore.send("settings", {
        maxPlayers: parseInt(maxPlayers, 10),
      });
    }, 0);
  };
</script>

<div class="settings">
  <div class="setting">
    <label for="rounds">Runden</label>
    <div class="border">
      <div class="arrowIcon">
        <ArrowIcon width={12} height={8} shadow={false} fill={"#f2e527"} />
      </div>
      <select
        name="rounds"
        id="rounds"
        bind:value={rounds}
        on:input={handleRoundsInput}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
  <div class="setting">
    <label for="showGuessedPrice">Geheim</label>
    <div class="border">
      <div class="arrowIcon">
        <ArrowIcon width={12} height={8} shadow={false} fill={"#f2e527"} />
      </div>
      <select
        name="showGuessedPrice"
        id="showGuessedPrice"
        bind:value={showGuessedPrice}
        on:input={handleShowGuessedPriceInput}
      >
        <option value="true">ja</option>
        <option value="false">nein</option>
      </select>
    </div>
  </div>
  <div class="setting">
    <label for="maxPlayers">Spieleranzahl</label>
    <div class="border">
      <div class="arrowIcon">
        <ArrowIcon width={12} height={8} shadow={false} fill={"#f2e527"} />
      </div>
      <select
        name="maxPlayers"
        id="maxPlayers"
        bind:value={maxPlayers}
        on:input={handleMaxPlayersInput}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  </div>
</div>

<style>
  .settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: max-content max-content;
    align-items: center;
    justify-items: center;
    gap: 3rem;
    margin-top: -10rem;
    padding: 0 2.3rem 0 2.3rem;
  }

  .setting {
    width: 100%;
  }

  label {
    display: inline-block;
    text-align: center;
    width: 100%;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  .border {
    position: relative;
    width: 100%;
    padding: 1rem;
    background-image: var(--color-gradient-2);
    padding: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
  }

  .arrowIcon {
    position: absolute;
    right: 1rem;
    top: 50%;
    z-index: 3;
    transform: translateY(-50%);
    pointer-events: none;
  }

  select {
    position: relative;
    width: 100%;
    color: var(--color-font-1--alpha85);
    font-weight: bold;
    padding: 1rem 1.5rem;
    background-color: var(--color-1-alpha8);
    border: none;
    z-index: 2;
    appearance: none;
    cursor: pointer;
  }

  @media only screen and (min-width: 80em) {
    .settings {
      margin-top: unset;
    }
  }
</style>
