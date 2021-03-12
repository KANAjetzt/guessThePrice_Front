<script>
  import ReplayIcon from "./Icons/Replay.svelte";
</script>

<button class="reloadBtn">
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
  }

  .icon {
    position: absolute;
    top: 55%;
    left: 54%;
    transform: translate(-50%, -50%);
  }
</style>
