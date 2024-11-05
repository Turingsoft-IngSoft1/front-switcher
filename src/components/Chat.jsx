import React, { useState, useEffect, useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import '../styles/Chat.css';

const AsciiArtSelector = ({ onSelect }) => {
    const asciiArts = [
        '¯\\_(ツ)_/¯',
        '( ͡° ͜ʖ ͡°)',
        'ಠ_ಠ',
        '(╯°□°）╯︵ ┻━┻',
        '┬─┬ ノ( ゜-゜ノ)',
        ' /\\_/\\\n( o.o )\n > ^ <',
        '(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄',
        '(ಥ﹏ಥ)',
    ];

    const popover = (
        <Popover className="ascii-art-popover">
            <Popover.Body>
                <div className="ascii-art-selector">
                    {asciiArts.map((art, index) => (
                        <div key={index} onClick={() => onSelect(art)} className="ascii-art-item">
                            {art}
                        </div>
                    ))}
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger={['click', 'focus']}
            placement="left"
            overlay={popover}
        >
            <button className="ascii-button">ASCII</button>
        </OverlayTrigger>
    );
};

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState('');
    const [sender, setSender] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, sender: 'me' }]);
            setNewMessage('');
        }
    };

    const handleReceiveMessage = () => {
        if (receivedMessage.trim() !== '' && sender.trim() !== '') {
            setMessages([...messages, { text: receivedMessage, sender }]);
            setReceivedMessage('');
            setSender('');
        }
    };

    const handleKeyPress = (event, type) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (type === 'send') {
                handleSendMessage();
            } else if (type === 'receive') {
                handleReceiveMessage();
            }
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
                    onKeyDown={(e) => handleKeyPress(e, 'send')}
                    style={{ resize: 'none' }}
                />
                <button onClick={handleSendMessage}>Send</button>
                <AsciiArtSelector onSelect={(art) => {
                    setMessages([...messages, { text: art, sender: 'me' }]);
                }}/>
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Sender name"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                />
                <textarea
                    placeholder="Received message"
                    value={receivedMessage}
                    onChange={(e) => setReceivedMessage(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, 'receive')}
                    style={{ resize: 'none' }}
                />
                <button onClick={handleReceiveMessage}>Receive</button>
            </div>
        </div>
    );
};

export default Chat;
