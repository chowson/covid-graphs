import Head from 'next/head'
import Header from '../components/header';
import VaccinesToday from '../components/vaccinesToday';
import DailyVaccines from '../components/dailyVaccines';
import CumulativeVaccines from '../components/cumulativeVaccines';
import WeeklyVaccines from '../components/weeklyVaccines';
import useLocalStorage from '../hooks/useLocalStorage';

export default function Vaccine() {
  const [favouriteAreas, setFavouriteAreas] = useLocalStorage('favouriteAreas', []);

  return (
    <div>
      <Head>
        <title>Vaccine | COVID-19 Graphs</title>
      </Head>

      <Header />

      <main className="container mx-auto">
        <VaccinesToday />

        <CumulativeVaccines />

        <WeeklyVaccines />

        <DailyVaccines />
      </main>
    </div>
  )
}
