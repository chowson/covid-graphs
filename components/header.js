import React from 'react';
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import LinkElement from './linkElement';

function Header() {
    const fontUrl = "https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap";

    const router = useRouter()
    let isActive = false;

    const isActiveRoute = (href) => {
        console.log(router.pathname === href);
        return (router.pathname === href);
    };

    return (
        <header className="bg-cyan-800 shadow-xl sticky top-0 z-50">
            <Head>     
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://api.coronavirus.data.gov.uk" />

                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link rel="preload" as="style" href={fontUrl} />
                <link rel="stylesheet" href={fontUrl} media="print" onLoad="this.media='all'" />
                
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content="#155E75" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="theme-color" content="#155E75" />
            </Head>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center text-white font-bold">
                    <div className="py-2 px-4 w-full">
                        <Link href="/">
                            <a className="flex items-center justify-center md:justify-start hover:no-underline">
                                <img src="./images/icon.png" alt="Covid-19" width="50" height="50" />
                                <span className="pl-6 text-white font-bold">COVID-19 Graphs</span>
                            </a>
                        </Link>
                    </div>
                    <nav className="w-full md:w-auto">
                        <ul className="flex w-full text-center">
                            <li className="mr-2 pr-4 md:pr-12 py-2 w-1/2">
                                <LinkElement activeClassName="underline" href="/">
                                    <a>Cases</a>
                                </LinkElement>
                            </li>
                            <li className="py-2 flex-shrink-0 w-1/2">
                                <LinkElement activeClassName="underline" href="/vaccine">
                                    <a>Vaccine</a>
                                </LinkElement>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;