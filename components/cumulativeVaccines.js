import React from 'react';
import { GetVaccinesData } from '../utilities/apiFetcher';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';

function CumulativeVaccines() {
    const data = GetVaccinesData();

    const getSeries = (vaccineData) => {
        const series = [];

        const cumulativeVaccineSeries = {
            id: 'cumulativeVaccineChart',
            title: 'Cumulative Vaccines by publish date',
            series: []
        }
        cumulativeVaccineSeries.series.push({
            name: "Cumulative First Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedFirstDoseByPublishDate])),
            color: graphColours[0]
        });

        cumulativeVaccineSeries.series.push({
            name: "Cumulative Second Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedSecondDoseByPublishDate])),
            color: graphColours[1]
        });

        series.push(cumulativeVaccineSeries);
        
        return cumulativeVaccineSeries;
    };

    return (
        <div>
            { data && data.data && 
                <div>
                    <StocksChart
                        title="Cumulative Vaccines by publish date"
                        series={getSeries(data.data).series}
                        valueSuffix="doses"
                    />
                </div>
            }
        </div>
    );
}

export default CumulativeVaccines;