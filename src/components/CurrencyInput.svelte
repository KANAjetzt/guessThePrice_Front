<script>
  import { onMount } from "svelte";
  import AutoNumeric from "autonumeric";
  import { roomStore, roomState, appStore } from "../stores";
  import BtnSubmit from "./BtnSubmit.svelte";
  import BtnDefault from "./BtnDefault.svelte";
  import CheckIcon from "./Icons/Check.svelte";

  onMount(() => {
    new AutoNumeric(".guessedPriceInput", {
      currencySymbol: "€",
      currencySymbolPlacement: "s",
      decimalPlaces: 2,
      minimumValue: 0,
      decimalCharacter: ",",
      decimalCharacterAlternative: ",",
      digitGroupSeparator: "'",
    });
  });

  const handleGuessedPriceSubmit = async (e) => {
    // Send guessed price to BE
    await $roomStore.send("guessedPrice", {
      guessedPrice: $appStore.guessedPrice,
    });
  };
</script>

<div class="currencyInput">
  <p>Dein Geschätzter Preis</p>
  <div class="border">
    <input
      style={``}
      type="text"
      class="guessedPriceInput"
      placeholder="0€"
      on:autoNumeric:formatted={(e) => {
        const numbers = e.detail.newValue.match(/\d/g);
        if (numbers && typeof e.detail.newValue === "string") {
          $appStore.guessedPrice = parseInt(numbers.join(""));
        } else {
          $appStore.guessedPrice = 0;
        }
      }}
    />
  </div>
  <BtnDefault on:click={handleGuessedPriceSubmit}>
    <div class="checkIcon">
      <CheckIcon />
    </div>
    <span>FERTIG!</span>
  </BtnDefault>
</div>

<style>
  .currencyInput {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 1.9rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1.8rem;
    column-gap: 1.1rem;
    background-color: var(--color-1-alpha5);
    backdrop-filter: blur(4px);
    box-shadow: var(--shadow-4--negative);
  }

  .guessedPriceInput {
    position: relative;
    width: 15rem;
    font-weight: bold;
    color: var(--color-font-1);
    padding: 1rem 1.5rem;
    background-color: var(--color-1-alpha8);
    border: none;
    z-index: 2;
  }

  .guessedPriceInput::placeholder {
    color: var(--color-font-1--alpha8);
  }
  .border {
    justify-self: right;
    padding: 1rem;
    position: relative;
    background-image: var(--color-gradient-2);
    padding: 0.2rem;
    border-radius: 3px;
  }

  .checkIcon {
    position: absolute;
    left: 0.6rem;
  }

  p {
    grid-column: span 2;
    justify-self: center;
    font-size: var(--heading-4);
    font-weight: bold;
  }
</style>
