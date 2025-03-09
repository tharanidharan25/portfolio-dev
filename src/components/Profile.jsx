import React from "react";
import { useSelector } from "react-redux";

import { BiLogoGmail } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

import ReusableIconBtn from "../utils/ReusableIconBtn";

const contactIconsMap = (icon, styles) => {
    const iconStyles = {
        width: '100%',
        height: '100%',
        ...styles
    }
    switch (icon) {
        case 'mailIcon':
            return <BiLogoGmail size={200} style={iconStyles} />
        case 'linkedInIcon':
            return <AiOutlineLinkedin style={iconStyles} />
        case 'gitHubIcon':
            return <FaGithub style={iconStyles} />
        default:
            return null;
    }
}

export default function Profile() {

    const profile = useSelector(store => store.profile);

    const getContent = (data) => {
        switch (data.id) {
            case 'about':
                return (
                    <div
                        style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                ...data.style,
                            }}
                    >
                        <div className="about-card-title-container">
                            <p
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    color: '#e7c6ff',
                                }}
                            >{data.title}</p>
                        </div>
                        <div 
                            className="about-card-container"
                        >
                            <div className="about-card-subtitle-container">
                                <p
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                    }}
                                >{data.subTitle}</p>
                            </div>
                            <div className="about-card-content-container">
                                <p>{data.content}</p>
                            </div>
                            {/* <div 
                                className="about-card-footer-container">
                                <p>{data.footer}</p>
                            </div> */}
                        </div>
                    </div>
                )
            case 'contact':
                return (
                    <div
                        style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                ...data.style,
                            }}
                    >
                        <div className="about-card-title-container">
                            <p
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    color: '#e7c6ff',
                                }}
                            >{data.title}</p>
                        </div>
                        <div
                            className="contacts-container"
                            style={{
                                height: '240px',
                                display: 'flex',
                                gap: '1rem',
                            }}
                        >
                            {data.contacts.map(eachContact => (
                                <div
                                    className="each-contact-container"
                                    id={eachContact.id}
                                    style={{
                                        position: 'relative',
                                        borderRadius: '0.5rem',
                                        background: eachContact.background,
                                    }}
                                >
                                    <a href={eachContact.link} target={eachContact.id !== 'mail' ? '_blank' : '_self'}>
                                        {contactIconsMap(eachContact.icon, {
                                            color: eachContact.iconColor,
                                        })}
                                    </a>
                                    <div
                                        className="copy-btn"
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                        }}
                                    >
                                        <ReusableIconBtn
                                            sx={{
                                                padding: '0.5rem'
                                            }}
                                            className='copy-btn'
                                            onClick={async () => await navigator.clipboard.writeText(eachContact.copyLink)}
                                        >
                                            <IoCopyOutline />
                                        </ReusableIconBtn>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            
            default:
                return null
        }
    }

    return (
        <div 
            className="profile-container"
        >
            <div
                style={{
                    marginBottom: '1rem',
                }}
            >
                <h2
                    className="yeah-its-me"
                >
                    {profile.name.split('').map((letter, idx) => (
                        <span className="part-of-me" key={idx}>
                            {letter}
                        </span>
                    ))}
                </h2>
            </div>
            <section className="data-container">
                <div 
                    className="each-data-container"
                    style={{
                        display: 'grid',
                        gridAutoFlow: 'dense',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Do for other screen sizes as well
                        alignItems: 'stretch',
                        gap: '1rem'
                    }}
                >
                    {profile.data.map(eachData => (getContent(eachData)))}
                </div>
            </section>
            
        </div>
    )
}