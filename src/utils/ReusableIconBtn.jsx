export default function ReusableIconBtn({
    children,
    sx,
    onClick,
    ...props
}) {
    return (
        <button
            style={{
                border: 0,
                background: 'transparent',
                cursor: 'pointer',
                ...sx
            }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}