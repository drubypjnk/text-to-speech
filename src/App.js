import React, {Component} from 'react';

import Title from './components/form/Title';
import Search from './components/form/Search';
import Sort from './components/form/Sort';
import CreateForm from './components/form/CreateForm';
import ListItem from './components/form/ListItem';
import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {render} from "@testing-library/react";
import {GptTts} from "./components/tts/gpt-tts";
import {ZaloTTS} from "./components/tts/zalo-tts";

function App() {
    const options = [
        { id: 1, name: 'Open AI' },
        { id: 2, name: 'ZALO-AI' },
    ];
    const [selectedOption, setSelectedOption] = useState('1');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className={"container"} style={{padding:50}}>
                <h1>Text to speech</h1>
                <label htmlFor="author" className="form-label" style={{ fontSize: 18 }}>Select provider:</label>
                <select id="author" name="author" value={selectedOption} onChange={handleSelectChange}

                        style={{width:'108px',height:24,fontSize:15}}>
                    {/* Tạo các tùy chọn từ mảng options */}
                    {options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>

                {selectedOption==='1'&&(
                    <>
                        <GptTts/>
                    </>
                )}
                {selectedOption==='2'&&(
                    <>
                        <ZaloTTS/>
                    </>
                )}
            </div>
        </>


    );

}

export default App;
