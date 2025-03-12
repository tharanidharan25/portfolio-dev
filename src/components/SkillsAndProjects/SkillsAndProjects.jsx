import { useSelector } from "react-redux"

export default function SkillsAndProjects() {

    const skillsData = useSelector(state => state.skillsAndProjects.skills)

    const getSkills = () => 
        <div className="skills-container">
            {skillsData.map(eachSkill => (
                <div className="skill-column-container">
                    <div className="skill-heading-container">
                        <p className="skill-heading">{eachSkill.label}</p>
                    </div>
                    <div className="skills-list-container">
                        
                    </div>
                </div>
            ))}
        </div>
        
    return (
        <div>
            <div className="title-container">
                <p
                    style={{
                        fontSize: '2rem',
                        fontWeight: 500,
                        color: '#e7c6ff',
                    }}
                >Skills</p>
                {getSkills()}
            </div>
        </div>
    )
}