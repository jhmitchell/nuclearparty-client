import React from 'react';

function EnqueueButton({ lobbyId }) {
  const enqueueMessage = async () => {
    try {
      const clientName = 'Web Client';
      const instruction = 'Hello from the web client!';

      const response = await fetch('https://nuclear-party-lobby-func.azurewebsites.net/api/addInstruction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyId, clientName, instruction }),
      });

      if (response.ok) {
        alert('Hello message enqueued successfully!');
      } else {
        throw new Error('Failed to enqueue hello message');
      }
    } catch (error) {
      console.error('Error enqueueing hello message:', error);
      alert('Failed to enqueue hello message. Please try again.');
    }
  };

  return <button onClick={enqueueMessage}>Enqueue Hello Message</button>;
}

export default EnqueueButton;