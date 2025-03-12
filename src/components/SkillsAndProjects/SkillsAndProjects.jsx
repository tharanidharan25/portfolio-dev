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
import Skill from "./shared/Skill"

export default function SkillsAndProjects() {

    const skillsData = useSelector(state => state.skillsAndProjects.skills)
    
    const baseText = 'Skills'
    const count = useMotionValue(0)
    const rounded = useTransform(count, latest => Math.round(latest))
    const displayText = useTransform(rounded, latest => baseText.slice(0, latest))

    const [skillsContent, animate] = useAnimate()

    useEffect(() => {
        animate(skillsContent.current, { opacity: 1 }, { duration: 0.5 })
        const controls = animate(count, baseText.length, {
            type: 'tween',
            duration: 0.5,
            ease: 'easeInOut'
        })
        return controls.stop
    }, [])

    const getSkills = () => (
        <div key={'skills-container'} className="skills-container">
            {skillsData.map(eachSkill => {
                return (
                    <div key={eachSkill.id} className="skill-column-container">
                        <div className="subtitle-container skill-heading-container">
                            <p className="skill-heading">
                                {eachSkill.label}
                            </p>
                            <span 
                                className="skill-heading-underline"
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: 2,
                                    background: '#fff'
                                }}
                            />
                        </div>
                        <div className="text-content-container skills-list-container">
                            {eachSkill.content.map((eachContent, idx) => (
                                <Skill 
                                    className="each-skill"
                                    skill={eachContent.label}
                                    id={eachContent.id}

                                >
                                    <div
                                        style={{
                                            padding: '1rem',
                                            background: "#fff"
                                        }}
                                    >
                                        <p key={eachContent.id} >
                                            {eachContent.label}
                                        </p>
                                    </div>
                                </Skill>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
        
    return (
        <div>
            <div className="title-container skills-title-container">
                <div>
                    <motion.span
                        style={{
                            fontSize: '2rem',
                            fontWeight: 500,
                            color: '#e7c6ff',
                        }}
                    >{displayText}</motion.span>
                    <Cursor height={'2rem'} color="#e7c6ff" />
                </div>
            </div>
            <motion.div 
                className="skills-content-container"
                ref={skillsContent}
                initial={{
                    opacity: 0.5
                }}
            >
                {getSkills()}
            </motion.div>
        </div>
    )
}