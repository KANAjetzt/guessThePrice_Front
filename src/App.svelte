<script>
  import * as Colyseus from "colyseus.js";
  import { roomState } from "./stores";

  const client = new Colyseus.Client("ws://localhost:2567");

  const joinRoom = async () => {
    const room = await client.joinOrCreate("my_room");
    console.log(room.sessionId, "joined", room.name);
    return room;
  };

  const handleRoom = async () => {
    // join Room
    const room = await joinRoom();

    // listen to state change
    room.onStateChange(state => {
      $roomState = state;
      console.log(room.name, "has new state:", state);
      console.log($roomState);
    });
  };

  let roomStatee;

  handleRoom();
</script>

<style>

</style>

<main>
  {console.log($roomState)}
  {#if $roomState && $roomState.prodcutTitle}
    <h2>{$roomState.productTitle}</h2>
  {/if}
</main>
