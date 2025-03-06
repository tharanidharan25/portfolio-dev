import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {

    const profile = useSelector(store => store.profile);

    const getContent = (data) => {
        switch (data.id) {
            case 'about':
                return (
                    <div 
                        className="profile-card-container"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            ...data.style,
                        }}
                    >
                        <div className="profile-card-title-container">
                            <p
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    color: '#e7c6ff',
                                }}
                            >{data.title}</p>
                        </div>
                        <div className="profile-card-subtitle-container">
                            <p
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                }}
                            >{data.subTitle}</p>
                        </div>
                        <div className="profile-card-content-container">
                            <p>{data.content}</p>
                        </div>
                        {/* <div className="footer-container">
                            <p>{data.footer}</p>
                        </div> */}
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