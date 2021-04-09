<script>
  import { createEventDispatcher } from "svelte";
  import ReplayIcon from "./Icons/Replay.svelte";

  const dispatch = createEventDispatcher();
</script>

<button
  class="reloadBtn"
  on:click={() => {
    dispatch("click");
  }}
>
  <div class="icon">
    <ReplayIcon width={35} height={35} fill={"black"} />
  </div>
</button>

<style>
  .reloadBtn {
    position: relative;
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    border: none;
    background-color: var(--color-3);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  .reloadBtn:hover,
  .reloadBtn:focus {
    transform: translateY(-0.2rem);
    filter: drop-shadow(var(--shadow-1--color1));
  }

  .icon {
    position: absolute;
    top: 55%;
    left: 54%;
    transform: translate(-50%, -50%);
  }
</style>
