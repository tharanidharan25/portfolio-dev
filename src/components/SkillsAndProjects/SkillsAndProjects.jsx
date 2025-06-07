import React from "react"
import { useSelector } from "react-redux"

import Skill from "./shared/Skill"
import ContentContainer from "../Content/shared/ContentContainer"
import PropTypes from "prop-types"

export default function SkillsAndProjects() {

    const skillsData = useSelector(state => state.skillsAndProjects.skills)
    const projectsData = useSelector(state => state.skillsAndProjects.projects)

    // const baseText = 'Skills'
    // const count = useMotionValue(0)
    // const rounded = useTransform(count, latest => Math.round(latest))
    // const displayText = useTransform(rounded, latest => baseText.slice(0, latest))

    // const [skillsContent, animate] = useAnimate()

    // useEffect(() => {
    //     animate(skillsContent.current, { opacity: 1 }, { duration: 0.5 })
    //     const controls = animate(count, baseText.length, {
    //         type: 'tween',
    //         duration: 0.5,
    //         ease: 'easeInOut'
    //     })
    //     return controls.stop
    // }, [])

    const Project = ({ projectData }) => (
        <>
            <div className="subtitle-container">
                <p
                    className="project-heading"
                    style={{ fontSize: '1.25rem', fontWeight: '700' }}
                >
                    {projectData.title}
                </p>
            </div>
            <div
                className="tech-stack-container"
            >
                <div
                    className="tech-stack-title text-content-container"
                    style={{
                        color: '#e7c6ff',
                        whiteSpace: 'nowrap'
                    }}
                >
                    <p className="tech-stack-title">Tech Stack:</p>
                </div>
                <div
                    className="tech-stack-content text-content-container"
                    style={{
                        display: 'flex',
                        gap: '0.25rem',
                        color: '#fff',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {projectData.techStack.map((eachTech, idx) => (
                        <p key={idx} className="each-tech" >
                            {`${eachTech}${idx < (projectData.techStack.length - 1) ? ',' : ''}`}
                        </p>
                    ))}
                </div>
            </div>
            <div
                className="project-content-container text-content-container"
                style={{ padding: '0.5rem 0.5rem' }}
            >
                {projectData?.content?.map(eachData => (
                    <li
                        key={eachData.contentId}
                        className="projects-content-point"
                    >
                        {eachData.data}
                    </li>
                ))}
            </div>
        </>
    )

    Project.propTypes = {
        projectData: PropTypes.object
    }

    const getSkills = () => (
        <div key={'skills-container'} className="skills-container">
            {skillsData.map(eachSkill => (
                <div key={eachSkill.id} className="skill-column-container">
                    <div className="subtitle-container skill-heading-container">
                        <p className="skill-heading">
                            {eachSkill.label}
                        </p>
                    </div>
                    <div className="text-content-container skills-list-container">
                        {eachSkill.content.map((eachContent, idx) => (
                            <Skill
                                className="each-skill"
                                skill={eachContent.label}
                                id={eachContent.id}
                                key={idx}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

    const getProjects = () => (
        <div className="projects-container" key={'projects-container'}>
            {projectsData.map(eachProject => (
                <ContentContainer
                    className='each-project-container about-card-container'
                    borderColor="radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(44,44,46,1) 35%, rgba(70,74,75,1) 100%)"
                    borderWidth={2}
                    key={eachProject.id}
                    styles={{
                        padding: '1rem 0.5rem',
                        margin: '1rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem'
                    }}
                >
                    <Project projectData={eachProject} />
                </ContentContainer>
            ))}
        </div>
    )

    return (
        <div className="skills-projects-container">
            <div className="skills">
                <div className="title-container skills-title-container">
                    <span
                        className="skills-title"
                        style={{
                            fontSize: '2rem',
                            fontWeight: 500,
                            color: '#e7c6ff',
                        }}
                    >Skills</span>
                </div>
                <div
                    className="skills-content-container"
                >
                    {getSkills()}
                </div>
            </div>
            <div className="projects">
                <div className="title-container projects-title-container">
                    <span
                        className="projects-title"
                        style={{
                            fontSize: '2rem',
                            fontWeight: 500,
                            color: '#e7c6ff',
                        }}
                    >Projects</span>
                </div>
                <div
                    className="projects-content-container"
                >
                    {getProjects()}
                </div>
            </div>
        </div>
    )
}