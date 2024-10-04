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
        handleKeyPress
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


















/* ===========================================================
import { createContext, useState } from "react";
import runChat from "../config/chatstar";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompts(prev => [...prev,input])
        const response = await runChat(input)
        let responseArray = response.split("**");
        let newResponse="" ;
        for(let i=0; i<responseArray.length; i++)
        {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i= 0 ;i<newResponseArray.length ; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        // setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }
    // onSent("What is python")

    const contextValue = {
        prevPrompt,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
 ================================================================  */