import React, { useState, useEffect, useRef, useContext } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { sendMessage } from '../utils/gameServices';
import { GameContext } from "../contexts/GameContext.jsx";
import { ChatWebSocketContext } from "../contexts/WebSocketContext.jsx"; 
import '../styles/Chat.css';

const AsciiArtSelector = ({ onSelect }) => {
    const asciiArts = [
        '¯\\_(ツ)_/¯',
        '( ͡° ͜ʖ ͡°)',
        'ಠ_ಠ',
        '(╯°□°）╯︵ ┻━┻',
        '┬─┬ ノ( ゜-゜ノ)',
        '(^._.^)ﾉ',
        '(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄',
        '(ಥ﹏ಥ)',
    ];

    const [target, setTarget] = useState(null);

    const handleClick = (event) => {
        setTarget(event.target);
    };

    const handleClose = () => {
        setTarget(null);
    };

    const handleSelect = (art) => {
        onSelect(art);
        handleClose();
    };

    const popover = (
        <Popover id="ascii-art-popover" className="ascii-art-popover">
            <Popover.Body>
                <div className="ascii-art-list">
                    {asciiArts.map((art, index) => (
                        <button
                            key={index}
                            className="ascii-art-item"
                            onClick={() => handleSelect(art)}
                            style={{ display: 'block', width: '100%', marginBottom: '5px' }}
                        >
                            {art}
                        </button>
                    ))}
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="ascii-selector" style={{ height: '100%' }}>
            <button className="ascii-button" onClick={handleClick} style={{ height: '100%', width: '60px' }}>
                ASCII
            </button>
            <Overlay
                show={Boolean(target)}
                target={target}
                placement="left"
                rootClose
                onHide={handleClose}
            >
                {popover}
            </Overlay>
        </div>
    );
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const { idGame, idPlayer } = useContext(GameContext);
    const { setShouldConnectChat } = useContext(ChatWebSocketContext); 

    useEffect(() => {
        setShouldConnectChat(true);
        return () => setShouldConnectChat(false);
    }, [setShouldConnectChat]);

    useEffect(() => {
        const handleChatMessage = (event) => {
            const { sender, message } = event.detail;
            setMessages(prev => [...prev, { text: message, sender }]);
        };

        document.addEventListener('chatMessage', handleChatMessage);
        return () => document.removeEventListener('chatMessage', handleChatMessage);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            const message = newMessage;
            setMessages([...messages, { text: message, sender: 'me' }]);
            setNewMessage('');
            await sendMessage(idGame, idPlayer, message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chat">
            <div className="messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
                    >
                        {message.sender !== 'me' && <span className="sender">{message.sender}</span>}
                        <span className="text">{message.text}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    style={{ resize: 'none' }}
                />
                <button onClick={handleSendMessage}>Send</button>
                <AsciiArtSelector onSelect={async (art) => {
                    setMessages([...messages, { text: art, sender: 'me' }]);
                    await sendMessage(idGame, idPlayer, art);
                }}/>
            </div>
        </div>
    );
};

export default Chat;
