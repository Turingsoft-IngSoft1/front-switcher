import React from 'react'
import { Button, Modal} from 'react-bootstrap';
import { GameContext, GameProvider } from '../contexts/GameContext.jsx';
import { useState, useContext } from 'react';

function JoinButton ({selectedMatch}) {
    const { idGame, idPlayer, players, fase, setIdGame, setIdPlayer, setPlayers, setFase} = useContext(GameContext);
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState('');

    const handleJoinRequest = () => {
        if (selectedMatch) {
            setShowModal(true);
            console.log(`Trying to join match: ${selectedMatch.id}`);
        }
    };

    const handleClose = () => setShowModal(false);

    const handleSubmit = () => {
        if (nickname.trim()) {
            joinGame();
            setShowModal(false);
        }
    };
    const joinGame = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/join_game', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_game: selectedMatch.id,
                player_name: nickname
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error al unirse a la partida');
          }
          const responseData = await response.json();
          const newIdPlayer = responseData.id_player;
          console.log('Response:', responseData);
          setIdGame(selectedMatch.id);
          setIdPlayer(newIdPlayer);
          setFase('lobby');
          console.log('GameContext:', { idGame, idPlayer, players, fase });
          console.log(`Joined: ${selectedMatch.id}`)
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
        <div>
            <Button variant='success' onClick={handleJoinRequest} disabled={!selectedMatch}>
                Unirse a la sala
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <h4> Escriba un nickname para usar </h4>
                <input className='mb-3' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                <Button className='mb-3' onClick={handleSubmit} variant='success'>Aceptar</Button>
                <Button className='mb-1' onClick={handleClose} variant='danger'>Cerrar</Button>
            </Modal>
        </div>
    );
}

export default JoinButton