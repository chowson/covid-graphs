import { GetVaccinesData } from '../utilities/apiFetcher';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';
import { MidnightBlue } from '../utilities/graphColours';
import last7DayAverages from '../utilities/sevenDayAverage';

function DailyVaccines() {
    const data = GetVaccinesData();

    const getSeries = (vaccineData) => {
        var series = [];

        const firstDoses = vaccineData.data
            .filter(day => day.newPeopleVaccinatedFirstDoseByPublishDate !== null)
            .map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedFirstDoseByPublishDate]));

        const secondDoses = vaccineData.data
            .filter(day => day.newPeopleVaccinatedSecondDoseByPublishDate !== null)
            .map((day => [new Date(day.date).getTime(), day.newPeopleVaccinatedSecondDoseByPublishDate]));

        var dailyVaccineSeries = {
            id: 'dailyVaccineChart',
            title: 'Daily Vaccines by publish date',
            series: []
        }

        dailyVaccineSeries.series.push({
            name: "Daily First Dose Vaccines",
            data: firstDoses,
            color: graphColours[0],
            type: 'spline'
        });

        dailyVaccineSeries.series.push({
            name: "First Dose 7 Day Average",
            data: last7DayAverages(firstDoses),
            color: graphColours[0],
            type: 'spline',
            dashStyle: 'ShortDot'
        });

        dailyVaccineSeries.series.push({
            name: "Daily Second Dose Vaccines",
            data: secondDoses,
            color: graphColours[1],
            type: 'spline'
        });

        dailyVaccineSeries.series.push({
            name: "Second Dose 7 Day Average",
            data: last7DayAverages(secondDoses),
            color: graphColours[1],
            type: 'spline',
            dashStyle: 'ShortDot'
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