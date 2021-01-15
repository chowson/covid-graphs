import Head from 'next/head'
import Header from '../components/header';
import VaccinesToday from '../components/vaccinesToday';
import DailyVaccines from '../components/dailyVaccines';
import CumulativeVaccines from '../components/cumulativeVaccines';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Vaccine() {
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
        <VaccinesToday />

        <DailyVaccines />

        <CumulativeVaccines />
      </main>
    </div>
  )
}
