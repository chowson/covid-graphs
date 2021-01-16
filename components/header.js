import React from 'react';
import Link from 'next/link'

function Header() {
    return (
        <header className="bg-cyan-800 shadow-xl sticky top-0 z-50">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center text-white font-bold">
                    <div className="py-2 px-4 flex w-full items-center justify-center md:justify-start">
                        <img src="./images/icon.png" alt="Covid-19" width="50" height="50" />
                        <span className="pl-6 text-white font-bold">COVID-19 Graphs</span>
                    </div>
                    <nav className="w-full md:w-auto">
                        <ul className="flex w-full text-center">
                            <li className="mr-2 pr-4 md:pr-12 py-2 w-1/2"><Link href="/">Cases</Link></li>
                            <li className="py-2 flex-shrink-0 w-1/2"><Link href="/vaccine">Vaccine</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;