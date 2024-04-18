import React, { useContext } from 'react';
import LobbyContext from './LobbyContext';

function LobbyJoin() {
  const { lobbyId, setLobbyId, clientId, joinedLobby, setJoinedLobby } = useContext(LobbyContext);

  const handleJoinLobby = async () => {
    try {
      const instruction = {
        type: 'user-join',
        data: lobbyId,
      };
      const response = await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyId, clientId, instruction }),
      });

      if (response.ok) {
        setJoinedLobby(true);
      } else {
        throw new Error('Failed to join lobby');
      }
    } catch (error) {
      console.error('Error joining lobby:', error);
      alert('Failed to join lobby. Please try again.');
    }
  };

  if (joinedLobby) {
    return null;
  }

  return (
    <div>
      <h2>Enter Lobby ID:</h2>
      <input
        type="text"
        value={lobbyId}
        onChange={(e) => setLobbyId(e.target.value)}
        placeholder="Lobby ID"
      />
      <button onClick={handleJoinLobby}>Join Lobby</button>
    </div>
  );
}

export default LobbyJoin;