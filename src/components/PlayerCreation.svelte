<script>
  import { roomState, roomStore, appStore } from "../stores";

  let player = [...$roomState.playerStates.$items].filter(
    (player) => player[1].id === $roomStore.sessionId
  )[0][1];

  let name = player.name;
</script>

<img src={player.avatar} alt="" />
<input type="text" bind:value={name} />
