import React, { useState } from 'react';

function App() {
  const [lobbyId, setLobbyId] = useState('');

  const handleEmojiClick = async (emoji) => {
    try {
      const clientName = 'Web Client';
      const instruction = `emoji:${emoji}`;

      const response = await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyId, clientName, instruction }),
      });

      if (response.ok) {
        console.log('Emoji enqueued successfully!');
      } else {
        throw new Error('Failed to enqueue emoji');
      }
    } catch (error) {
      console.error('Error enqueueing emoji:', error);
      alert('Failed to enqueue emoji. Please try again.');
    }
  };

  return (
    <div>
      <h1>Lobby App</h1>
      <h2>Enter Lobby ID:</h2>
      <input
        type="text"
        value={lobbyId}
        onChange={(e) => setLobbyId(e.target.value)}
        placeholder="Lobby ID"
      />
      <div>
        <button onClick={() => handleEmojiClick('smiley')}>😊</button>
        <button onClick={() => handleEmojiClick('heart')}>❤️</button>
        <button onClick={() => handleEmojiClick('eggplant')}>🍆</button>
      </div>
    </div>
  );
}

export default App;