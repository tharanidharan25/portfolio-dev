export default function ReusableMenuBtn({
    onClick,
    children,
    ...props
}) {
    return (
        <div className="menu-btn-container">
            <button 
                className="menu-btn"
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        </div>
    )
}