import React, { createContext, useState, useEffect } from 'react';

const LobbyContext = createContext();

export const LobbyProvider = ({ children }) => {
  const [lobbyId, setLobbyId] = useState('');
  const [clientName, setClientName] = useState('');
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
            body: JSON.stringify({ lobbyId, clientName, instruction }),
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
  }, [joinedLobby, lobbyId, clientName]);

  return (
    <LobbyContext.Provider value={{ lobbyId, setLobbyId, clientName, setClientName, joinedLobby, setJoinedLobby }}>
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyContext;