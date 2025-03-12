import { motion } from 'motion/react'

export default function ContentContainer({
    key,
    className,
    styles = {},
    borderColor = 'rgb(97, 62, 163)',
    borderWidth = 2,
    children,
    onClick = () => {},
    ...props
}) {
    return (
        <motion.div
            className={`content-container ${className}`}
            key={key}
            style={{
                position: 'relative',
                ...styles
            }}
            onClick={onClick}
            {...props}
        >
            {children}
            <span 
                className="top" 
                style={{
                    position: 'absolute',
                    background: borderColor,
                    left: 0,
                    top: 0,
                    height: borderWidth,
                    width: 0,
                    transition: 'all 0.1s ease-in-out'
                }}
            />
            <span 
                className="right" 
                style={{
                    position: 'absolute',
                    background: borderColor,
                    right: 0,
                    top: 0,
                    width: borderWidth,
                    height: 0,
                    transition: 'all 0.1s ease-in-out 0.1s'
                }}
            />
            <span 
                className="bottom"
                style={{
                    position: 'absolute',
                    background: borderColor,
                    right: 0,
                    bottom: 0,
                    height: borderWidth,
                    width: 0,
                    transition: 'all 0.1s ease-in-out 0.2s'
                }}
            />
            <span 
                className="left"
                style={{
                    position: 'absolute',
                    background: borderColor,
                    left: 0,
                    bottom: 0,
                    width: borderWidth,
                    height: 0,
                    transition: 'all 0.1s ease-in-out 0.3s'
                }}
            />
        </motion.div>
    )
}