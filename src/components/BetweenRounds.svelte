<script>
  import { roomStore, roomState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";
  import Currency from "./Currency.svelte";
  import RoundCounter from "./RoundCounter.svelte";
  import ProductTitle from "./ProductTitle.svelte";
</script>

<main class="betweenRounds">
  <section class="roundCounter">
    <RoundCounter />
  </section>
  <section class="content">
    <section class="productTilte">
      <ProductTitle />
    </section>
    <section class="img">
      <img
        class="productImg"
        src={[...$roomState.currentProduct.imgs][0].mediumImgs[0]}
        alt=""
      />
    </section>
    <section class="realPrice">
      <p class="price">
        Tatsächlicher Preis <br />
        <span>
          <Currency cent={$roomState.currentProduct.price} />
        </span>
      </p>
    </section>
  </section>

  <section class="playerBoard">
    <PlayerBoard />
  </section>
</main>

<style>
  .betweenRounds {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-auto-rows: max-content;
    max-width: 100vw;
    justify-items: center;
    min-height: 100vh;
  }

  .roundCounter {
    width: 100%;
  }

  .content {
    width: 100%;
  }

  .productTilte {
    width: 100%;
  }

  .price {
    width: 100%;
    padding: 2.8rem 0;
    font-size: var(--heading-4);
    font-weight: bold;
    text-align: center;
  }

  .productImg {
    width: 100%;
    height: auto;
    max-height: 50vh;
    padding: 5rem;
    object-fit: contain;
  }

  .realPrice {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .playerBoard {
    justify-self: stretch;
  }

  span {
    font-size: var(--heading-3);
    font-weight: 500;
  }

  section {
    grid-column: 1 / 3;
  }

  @media only screen and (min-width: 80em) {
    .roundCounter {
      grid-column: 1 / 3;
    }
    .playerBoard {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
    section {
      grid-column: 2 / 3;
    }
  }
</style>
