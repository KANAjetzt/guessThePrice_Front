<script>
  import { roomState, roomStore, appStore } from "../stores";
  import BtnSubmit from "./BtnSubmit.svelte";

  let player = [...$roomState.playerStates.$items].filter(
    (player) => player[1].id === $roomStore.sessionId
  )[0][1];

  let name = player.name;

  const handleNameChangeSubmit = async () => {
    // Send guessed price to BE
    await $roomStore.send("nameChange", {
      name,
    });
  };
</script>

<div class="playerCreation">
  <img src={player.avatar} alt="" />
  <div class="playerNameInput">
    <input type="text" bind:value={name} />
    <BtnSubmit on:click={handleNameChangeSubmit} />
  </div>
</div>

<style>
  .playerCreation {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    max-width: 10rem;
    padding: 1rem;
  }
</style>
