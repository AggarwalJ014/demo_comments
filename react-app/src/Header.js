const Header = (props) => {
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        props.history.push('/')
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a href="#" style={{ fontSize: '40px' }} className="navbar-brand">{props.title}</a>
                    <button className="btn btn-outline-success" onClick={handleLogout} type="button">Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Header
