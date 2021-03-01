<script>
  import { RoomAvailable } from "colyseus.js";
  import { onMount } from "svelte";
  import { lobbyState, appStore } from "../stores";
  import PlayerBoard from "./PlayerBoard.svelte";

  export let client;

  // Check if roomId is in URL --> /?c=1f0bbd3c1

  let allRooms = [];
  let lobbyUrl;

  $: if ($lobbyState) {
    if ($lobbyState.roomId) {
      lobbyUrl = `${window.location.host}/?c=${$lobbyState.roomId}`;
    }
  }

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const lobbyId = urlParams.get("c");

    let lobby;
    if (lobbyId) {
      console.log("joining lobby");
      lobby = await client.joinById(lobbyId);
    } else {
      console.log("creating lobby");
      lobby = await client.create("lobby");
    }

    console.log(lobby.sessionId, "joined", lobby.name);

    lobby.onStateChange((state) => {
      $lobbyState = state;
      console.log($lobbyState);
    });

    lobby.onMessage("rooms", (rooms) => {
      allRooms = rooms;
    });

    lobby.onMessage("+", ([roomId, room]) => {
      const roomIndex = allRooms.findIndex((room) => room.roomId === roomId);
      if (roomIndex !== -1) {
        allRooms[roomIndex] = room;
      } else {
        allRooms.push(room);
      }
    });

    lobby.onMessage("-", (roomId) => {
      allRooms = allRooms.filter((room) => room.roomId !== roomId);
    });
  });

  console.log(allRooms);

  const joinRoom = () => {
    $appStore.currentRoom = "game";
  };
</script>

{#if $lobbyState}
  <button on:click={joinRoom}> Play! </button>

  <label for="lobbyUrl">Invite Link</label>
  <input name="lobbyUrl" id="lobbyUrl" type="text" bind:value={lobbyUrl} />

  <PlayerBoard store={lobbyState} />
{:else}
  <p>loading...</p>
{/if}
