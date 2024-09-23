import React from 'react'
import { Button } from 'react-bootstrap';

function JoinButton ({selectedMatch}) {
    const handleJoinRequest = () => {
        if (selectedMatch) {
            // Send join request logic here
            console.log(`Joining match: ${selectedMatch.id}`);
        }
    };
    return (
        <Button variant='dark' onClick={handleJoinRequest} disabled={!selectedMatch}>
            Unirse a la sala
        </Button>
    );
}

export default JoinButton