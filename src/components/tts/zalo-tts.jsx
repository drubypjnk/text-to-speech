import React, { useState } from 'react';
import axios from "axios";
import qs from 'qs'; // Import thư viện qs để mã hóa dữ liệu thành x-www-form-urlencoded

const openAIApiKey = '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';
const zaloApiKey = 'DOb7TCux1buMsCl0inr7GeAMzAcJrjP5';
const speechUrl = 'https://api.openai.com/v1/audio/speech';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openAIApiKey}`
};

export const ZaloTTS = () => {
    const [rootPostList, setRootPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState("alloy"); // State to hold the selected author
    const options = [
        { id: 1, name: 'South women' },
        { id: 2, name: 'Northern women' },
        { id: 3, name: 'South men' },
        { id: 4, name: 'Northern men' }
    ];
    // State để lưu giá trị được chọn từ select
    const [selectedOption, setSelectedOption] = useState(2);

    // Hàm xử lý sự kiện khi select thay đổi
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleEnter = async (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            const newItem = {
                content: inputText,
                createDate: new Date().toLocaleTimeString()
            };

            setRootPostList([...rootPostList, newItem]);
            setInputText('');
            await handleTextToSpeech(newItem.content);
        }
    }
    const handleTextToSpeech = async (content) => {
        try {
            const postData = qs.stringify({
                input:content ,
                speaker_id: selectedOption,
                speed: '0.8'
            });

            const response = await axios.post(
                'https://api.zalo.ai/v1/tts/synthesize',
                postData,
                {
                    headers: {
                        'apikey': zaloApiKey,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'encode_type':'0'
                    }
                }
            ).then(response=>{
                const audioUrl = response.data.data.url;
                console.log(audioUrl);
                // setAudioUrl(audioUrl);
                // Phát âm thanh
                const audio = new Audio(audioUrl);
                audio.play();
                setLoading(false);
            });


        } catch (error) {
            setLoading(false);
            console.error('Error:', error);
        }
    };





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
                <select id="author" name="author" value={selectedOption} onChange={handleSelectChange}>
                    {/* Tạo các tùy chọn từ mảng options */}
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
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
