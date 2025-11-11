import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout = React.memo(() => {
    //console.log("AppDefaultLayout montado");
    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link to="login">Login</Link></li>
                        <li><Link to="signup">Signup</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
});

export default DefaultLayout;