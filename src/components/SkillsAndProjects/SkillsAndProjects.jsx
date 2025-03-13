import { useSelector } from "react-redux"
import { useEffect } from "react"
import { 
    motion,
    useMotionValue,
    useTransform,
    animate,
    useAnimate
} from 'motion/react'

import Cursor from "./shared/Cursor"
import Project from "./shared/Project"
import Skill from "./shared/Skill"

export default function SkillsAndProjects() {

    const skillsData = useSelector(state => state.skillsAndProjects.skills)
    
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

    const getSkills = () => (
        <div key={'skills-container'} className="skills-container">
            {skillsData.map(eachSkill => {
                return (
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
                                />
                            ))}
                        </div>
                    </div>
                )
            })}
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
            </div>
        </div>
    )
}