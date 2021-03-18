<script>
  import { roomState, roomStore, appStore } from "../stores";

  import Avatar from "./Avatar.svelte";
  import TextInput from "./TextInput.svelte";
  import BtnStart from "./BtnStart.svelte";
  import Loader from "./Loader.svelte";

  const handleStartBtn = async () => {
    // Send Name to BE
    await $roomStore.send("nameChange", {
      name: $appStore.currentPlayer.name,
    });

    // Switch to Lobby
    $appStore.currentRoom = "lobby";

    // console.log("starting Game!");
    // await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <div class="characterCreation">
    <div class="playerCreation">
      <Avatar showBtnReload={true} />
      <TextInput bind:value={$appStore.currentPlayer.name} />
    </div>

    <BtnStart on:click={handleStartBtn} />
  </div>
{:else}
  <Loader style={"fullPageCentered"} />
{/if}

<style>
  .characterCreation {
    display: grid;
    grid-template-rows: 1fr min-content;
    gap: 30vh;
    padding-top: 25vh;
  }

  .playerCreation {
    display: grid;
    gap: 3rem;
    align-items: center;
    justify-items: center;
  }
</style>
