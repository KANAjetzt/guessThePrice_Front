<script>
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import Currency from "./Currency.svelte";
  import RoundCounter from "./RoundCounter.svelte";
  import ProductTitle from "./ProductTitle.svelte";
  import Carousel from "./Carousel.svelte";
</script>

<main class="betweenRounds">
  <RoundCounter />
  <ProductTitle />
  <div class="carousel">
    <Carousel />
  </div>

  <p class="price">
    Tatsächlicher Preis <br />
    <span>
      <Currency cent={$roomState.currentProduct.price} />
    </span>
  </p>

  <PlayerBoard />
</main>

<style>
  .betweenRounds {
    display: grid;
  }

  .carousel {
    max-width: 100vw;
  }
  .price {
    padding: 2.8rem 0;
    font-size: var(--heading-4);
    font-weight: bold;
    text-align: center;
  }

  span {
    font-size: var(--heading-3);
    font-weight: 500;
  }
</style>
