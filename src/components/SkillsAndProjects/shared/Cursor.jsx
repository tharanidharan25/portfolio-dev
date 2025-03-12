import { motion } from 'motion/react'

const cursorVariants = {
    blinking: {
        opacity: [0, 0, 1, 1],
        transition: {
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0,
            ease: 'linear',
            times: [0, 0.5, 0.5, 1]
        }
    }
}

export default function Cursor({
    height = 8,
    color = '#fff'
}) {
    return (
        <motion.div
            variants={cursorVariants}
            animate='blinking'
            style={{
                display: 'inline-block',
                height,
                width: 1,
                translateY: 1,
                background: color
            }}
        />
    )
}