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
  };
</script>

{#if $roomState}
  <main class="characterCreation">
    <div class="playerCreation">
      <div class="avatar">
        <Avatar showBtnReload={true} />
      </div>
      <TextInput bind:value={$appStore.currentPlayer.name} />
    </div>

    <BtnStart on:click={handleStartBtn} />
  </main>
{:else}
  <Loader style={"fullPageCentered"} />
{/if}

<style>
  .characterCreation {
    display: grid;
    grid-template-rows: max-content min-content;
    justify-items: center;
    gap: 20vh;
    padding-top: 15vh;
    min-height: 100vh;
  }

  @media only screen and (min-width: 62.5em) {
    .characterCreation {
      gap: 25vh;
      padding-top: 25vh;
    }
  }

  .playerCreation {
    display: grid;
    gap: 3rem;
    align-items: center;
    justify-items: center;
  }

  .avatar {
    width: 17rem;
    height: 17rem;
  }
</style>
