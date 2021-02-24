<script>
  import { roomStore, appStore } from "../stores";

  const handleClick = async (e) => {
    // Send guessed price to BE
    await $roomStore.send("guessedPrice", {
      guessedPrice: $appStore.guessedPrice,
    });
  };
</script>

<button on:click={handleClick}>✔</button>
