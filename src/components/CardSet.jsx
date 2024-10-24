import '../styles/cards.css';
import { Image, Container, Col, Row } from 'react-bootstrap';
import {onMouseEnter} from 'react';
import imgtest from '../styles/cards/fig01.svg'
import { useContext, useEffect, useState } from "react";
import { GameContext } from '../contexts/GameContext.jsx';
import React from 'react';
import Fig02 from '../styles/cards/fig02.svg';
import Fig01 from '../styles/cards/fig01.svg';
import Fig03 from '../styles/cards/fig03.svg';
import Fig04 from '../styles/cards/fig04.svg';
import Fig05 from '../styles/cards/fig05.svg';
import Fig06 from '../styles/cards/fig06.svg';
import Fig07 from '../styles/cards/fig07.svg';
import Fig08 from '../styles/cards/fig08.svg';
import Fig09 from '../styles/cards/fig09.svg';
import Fig10 from '../styles/cards/fig10.svg';
import Fig11 from '../styles/cards/fig11.svg';
import Fig12 from '../styles/cards/fig12.svg';
import Fig13 from '../styles/cards/fig13.svg';
import Fig14 from '../styles/cards/fig14.svg';
import Fig15 from '../styles/cards/fig15.svg';
import Fig16 from '../styles/cards/fig16.svg';
import Fig17 from '../styles/cards/fig17.svg';
import Fig18 from '../styles/cards/fig18.svg';
import Fige01 from '../styles/cards/fige01.svg';
import Fige02 from '../styles/cards/fige02.svg';
import Fige03 from '../styles/cards/fige03.svg';
import Fige04 from '../styles/cards/fige04.svg';
import Fige05 from '../styles/cards/fige05.svg';
import Fige06 from '../styles/cards/fige06.svg';
import Fige07 from '../styles/cards/fige07.svg';

const dictImg = {
    'fig01': Fig01,
    'fig02': Fig02,
    'fig03': Fig03,
    'fig04': Fig04,
    'fig05': Fig05,
    'fig06': Fig06,
    'fig07': Fig07,
    'fig08': Fig08,
    'fig09': Fig09,
    'fig10': Fig10,
    'fig11': Fig11,
    'fig12': Fig12,
    'fig13': Fig13,
    'fig14': Fig14,
    'fig15': Fig15,
    'fig16': Fig16,
    'fig17': Fig17,
    'fig18': Fig18,
    'fige01': Fige01,
    'fige02': Fige02,
    'fige03': Fige03,
    'fige04': Fige04,
    'fige05': Fige05,
    'fige06': Fige06,
    'fige07': Fige07
}

function CardSwitcher({ imgsource, onSelect, isSelected }) {
  return (
    <Container onClick={onSelect} 
                className={`card-switcher ${isSelected ? 'is-selected-figure' : ''}`}>
      <Row>
        <Image src={imgsource} className="img-content" />
      </Row>
    </Container>
  );
}

export default function CardSetFig({ idOwnsSet, position, isHorizontal }) {
  const { idPlayer, infoPlayers, players, turnPlayer, playersNames,
        selectedFigureCard, setSelectedFigureCard, setSelectedMovementCard, setSelectedTiles
   } =
    useContext(GameContext);
  const [currentPlayers, setCurrentPlayers] = useState(players);
  const [actualCards, setActualCards] = useState([]);
    let firstPlayer = '';

  useEffect(() => {
    setCurrentPlayers(players);
  }, [players]);

  useEffect(() => {
    const actualPlayer = infoPlayers.find((p) => p.id_user === idOwnsSet);
    setActualCards(actualPlayer ? actualPlayer.figures : []);
    console.log('ACTUALIZACIONNN');
    if(actualPlayer && actualPlayer.figures){
      console.log(actualPlayer.figures);
    }
}, [infoPlayers]);


  if (currentPlayers.length > position && position != 0) {
        const otherPlayers = currentPlayers.filter(player => player != idPlayer);
        firstPlayer = otherPlayers[position-1];
  }

  const handleClick = (idx) => {
    const infoSelectedCard = {
        idPlayer: idOwnsSet,
        offsetCard: idx,
        nameFig: actualCards[idx]
    };
    console.log(infoSelectedCard);
    setSelectedFigureCard(selectedFigureCard?.offsetCard == idx &&
        selectedFigureCard?.idPlayer == idOwnsSet? null : infoSelectedCard);
    setSelectedMovementCard([null, null]);
    setSelectedTiles([]);
  };
  return (
    <Row>
      <Col className={isHorizontal ? "cardset-horizontal" : "cardset-vertical"}>
        <Row className="justify-content-md-center">
          <h4 className={turnPlayer == firstPlayer ? "has-turn" : "not-turn"}>
            {position != 0
              ? firstPlayer
                ? playersNames[currentPlayers.indexOf(firstPlayer)]
                : "Disconnected"
              : ""}
          </h4>
        </Row>
        <Row className="justify-content-md-center bg-cardset">
          <Col xs="auto" className="carta">
            {actualCards[0] && (
              <CardSwitcher
                onSelect={() => handleClick(0)}
                imgsource={dictImg[actualCards[0]]}
                isSelected={selectedFigureCard && selectedFigureCard.offsetCard == 0 && selectedFigureCard.idPlayer == idOwnsSet}
                />
            )}
          </Col>
          <Col xs="auto" className="carta">
            {actualCards[1] && (
              <CardSwitcher
                onSelect={() => handleClick(1)}
                imgsource={dictImg[actualCards[1]]}
                isSelected={selectedFigureCard && selectedFigureCard.offsetCard == 1 && selectedFigureCard.idPlayer == idOwnsSet}
                />
            )}
          </Col>
          <Col xs="auto" className="carta">
            {actualCards[2] && (
              <CardSwitcher
                onSelect={() => handleClick(2)}
                imgsource={dictImg[actualCards[2]]}
                isSelected={selectedFigureCard && selectedFigureCard.offsetCard == 2 && selectedFigureCard.idPlayer == idOwnsSet}
                />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
