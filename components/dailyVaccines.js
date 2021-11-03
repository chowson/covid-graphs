import { GetVaccinesData } from '../utilities/apiFetcher';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';
import { ToUtc } from '../utilities/time';
import last7DayAverages from '../utilities/sevenDayAverage';

function DailyVaccines() {
    const data = GetVaccinesData();

    const getSeries = (vaccineData) => {
        var series = [];

        const firstDoses = vaccineData.data
            .filter(day => day.newPeopleVaccinatedFirstDoseByPublishDate !== null)
            .map((day => [ToUtc(new Date(day.date)), day.newPeopleVaccinatedFirstDoseByPublishDate]));

        const secondDoses = vaccineData.data
            .filter(day => day.newPeopleVaccinatedSecondDoseByPublishDate !== null)
            .map((day => [ToUtc(new Date(day.date)), day.newPeopleVaccinatedSecondDoseByPublishDate]));

        const thirdDoses = vaccineData.data
            .filter(day => day.newPeopleVaccinatedThirdDoseByPublishDate !== null)
            .map((day => [ToUtc(new Date(day.date)), day.newPeopleVaccinatedThirdDoseByPublishDate]));

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

        dailyVaccineSeries.series.push({
            name: "Daily Third Dose Vaccines",
            data: thirdDoses,
            color: graphColours[2],
            type: 'spline'
        });

        dailyVaccineSeries.series.push({
            name: "Third Dose 7 Day Average",
            data: last7DayAverages(thirdDoses),
            color: graphColours[2],
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