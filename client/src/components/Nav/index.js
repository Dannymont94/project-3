import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div>
                    <ul className="flex-row">
                        <li className="mx-1">
                            <Link to="/profile">
                                Profile
                            </Link>
                        </li>
                        <li className="mx-1">
                            <a href="/" onClick={() => Auth.logout()}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="container-tabs">
                    <ul className="flex-row nav">
                        <li className="mx-1">
                            <Link to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="mx-1">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }
    }
    return (
        <header className="flex-row px-1">
            <h1>
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