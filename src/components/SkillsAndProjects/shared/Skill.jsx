export default function Skill({
    skill = ''
}) {
    return (
        <div className="each-skill">
            <p>{skill}</p>
            <span 
                className="skill-underline"
            />
        </div>
    )
}