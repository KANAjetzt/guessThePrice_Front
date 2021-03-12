<script>
  import { roomState, roomStore, appStore } from "../stores";
  import BtnReload from "./BtnReload.svelte";

  export let showBtnReload = false;

  const handleReload = async () => {
    // Send avatar cange message to BE
    await $roomStore.send("avatarChange");
  };
</script>

<div class="avatar">
  <img class="avatarImg" src={$appStore.currentPlayer.avatar} alt="" />
  {#if showBtnReload}
    <div class="btnReload">
      <BtnReload on:click={handleReload} />
    </div>
  {/if}
</div>

<style>
  .avatar {
    position: relative;
    width: 15rem;
    height: 15rem;
    box-shadow: 0 0 0 3px var(--color-2);
    border-radius: 100%;
  }
  .avatarImg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btnReload {
    position: absolute;
    bottom: -1rem;
    right: -2rem;
  }
</style>
