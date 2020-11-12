import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul>
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    return (
        <header>
            <h1 className="title">
                <Link to="/">
                    TV Tracker
                </Link>
            </h1>
            <nav>
                {showNavigation()}
            </nav>
        </header>
    );

}

export default Nav;