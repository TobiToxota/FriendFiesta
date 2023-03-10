const DropDownContentComponent = ({ title, content, icon, thisStyle, width, inline }) => {
    return (
        <div className="dropdown is-hoverable is-vcentered is-block">
            <div className="dropdown-trigger ">
                {!thisStyle && (
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
                {thisStyle === "label" && <span className="is-underlined" style={{ color: "purple" }}>{title}</span>}
                {thisStyle === "avatar" && <span className="is-underlined">{title}</span>}
            </div>
            <div
                className="dropdown-menu fade-in"
                id="dropdown-menu4"
                role="menu"
                style={{ minWidth: "5rem", width: width }}>
                <div
                    className="dropdown-content dropdown-border has-text-centered is-relative"
                    style={{ backgroundColor: "#3e8ed0", zIndex: '10000' }}>
                    <div className="dropdown-item">
                        <div className="dropdown-content">{content}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropDownContentComponent;