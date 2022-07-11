import React from 'react'

function Navbar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <a href="/">
                            Parqueadero
                        </a>
                    </li>
                    <li>
                        <a href="/comprar">Comprar pase</a>
                    </li>
                    <li>
                        <a href="/usuarios">Usuario</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar