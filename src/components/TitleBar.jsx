import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableMenuBtn from "../utils/ReusableMenuBtn";

import { 
    VscVscodeInsiders, 
    VscMenu,
    VscArrowSmallLeft,
    VscArrowSmallRight,
    VscChromeClose,
    VscChromeMinimize,
    VscChromeMaximize,
    VscChromeRestore,
} from "react-icons/vsc";
import { updateFullScreened } from "../redux/slices/appSlice";

export default function TitleBar() {

    const dispatch = useDispatch()
    const windowWidth = useSelector(state => state.app.windowWidth);
    const fullScreened = useSelector(state => state.app.fullScreened);

    // const logoEmoji = () => {
    //     const emojis = ['😎', '😶‍🌫️', '😭', '🤡', '😏', '😚', '👀', '🤹'];
    //     return emojis[Math.floor(Math.random() * (emojis.length - 0) + 0 )]
    // }

    const toggleFullScreen = () => {
        const root = document.getElementById("root");
        if (window.document.fullscreen) {
            window.document.exitFullscreen()
                .then(() => {
                    dispatch(updateFullScreened(false))
                })
                .catch(() => {
                    dispatch(updateFullScreened(true))
                })
            } else {
                root.requestFullscreen()
                .then(() => {
                    dispatch(updateFullScreened(true))
                })
                .catch(() => {
                    dispatch(updateFullScreened(false))
                })
        }
    }

    return (
        <header className="title-bar">
            <div 
                className="title-bar-options"
            >
                <div className="logo">
                    <VscVscodeInsiders color="#4895ef" size={'18px'}/>
                </div>
                {windowWidth > 1440 ? (<>
                <ReusableMenuBtn>File</ReusableMenuBtn>
                <ReusableMenuBtn>Edit</ReusableMenuBtn>
                <ReusableMenuBtn>Selection</ReusableMenuBtn>
                <ReusableMenuBtn>View</ReusableMenuBtn>
                <ReusableMenuBtn>Go</ReusableMenuBtn>
                <ReusableMenuBtn>Run</ReusableMenuBtn>
                <ReusableMenuBtn>Terminal</ReusableMenuBtn>
                <ReusableMenuBtn>Help</ReusableMenuBtn></>) : 
                (<ReusableMenuBtn><VscMenu size={16}/></ReusableMenuBtn>)
                }
            </div>
            <div className="title-bar-search">
                <div className="title-bar-navigation">
                    <button className="previous-arrow" disabled>
                        <ReusableMenuBtn>
                            <VscArrowSmallLeft size= '1.25rem' color="#eeffff" />
                        </ReusableMenuBtn>
                    </button>
                    <button className="next-arrow" disabled>
                        <ReusableMenuBtn>
                            <VscArrowSmallRight size= '1.25rem' color="#eeffff"/>
                        </ReusableMenuBtn>
                    </button>
                </div>
                <input className="search-input" placeholder="Portfolio">
                </input>
            </div>
            <div className="title-bar-close-btns-container">
                <ReusableMenuBtn>
                    <VscChromeMinimize size= '1.25rem' color="#eeffff"/>
                </ReusableMenuBtn>
                <ReusableMenuBtn onClick={() => toggleFullScreen()}>
                    {!fullScreened ? (<VscChromeMaximize size= '1.25rem' color="#eeffff"/>) : (<VscChromeRestore size= '1.25rem' color="#eeffff"/>)}
                </ReusableMenuBtn>
                <ReusableMenuBtn onClick={() => {
                    window.close();
                }}>
                    <VscChromeClose  size= '1.25rem' color="#eeffff"/>
                </ReusableMenuBtn>
            </div>
        </header>
    )
}