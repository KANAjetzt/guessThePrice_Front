<script>
  import { roomState, roomStore, appStore } from "../stores";
  import PlayArrowIcon from "./Icons/PlayArrow.svelte";
  import Avatar from "./Avatar.svelte";
  import TextInput from "./TextInput.svelte";
  import BtnDefault from "./BtnDefault.svelte";
  import Loader from "./Loader.svelte";

  const startGame = async () => {
    // Send Name to BE
    await $roomStore.send("nameChange", {
      name: $appStore.currentPlayer.name,
    });

    console.log("starting Game!");
    await $roomStore.send("startGame");
  };
</script>

{#if $roomState}
  <div class="characterCreation">
    <div class="playerCreation">
      <Avatar showBtnReload={true} />
      <TextInput bind:value={$appStore.currentPlayer.name} />
    </div>

    <BtnDefault on:click={startGame}>
      <div class="playArrowIcon">
        <PlayArrowIcon width={12} height={14} fill={"black"} />
      </div>
      <span>START</span>
    </BtnDefault>
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

  .playArrowIcon {
    position: absolute;
    left: 0.6rem;
  }
</style>
