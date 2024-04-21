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
      //await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
      await fetch('http://172.22.55.140:5000/instructions', {
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

  const handleChangeColor = async (color) => {
    try {
      const instruction = {
        type: 'change-color',
        data: color,
      };
      //await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
      await fetch('http://172.22.55.140:5000/instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyId, clientId, instruction }),
      });
    } catch (error) {
      console.error('Error changing color:', error);
      alert('Failed to change color. Please try again.');
    }
  };

  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

  if (!joinedLobby) {
    return null;
  }

  return (
    <div>
      <p>Please wait for the lobby leader...</p>
      <h2>Change Screen Name:</h2>
      <input
        type="text"
        value={screenName}
        onChange={(e) => setScreenName(e.target.value)}
        placeholder="Screen Name"
      />
      <button onClick={handleChangeScreenName}>Change Name</button>
      <h2>Select Color:</h2>
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: color,
              margin: '5px',
              cursor: 'pointer',
              border: '2px solid black',
            }}
            onClick={() => handleChangeColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default LobbyWaiting;
