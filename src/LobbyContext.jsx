import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LobbyContext = createContext();

export const LobbyProvider = ({ children }) => {
  const [lobbyId, setLobbyId] = useState('');
  const [clientId, setClientId] = useState(uuidv4());
  const [screenName, setScreenName] = useState('');
  const [joinedLobby, setJoinedLobby] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (joinedLobby) {
        try {
          const instruction = {
            type: 'user-leave',
            data: null,
          };
          await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lobbyId, clientId, instruction }),
          });
        } catch (error) {
          console.error('Error sending user-leave instruction:', error);
        }
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
