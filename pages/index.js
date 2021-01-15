import Head from 'next/head'
import Header from '../components/header';
import DailyCases from '../components/dailyCases';
import CasesBySpecimenDate from '../components/casesBySpecimenDate';
import styles from '../styles/Home.module.css'
import useLocalStorage from '../hooks/useLocalStorage';

export default function Home() {
  const [favouriteAreas, setFavouriteAreas] = useLocalStorage('favouriteAreas', []);

  return (
    <div>
      <Head>
        <title>COVID-19 Graphs</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <Header />

      <main className="container mx-auto">
        <DailyCases />

        <CasesBySpecimenDate />
      </main>
    </div>
  )
}
