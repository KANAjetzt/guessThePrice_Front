<script>
  import { roomStore, roomState, appStore } from "../stores";
  import * as Colyseus from "colyseus.js";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);

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

  export const handleRoom = async () => {
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
</script>
