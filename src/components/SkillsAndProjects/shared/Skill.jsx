import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

export default function Skill({
    id,
    skill = '',
    level = '0%',
    className = '',
    children
}) {

    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const left = useTransform(mouseXSpring, [0.5, -0.5], ['60%', '70%'])
    const top = useTransform(mouseYSpring, [0.5, -0.5], ['40%', '60%'])

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoudingClient()

        const width = rect.width
        const height = rect.height

        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    return (
        <motion.div
            ref={ref}
            key={id}
            onMouseMove={handleMouseMove}
            initial='initial'
            whileHover='whileHover'
            className={`each-skill-container ${className}`}
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.5s ease-in-out',
                padding: '1rem 0'
            }}
        >
            <div>
                <motion.span
                    className="skill-letters-container"
                    variants={{
                        initial: { x: 0 },
                        whileHover: { x: -2 }
                    }}
                    transition={{
                        type: 'spring',
                        staggerChildren: 0.075,
                        delayChildren: 0.25
                    }}
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        display: 'block',
                    }}
                >
                    {skill.split('').map((letter, letterIdx) => (
                        <motion.span
                            key={letterIdx}
                            className="skill-each-letter"
                            variants={{
                                initial: { x: 0 },
                                whileHover: { x: 2 }
                            }}
                            transition={{ type: 'spring' }}
                            style={{ 
                                display: 'inline-block', 
                                fontSize: '1.25rem',
                                transition: 'all 0.5s ease-in-out'
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                    <span className="skill-underline" />
                </motion.span>
            </div>
            <motion.div
                style={{
                    top,
                    left,
                    translateX: '-50%',
                    translateY: '-50%',
                    position: 'absolute',
                    zIndex: 0,
                }}
                variants={{
                    initial: { scale: 0, rotate: '-12.5deg' },
                    whileHover: { scale: 1, rotate: '4deg' }
                }}
                transition={{ type: 'spring' }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}