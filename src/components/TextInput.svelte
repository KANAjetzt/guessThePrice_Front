<script>
  import { roomState, roomStore, appStore } from "../stores";
  import IconReplay from "./Icons/Replay.svelte";

  export let value;

  const handleRandomNameReload = async () => {
    // Send random name cange message to BE
    await $roomStore.send("randomNameChange");
    console.log("randomNameChange");
  };
</script>

<div class="border">
  <div class="inputWrapper">
    <div class="icon" on:click={handleRandomNameReload}>
      <IconReplay width={20} height={20} fill={"#f2e527"} />
    </div>
    <input class="input" type="text" bind:value />
  </div>
</div>

<style>
  .border {
    padding: 1rem;
    position: relative;
    background-image: var(--color-gradient-2);
    padding: 0.2rem;
    border-radius: 3px;
  }

  .inputWrapper {
    position: relative;
  }

  .input {
    position: relative;
    font-weight: bold;
    padding: 1rem 1.5rem;
    background-color: var(--color-1-alpha8);
    border: none;
    z-index: 2;
    transition: all 0.2s ease-in-out;
  }

  .input:hover,
  .input:focus {
    filter: contrast(1.5);
  }

  .icon {
    position: absolute;
    top: 54%;
    right: -2%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
</style>
