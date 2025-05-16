import React, { useState } from 'react';
import './VirtualKeyboard.css';

const keyboardLayouts = {
    French: [
        ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
        ['W', 'X', 'C', 'V', 'B', 'N', 'Backspace', 'Enter']
    ],
    German: [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace', 'Enter']
    ],
    English: [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace', 'Enter']
    ],
    Japanese: [
        ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'],
        ['さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と'],
        ['な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ'],
        ['ま', 'み', 'む', 'め', 'も', 'Backspace', 'Enter']
    ],
    Tamil: [
        ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ'],
        ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம'],
        ['ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'Backspace', 'Enter']
    ],
    Korean: [
        ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
        ['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
        ['Backspace', 'Enter']
    ],
};

function VirtualKeyboard() {
    const [language, setLanguage] = useState('English');
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [showEmoji, setShowEmoji] = useState(false);

    // Handle key press
    const handleKeyPress = (key) => {
        const newInput = key === 'Backspace' ? input.slice(0, -1) : key === 'Enter' ? input + '\n' : input + key;

        if (historyIndex === history.length - 1) {
            setHistory([...history, newInput]);
        } else {
            setHistory([...history.slice(0, historyIndex + 1), newInput]);
        }
        setHistoryIndex(historyIndex + 1);
        setInput(newInput);
    };

    // Undo action
    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setInput(history[historyIndex - 1]);
        }
    };

    // Redo action
    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setInput(history[historyIndex + 1]);
        }
    };

    // Insert emoji into the input
    const insertEmoji = (emoji) => {
        setInput(input + emoji);
        setShowEmoji(false);
    };

    return (
        <div className="keyboard-page">
            <div className="keyboard-container">
                <h3>Select Language:</h3>
                <select onChange={(e) => setLanguage(e.target.value)} value={language}>
                    {Object.keys(keyboardLayouts).map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>

                <div className="keyboard-input">
                    <textarea
                        rows="4"
                        value={input}
                        readOnly
                        style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
                    />
                </div>

                <div className="keyboard-controls">
                    <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
                    <button onClick={redo} disabled={historyIndex >= history.length - 1}>Redo</button>
                    <button onClick={() => setShowEmoji(!showEmoji)}>Emoji</button>
                    <select onChange={(e) => setFontSize(e.target.value)} value={fontSize}>
                        {[12, 14, 16, 18, 20].map((size) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setFontFamily(e.target.value)} value={fontFamily}>
                        {['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'].map((font) => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </div>

                {showEmoji && (
                    <div className="emoji-picker">
                        {['😊', '😂', '😍', '😎', '😢', '😡', '👍', '👎'].map((emoji) => (
                            <button key={emoji} onClick={() => insertEmoji(emoji)}>{emoji}</button>
                        ))}
                    </div>
                )}

                <div className="keyboard-keys">
                    {keyboardLayouts[language].map((row, rowIndex) => (
                        <div key={rowIndex} className="keyboard-row">
                            {row.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleKeyPress(key)}
                                    className={key === 'Backspace' || key === 'Enter' ? 'special-key' : ''}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VirtualKeyboard;
