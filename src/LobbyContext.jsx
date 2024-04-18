import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LobbyContext = createContext();

export const LobbyProvider = ({ children }) => {
  const [lobbyId, setLobbyId] = useState('');
  const [clientId, setClientId] = useState(uuidv4());
  const [screenName, setScreenName] = useState('');
  const [joinedLobby, setJoinedLobby] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (joinedLobby) {
        const instruction = {
          type: 'user-leave',
          data: null,
        };
        const requestData = {
          lobbyId,
          clientId,
          instruction,
        };
        navigator.sendBeacon('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', JSON.stringify(requestData));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [joinedLobby, lobbyId, clientId]);

  return (
    <LobbyContext.Provider value={{ lobbyId, setLobbyId, clientId, screenName, setScreenName, joinedLobby, setJoinedLobby }}>
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyContext;
