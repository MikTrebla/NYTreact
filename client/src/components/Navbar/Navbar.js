import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h1 className="navbar-brand">NY Times React Scrubber</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/saved">Saved Articles <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;