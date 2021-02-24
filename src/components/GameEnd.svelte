<script>
  import { onMount } from "svelte";
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import Currency from "./Currency.svelte";

  onMount(() => {
    // Overflow hidden on body
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      // Overflow hidden on body
      document.querySelector("body").style.overflow = "unset";
    };
  });
</script>

<section class="gameEnd">
  <h2>Ergebnisse</h2>
  <div class="info">
    <p class="price">
      Preis: <Currency cent={$roomState.currentProduct.price} />
    </p>
    <PlayerBoard />
  </div>
</section>

<style>
  .info {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  .price {
    justify-self: center;
  }

  .gameEnd {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px) brightness(0.2);
  }
</style>
