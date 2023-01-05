const DropDownContentComponent = ({ title, content, icon, style, width, inline }) => {
    return (
        <div className="dropdown is-hoverable is-vcentered">
            <div className="dropdown-trigger ">
                {!style && (
                    <button
                        className="button is-rounded is-info is-size-7-touch"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu4">
                        <span className="icon is-small">
                            <i className={icon} aria-hidden="true" />
                        </span>
                        {title && (
                            <span>{title}</span>
                        )}
                    </button>
                )}
                {style === "label" && <span className="is-underlined" style={{ color: "purple" }}>{title}</span>}
                {style === "avatar" && <span className="is-underlined">{title}</span>}
            </div>
            <div
                className="dropdown-menu fade-in"
                id="dropdown-menu4"
                role="menu"
                style={{ minWidth: "5rem", width: width }}>
                <div
                    className="dropdown-content dropdown-border has-text-centered"
                    style={{ backgroundColor: "#3e8ed0" }}>
                    <div className="dropdown-item">
                        <div className="dropdown-content">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDownContentComponent;