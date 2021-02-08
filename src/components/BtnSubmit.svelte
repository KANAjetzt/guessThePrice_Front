<script>
  import { roomStore, appStore } from "../stores";

  const handleClick = async (e) => {
    // Send guessed price to BE
    await $roomStore.send("guessedPrice", {
      guessedPrice: parseInt($appStore.guessedPrice.match(/\d/g).join("")),
    });
    // Reset guessed price input
    $appStore.guessedPrice = "0.00";
  };
</script>

<button on:click={handleClick}>✔</button>
