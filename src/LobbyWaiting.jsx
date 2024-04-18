import React, { useContext } from 'react';
import LobbyContext from './LobbyContext';

function LobbyWaiting() {
  const { lobbyId, clientId, screenName, setScreenName, joinedLobby } = useContext(LobbyContext);

  const handleChangeScreenName = async () => {
    try {
      const instruction = {
        type: 'change-name',
        data: screenName,
      };
      await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyId, clientId, instruction }),
      });
    } catch (error) {
      console.error('Error changing screen name:', error);
      alert('Failed to change screen name. Please try again.');
    }
  };

  if (!joinedLobby) {
    return null;
  }

  return (
    <div>
      <h2>Change Display Name:</h2>
      <input
        type="text"
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
        placeholder="Screen Name"
      />
      <button onClick={handleChangeScreenName}>Change Name</button>
    </div>
  );
}

export default LobbyWaiting;