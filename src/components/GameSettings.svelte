<script>
  import { roomState, roomStore, appStore } from "../stores";

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
  <label for="rounds">Runden:</label>
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
  <label for="showGuessedPrice"
    >Geschätzer Preis währen der Runde anzeigen:</label
  >
  <select
    name="showGuessedPrice"
    id="showGuessedPrice"
    bind:value={showGuessedPrice}
    on:input={handleShowGuessedPriceInput}
  >
    <option value="true">ja</option>
    <option value="false">nein</option>
  </select>
  <label for="maxPlayers">Maximale Spieleranzahl:</label>
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

<style>
  .settings {
    display: flex;
    flex-direction: column;
  }

  label {
    padding: 0.5rem 0;
  }
</style>
