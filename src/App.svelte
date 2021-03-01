<script>
  import * as Colyseus from "colyseus.js";
  import { roomStore, roomState, appStore } from "./stores";
  import Game from "./components/Game.svelte";
  import Lobby from "./components/Lobby.svelte";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);
</script>

{#if client}
  {#if $appStore.currentRoom === "game"}
    <Game {client} />
  {/if}
  {#if $appStore.currentRoom === "lobby"}
    <Lobby {client} />
  {/if}
{/if}
