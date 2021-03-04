<script>
  import { fly } from "svelte/transition";
  import { roomState, roomStore, appStore } from "../stores";

  let lobbyUrl;
  let isCoppyed = false;
  let isCoppyError = false;

  $: if ($roomState) {
    lobbyUrl = `${window.location.host}/?c=${$roomStore.id}`;
  }

  const handleInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(lobbyUrl);
      isCoppyed = true;
    } catch (e) {
      isCoppyError = true;
    }
  };
</script>

<button on:click={handleInviteLink}>
  {#if !isCoppyed}
    Einladen
  {:else}
    Link kopiert 👍
  {/if}
</button>
{#if isCoppyError}
  <div class="InviteLinkInput" in:fly={{ duration: 200, y: -50 }}>
    <label for="inviteLink">Einladungslink:</label>
    <input
      type="text"
      name="inviteLink"
      id="inviteLink"
      readonly
      bind:value={lobbyUrl}
    />
  </div>
{/if}

<style>
  .InviteLinkInput {
    display: flex;
    flex-direction: column;
  }
</style>
