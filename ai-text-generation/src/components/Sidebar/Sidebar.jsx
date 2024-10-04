import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

// import { BrowserRouter,Route,Routes,Link } from "react-router-dom";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
                <div className="new-chat" onClick={newChat}>
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} className="recent-entry" onClick={() => loadPrompt(item)}>
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.length > 18 ? `${item.slice(0, 18)}...` : item}</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                {/* <BrowserRouter> */}
                    <div className="bottom-item recent-entry">
                        <a href=""><img src={assets.category_icon} alt="category Icon" /></a>
                        {extended ? <p>AI Category</p> : null}
                    </div>
                    
                {/* </BrowserRouter> */}
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;









/*
import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); // Corrected typo in setRecentPrompt

    const loadPrompt = async (prompt) =>{
      setRecentPrompt(prompt);
      await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="Menu Icon" />
                <div className="new-chat" onClick={()=>newChat}>
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} className="recent-entry" onClick={()=>loadPrompt(item)} >
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.slice(0,18)}...</p>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="Question Icon" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="History Icon" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="Settings Icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
*/



















/* ===========================================================
import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/context'


const App = () => {
    
    const [extended,setExtended] = useState(false)
    const {onSent,prevPrompts,setRecentPromt} = useContext(Context)
   
    
    return (
      <div className='sidebar'>
        <div className="top">
          <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
          <div className="new-chat">
              <img src={assets.plus_icon} alt="" />
              {extended?<p>New Chat</p>:null}
          </div>
          {extended
          ?<div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item,index)=>{
                return (
                  <div key={index} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item}</p>
                  </div>
                )
              })}
              <div className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>Hello</p>
              </div>               
          </div> 
          :null       
      }
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
              <img src={assets.question_icon} alt="" />
              {extended?<p>Help</p>:null}
          </div>
          <div className="bottom-item recent-entry">
              <img src={assets.history_icon} alt="" />
              {extended?<p>Activity</p>:null}
          </div>
          <div className="bottom-item recent-entry">
              <img src={assets.setting_icon} alt="" />
              {extended?<p>Settings</p>:null}
          </div>
        </div>
      </div>
    )
}

export default App
================================================================  */