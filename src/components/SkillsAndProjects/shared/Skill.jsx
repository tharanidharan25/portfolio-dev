import PropTypes from "prop-types"
import React from "react"

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

Skill.propTypes = {
    skill: PropTypes.string
}