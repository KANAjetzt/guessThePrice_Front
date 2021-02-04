<script>
  import { roomStore } from "../stores";

  export let guessedPrice = 0;

  const handleClick = e => {
    // send guessed price to BE
    $roomStore.send("guessedPrice", { guessedPrice });
  };
</script>

<button on:click={handleClick}>✔</button>
