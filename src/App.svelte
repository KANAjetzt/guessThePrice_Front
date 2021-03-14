<script>
  import { onMount } from "svelte";
  import * as Colyseus from "colyseus.js";
  import { roomStore, roomState, appStore } from "./stores";
  import Game from "./components/Game.svelte";
  import Lobby from "./components/Lobby.svelte";
  import CharacterCreation from "./components/CharacterCreation.svelte";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);

  // Switch view if game has started
  $: if ($roomState) {
    // Change currentRoom in appStore to game so the game comp is mounted
    if ($roomState.gameStarted) {
      $appStore.currentRoom = "game";
    }

    // Set currentPlayer in appStore
    $appStore.currentPlayer = [...$roomState.playerStates.$items].filter(
      (player) => player[1].id === $roomStore.sessionId
    )[0][1];
  }

  const joinRoom = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("c");

    let room;

    // Check if roomId is in URL --> /?c=1f0bbd3c1
    if (roomId) {
      console.log("joining Room");
      room = await client.joinById(roomId);
    } else {
      console.log("creating Room");
      room = await client.create("my_room");
    }

    return room;
  };

  // Keep's the ws connection alive on heroku (pings every 30s)
  // https://devcenter.heroku.com/articles/websockets#timeouts
  const pingPong = async () => {
    // Send ping to server
    await $roomStore.send("alivePing");
  };

  const handleRoom = async () => {
    // join Room
    const room = await joinRoom();
    console.log(room.sessionId, "joined", room.name);

    // store room object
    $roomStore = room;

    // start ping pong
    pingPong();

    // listen to state change
    room.onStateChange((state) => {
      $roomState = state;
      console.log($roomState);
    });

    // listen to alivePong
    room.onMessage("alivePong", () => {
      // send alivePing back
      pingPong();
    });

    // listen to error
    // TODO: Add Toster and Fullpage Error Messages
    room.onMessage("error", (message) => {
      console.log(message);
    });
  };

  onMount(async () => {
    // Connect to game room and listen for state change
    await handleRoom();
  });
</script>

{#if client}
  {#if $appStore.currentRoom === "characterCreation"}
    <CharacterCreation />
  {/if}
  {#if $appStore.currentRoom === "lobby"}
    <Lobby />
  {/if}
  {#if $appStore.currentRoom === "game"}
    <Game />
  {/if}
{/if}
