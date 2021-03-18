<script>
  import { fly } from "svelte/transition";
  import { roomState, roomStore, appStore } from "../stores";
  import BtnDefault from "./BtnDefault.svelte";
  import LinkIcon from "./Icons/Link.svelte";

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

<BtnDefault on:click={handleInviteLink}>
  <div class="linkIcon">
    <LinkIcon />
  </div>
  {#if !isCoppyed}
    <span>EINLADEN</span>
  {:else}
    <span>Link kopiert 👍</span>
  {/if}
</BtnDefault>
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
  .linkIcon {
    position: absolute;
    left: 0.6rem;
  }

  .InviteLinkInput {
    display: flex;
    flex-direction: column;
  }
</style>
