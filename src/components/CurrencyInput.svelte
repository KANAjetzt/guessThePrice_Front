<script>
  import { onMount } from "svelte";
  import AutoNumeric from "autonumeric";
  import { appStore } from "../stores";

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
</script>

<div class="currencyInput">
  <p>Geschätzter Preis:</p>
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

<style>
  .currencyInput {
    display: flex;
    flex-direction: column;
  }
</style>
