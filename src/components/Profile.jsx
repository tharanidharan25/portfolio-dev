import React from "react";
import { useSelector } from "react-redux";
import { motion } from 'motion/react'

import { BiLogoGmail } from "react-icons/bi";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { TbBrandLeetcode } from "react-icons/tb";

import ReusableIconBtn from "../utils/ReusableIconBtn";
import ContentContainer from "./Content/shared/ContentContainer";

const contactIconsMap = (icon, styles) => {
    switch (icon) {
        case 'mailIcon':
            return <BiLogoGmail size={'4rem'} style={styles} />
        case 'linkedInIcon':
            return <AiOutlineLinkedin size={'4rem'} style={styles} />
        case 'gitHubIcon':
            return <FaGithub size={'4rem'} style={styles} />
        case 'leetcodeIcon':
            return <TbBrandLeetcode size={'4rem'} style={styles} />
        default:
            return null;
    }
}

export default function Profile() {

    const profile = useSelector(store => store.profile);
    const isMobile = useSelector(store => store.app.isMobile);

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
                        <div className="title-container">
                            <p
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    color: '#e7c6ff',
                                }}
                            >{data.title}</p>
                        </div>
                        <ContentContainer
                            className="about-card-container"
                            // borderColor="rgb(97, 62, 163)"
                            borderColor="radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(44,44,46,1) 35%, rgba(70,74,75,1) 100%)"
                            borderWidth={1}
                            key={'about-container'}
                        >
                            <div className="subtitle-container">
                                <p
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                    }}
                                >{data.subTitle}</p>
                            </div>
                            <div className="text-content-container">
                                <p>{data.content}</p>
                            </div>
                        </ContentContainer>
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
                        <div className="title-container">
                            <p
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    color: '#e7c6ff',
                                }}
                            >{data.title}</p>
                        </div>
                        <motion.div
                            className="contacts-container"
                        >
                            {data.contacts.map(eachContact => (
                                <ContentContainer
                                    className="each-contact-container"
                                    key={eachContact.id}
                                    styles={{
                                        position: 'relative',
                                        borderRadius: '0.1rem',
                                        background: eachContact.background,
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        window.open(eachContact.link, `${eachContact.id !== 'mail' ? '_blank' : '_self'}`)
                                    }}
                                    borderColor={eachContact.borderColor}
                                    borderWidth={2}
                                    whileHover={{
                                        rotate: '2.5deg',
                                        scale: 1.05,
                                        zIndex: 1000,
                                        background: `${eachContact.hoverBgColor}`
                                    }}
                                >
                                    <div>
                                        {contactIconsMap(eachContact.icon, {
                                            color: eachContact.iconColor,
                                        })}
                                    </div>
                                    <div
                                        className="copy-btn"
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0
                                        }}
                                    >
                                        <ReusableIconBtn
                                            sx={{
                                                padding: '0.5rem'
                                            }}
                                            className='copy-btn'
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                await navigator.clipboard.writeText(eachContact.copyLink)
                                            }}
                                        >
                                            <IoCopyOutline size={'1.25rem'} color='#fff' />
                                        </ReusableIconBtn>
                                    </div>
                                </ContentContainer>
                            ))}
                        </motion.div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div
            className="profile-container"
            style={{ paddingBottom: '1rem' }}
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