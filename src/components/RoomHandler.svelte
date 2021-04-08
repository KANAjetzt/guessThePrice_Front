<script>
  import { roomStore, roomState, appStore } from "../stores";
  import * as Colyseus from "colyseus.js";
  import { saveLS, getLS, deleteLS } from "../utils/localStorageHandler";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);

  const joinRoom = async (sessionData) => {
    console.log(sessionData);
    let room;
    if (sessionData.sessionId && sessionData.roomId) {
      console.log("reconnecting to Room");
      room = await client.reconnect(sessionData.roomId, sessionData.sessionId);
    }
    // Check if roomId is in URL --> /?c=1f0bbd3c1
    else if (sessionData.roomId) {
      console.log("joining Room");
      room = await client.joinById(sessionData.roomId);
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
    let sessionData = {};
    // get possible sessionData from LS
    if (getLS("sessionData")) {
      sessionData = getLS("sessionData");
    }

    if (Object.keys(sessionData).length === 0) {
      // get possible roomId from URLParams
      const urlParams = new URLSearchParams(window.location.search);
      sessionData.roomId = urlParams.get("c");
    }

    // join Room
    let room;
    try {
      room = await joinRoom(sessionData);
    } catch (e) {
      deleteLS("sessionData");
      sessionData = {};
      room = await joinRoom(sessionData);
    }

    console.log(room.sessionId, "joined", room.name);

    // save sessionId and roomId to LS ( for possible reconnection )
    saveLS({ sessionId: room.sessionId, roomId: room.id }, "sessionData");

    // delte LS when:
    // - Game is over?
    // - if the room dousen't exist!

    // store room object
    $roomStore = room;

    // start ping pong
    pingPong();

    // listen to state change
    room.onStateChange((state) => {
      $roomState = state;
      // console.log($roomState);
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

    // console.log("starting Game!");
    // await room.send("startGame");

    // // Send guessed price to BE
    // setTimeout(async () => {
    //   await room.send("guessedPrice", {
    //     guessedPrice: 2000,
    //   });
    // }, 500);
  };
</script>
