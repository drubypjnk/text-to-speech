import React, { useState } from 'react';
import axios from "axios";

const openAIApiKey = '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';
const speechUrl = 'https://api.openai.com/v1/audio/speech';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAIApiKey}`
};

export const GptTts = () => {
    const [rootPostList, setRootPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState("alloy"); // State to hold the selected author
    const authors = ["alloy", "echo", "nova","Shimmer"]; // Array of authors
    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            const newItem = {
                content: inputText,
                createDate: new Date().toLocaleTimeString()
            };

            setRootPostList([...rootPostList, newItem]);
            setInputText('');
            await voiceGenerator(newItem.content);
        }
    }

    async function voiceGenerator(text) {
        const body = {
            "model": "tts-1",
            "input": text,
            "voice": selectedAuthor,
            "response_format": "mp3",
            "speed": 0.9
        };

        try {
            const response = await axios.post(speechUrl, body, { headers: headers, responseType: 'arraybuffer' });

            if (response.status === 200 || response.status === 204) {
                const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const newAudio = new Audio(audioUrl);
                newAudio.play();
            } else {
                console.error('Failed to fetch audio from OpenAI API');
            }
        } catch (error) {
            console.error('OpenAI API failed:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div style={{ height: '400px', border: '1px solid #dfdfdf', overflow: 'auto' }}>
                <ul>
                    {rootPostList.map((item, index) => (
                        <li key={index} style={{ fontSize: 14 }}>
                            <div className={"container"}>
                                <div className={"col-1"} style={{ color: "red" }}>{item.createDate}</div>
                                <p style={{ wordBreak: 'break-word', fontWeight: 400 }} className={"col-7"}>{item.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <label htmlFor="author" className="form-label" style={{ fontSize: 14 }}>Select Author:</label>
                <select
                    id="author"
                    className="form-control"
                    style={{ fontSize: 14 }}
                    value={selectedAuthor} // Set the selected author
                    onChange={(e) => setSelectedAuthor(e.target.value)} // Handle the change event
                >
                    <option value="">Select an author</option>
                    {authors.map((author, index) => (
                        <option key={index} value={author}>{author}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="email" className="form-label" style={{ fontSize: 14 }}>Content:</label>
                <textarea
                    className="form-control"
                    id="email"
                    placeholder="Enter text"
                    name="text"
                    style={{ fontSize: 16,minHeight:140 }}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleEnter}
                    disabled={loading}
                />
                {loading && <div style={{fontStyle:18,color:"blue"}}>Loading...</div>}
            </div>
        </>
    )
}
