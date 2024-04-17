import React, { useState } from 'react';
import EnqueueButton from './EnqueueButton';

function App() {
  const [lobbyId, setLobbyId] = useState('');

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
      <EnqueueButton lobbyId={lobbyId} />
    </div>
  );
}

export default App;