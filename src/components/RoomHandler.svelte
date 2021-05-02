<script>
  import { roomStore, roomState, appStore } from "../stores";
  import * as Colyseus from "colyseus.js";
  import { saveLS, getLS, deleteLS } from "../utils/localStorageHandler";

  const client = new Colyseus.Client(svelteEnv.BackendUrl);

  const joinRoom = async (sessionData) => {
    let room;
    if (sessionData.sessionId && sessionData.roomId) {
      room = await client.reconnect(sessionData.roomId, sessionData.sessionId);
    }
    // Check if roomId is in URL --> /?c=1f0bbd3c1
    else if (sessionData.roomId) {
      room = await client.joinById(sessionData.roomId);
    } else {
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

    // TODO: get rid of this duplicate code?!
    // get possible roomId from URLParams
    const urlParams = new URLSearchParams(window.location.search);
    const URLRoomId = urlParams.get("c");

    if (URLRoomId) {
      // if there is something add / overwrite roomId in sessionData
      sessionData.roomId = URLRoomId;
    }

    // join Room
    let room;
    try {
      room = await joinRoom(sessionData);
    } catch (e) {
      deleteLS("sessionData");
      sessionData = {};

      // get possible roomId from URLParams
      const urlParams = new URLSearchParams(window.location.search);
      sessionData.roomId = urlParams.get("c");

      room = await joinRoom(sessionData);
    }

    // save sessionId and roomId to LS ( for possible reconnection )
    saveLS({ sessionId: room.sessionId, roomId: room.id }, "sessionData");

    // store room object
    $roomStore = room;

    // start ping pong
    pingPong();

    // listen to state change
    room.onStateChange((state) => {
      $roomState = state.gameState;
      //console.log($roomState);
    });

    // listen to alivePong
    room.onMessage("alivePong", () => {
      // send alivePing back
      pingPong();
    });

    // listen to error
    // TODO: Add Toster and Fullpage Error Messages
    room.onMessage("error", (message) => {
      console.error(message);
    });
  };
</script>
