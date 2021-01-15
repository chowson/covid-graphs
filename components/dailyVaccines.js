import { GetVaccinesData } from '../utilities/apiFetcher';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';

function DailyVaccines() {
    const data = GetVaccinesData();

    const getSeries = (vaccineData) => {
        var series = [];

        var dailyVaccineSeries = {
            id: 'dailyVaccineChart',
            title: 'Daily Vaccines by publish date',
            series: []
        }
        dailyVaccineSeries.series.push({
            name: "Daily First Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedFirstDoseByPublishDate])),
            color: graphColours[0]
        });

        dailyVaccineSeries.series.push({
            name: "Daily Second Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedSecondDoseByPublishDate])),
            color: graphColours[1]
        });

        series.push(dailyVaccineSeries);

        return dailyVaccineSeries;
    }
    
    return (
        <div>
            { data && data.data && 
                <div>
                    <StocksChart
                        title="Daily Vaccines by publish date"
                        series={getSeries(data.data).series}
                    />
                </div>
            }
        </div>
    );
}

export default DailyVaccines;