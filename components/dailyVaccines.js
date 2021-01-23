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
            data: vaccineData.data
                        .filter(day => day.newPeopleVaccinatedFirstDoseByPublishDate !== null)
                        .map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedFirstDoseByPublishDate])),
            color: graphColours[0],
            type: 'spline'
        });

        dailyVaccineSeries.series.push({
            name: "Daily Second Dose Vaccines",
            data: vaccineData.data
                        .filter(day => day.newPeopleVaccinatedSecondDoseByPublishDate !== null)
                        .map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedSecondDoseByPublishDate])),
            color: graphColours[1],
            type: 'spline'
        });

        series.push(dailyVaccineSeries);

        return dailyVaccineSeries;
    }
    
    return (
        <div className="w-full h-stocks">
            { data && data.data && 
                <div className="h-stocks">
                    <StocksChart
                        title="Daily Vaccines by publish date"
                        series={getSeries(data.data).series}
                        valueSuffix="doses"
                    />
                </div>
            }
        </div>
    );
}

export default DailyVaccines;