import React from 'react'
import { Button, Modal} from 'react-bootstrap';
import { GameContext, GameProvider } from '../contexts/GameContext.jsx';
import { useState, useContext } from 'react';

function JoinButton ({selectedMatch}) {
    const { idGame, namePlayer, idPlayer, players, fase, setIdGame, setIdPlayer, setNamePlayer, setPlayers, setFase} = useContext(GameContext);
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
          const newIdPlayer = responseData.new_player_id;
          console.log('Response:', responseData);
          setIdGame(selectedMatch.id);
          setIdPlayer(newIdPlayer);
          setNamePlayer(nickname);
          setFase('lobby');
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
                   <Modal.Header>
                        <h4> Escriba un nickname para usar </h4>
                   </Modal.Header>
                   <Modal.Body>
                        <input className='mb-3 form-control w-100' placeholder="Escriba su nombre..." type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  onClick={handleSubmit} variant='success'>Aceptar</Button>
                        <Button  onClick={handleClose} variant='danger'>Cerrar</Button>
                    </Modal.Footer>
            </Modal>
        </div>
    );
}

export default JoinButton