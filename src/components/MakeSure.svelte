<script>
  import { roomStore, roomState, appStore } from "../stores";
  import { deleteLS } from "../utils/localStorageHandler";
  import BtnDefault from "./BtnDefault.svelte";
  import BtnPannel from "./BtnPannel.svelte";
  import Modal from "./Modal.svelte";

  const handleIsSure = () => {
    // Delete all LS data
    deleteLS("sessionData");
    // Leave current lobby
    $roomStore.leave();
    // Refresh the page
    window.location.assign("/");
  };

  const handleIsNotSure = () => {
    $appStore.makeSureIsOpen = false;
  };
</script>

{#if $appStore.makeSureIsOpen}
  <Modal name={"makeSureIsOpen"}>
    <div class="content">
      <p>Sicher das du das Spiel verlassen möchtest?</p>
      <BtnPannel style={"gameEnd"}>
        <BtnDefault on:click={handleIsSure}>
          <span>Ja</span>
        </BtnDefault>
        <BtnDefault on:click={handleIsNotSure}>
          <span>Nein</span>
        </BtnDefault>
      </BtnPannel>
    </div>
  </Modal>
{/if}

<style>
  @media only screen and (min-width: 25em) {
    .content {
      margin: 2rem;
    }
  }

  p {
    text-align: center;
  }
</style>
