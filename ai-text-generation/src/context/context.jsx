import { createContext, useState } from "react";
import runChat from "../config/chatstar";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    // ============= copy to clipboard function ==============
    const copyToClipboard = () => {
        navigator.clipboard.writeText(resultData).then(() => {
            alert("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };
    // ============= copy to clipboard function end ==============

    // ============= voice to text function ==============
    const startVoiceRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.onstart = () => {
            console.log("Voice recognition started. Speak into the microphone.");
        };
    
        recognition.onspeechend = () => {
            recognition.stop();
        };
    
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("User spoke:", transcript);
            setInput(transcript); // Set recognized text as input
        };
    
        recognition.onerror = (event) => {
            console.error("Error occurred in recognition: " + event.error);
        };
    
        recognition.start();
    }; 
    // ============= voice to text function end ==============
    

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        try {
            if (prompt) {
                response = await runChat(prompt);
                setRecentPrompt(prompt);
                setPrevPrompts(prev => [...prev, prompt]);
            } else {
                setPrevPrompts(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await runChat(input);
            }

            let responseArray = response.split("**");
            let newResponse = responseArray.map((word, i) => i % 2 === 1 ? `<b>${word}</b>` : word).join("");
            let formattedResponse = newResponse.split("*").join("<br/>");
            let newResponseArray = formattedResponse.split(" ");

            newResponseArray.forEach((word, i) => {
                delayPara(i, word + " ");
            });

        } catch (error) {
            console.error("Error fetching chat response:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    };
    // The user press the enter key to send the question
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && input.trim()) {
            onSent(input);
        }
    };

    // copy text code
    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        handleKeyPress,
        copyToClipboard,  // Expose copy to clipboard
        startVoiceRecognition // Expose voice-to-text function        
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;









/*
import { createContext, useState } from "react";
import runChat from "../config/chatstar";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]); // Corrected: Consistent plural naming
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index); // Corrected: Properly scoped the setTimeout inside the loop
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let respones;
        if (prompt !== undefined)
        {
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else
        {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]); // Corrected: Using consistent state setter for previous prompts

        try {
            const response = await runChat(input);
            let responseArray = response.split("**");
            let newResponse = "";
            
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }

            let formattedResponse = newResponse.split("*").join("</br>");
            let newResponseArray = formattedResponse.split(" ");

            newResponseArray.forEach((word, i) => {
                delayPara(i, word + " ");
            });

        } catch (error) {
            console.error("Error fetching chat response:", error);
        } finally {
            setLoading(false);
            setInput("");
        }
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;

*/