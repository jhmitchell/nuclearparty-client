import React, { useContext } from 'react';
import LobbyContext from './LobbyContext';

function LobbyWaiting() {
  const { joinedLobby } = useContext(LobbyContext);

  if (!joinedLobby) {
    return null;
  }

  return (
    <div>
      <p>Please wait for the lobby leader...</p>
    </div>
  );
}

export default LobbyWaiting;
