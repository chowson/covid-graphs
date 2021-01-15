import React from 'react';
import Link from 'next/link'

function Header() {
    return (
        <header className="bg-blue-900 shadow-lg">
            <div className="container mx-auto">
            <div className="flex justify-between items-center text-white font-bold">
                <div className="p-4 flex items-center">
                <img src="./images/icon.png" alt="Covid-19" width="80" height="80" />
                <span className="pl-6 text-white font-bold">COVID-19 Graphs</span>
                </div>
                <nav>
                <ul className="flex">
                    <li className="pr-4"><Link href="/">Cases</Link></li>
                    <li><Link href="/vaccine">Vaccine</Link></li>
                </ul>
                </nav>
            </div>
            </div>
        </header>
    );
}

export default Header;