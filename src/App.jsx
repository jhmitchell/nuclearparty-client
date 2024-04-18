import React from 'react';
import { LobbyProvider } from './LobbyContext';
import LobbyJoin from './LobbyJoin';
import LobbyWaiting from './LobbyWaiting';

function App() {
  return (
    <LobbyProvider>
      <div>
        <h1>Lobby App</h1>
        <LobbyJoin />
        <LobbyWaiting />
      </div>
    </LobbyProvider>
  );
}

export default App;