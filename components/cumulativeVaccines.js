import React from 'react';
import { GetVaccinesData } from '../utilities/apiFetcher';
import VaccineTargets from '../data/vaccineTargets.json';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';
import _ from 'lodash';

function CumulativeVaccines() {
    const data = GetVaccinesData();

    const predictDateToDoses = (vaccineData, target) => {
        const last7Days = vaccineData.data.slice(vaccineData.data.length - 7);
        let last7DaysDosesRate = Math.floor((last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate - last7Days[0].cumPeopleVaccinatedFirstDoseByPublishDate) / 7);

        let progressAtCurrentRate = [ [ new Date(last7Days[6].date).getTime(), last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate ] ];
        let totalDoses = last7Days[6].cumPeopleVaccinatedFirstDoseByPublishDate;
        let predictedDate = new Date(last7Days[6].date);

        while(totalDoses < target.firstDoses) {
            totalDoses += last7DaysDosesRate;
            predictedDate.setDate(predictedDate.getDate() + 1);
            progressAtCurrentRate.push([predictedDate.getTime(), totalDoses]);
        }

        return progressAtCurrentRate;
    };

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
            color: graphColours[0],
            type: 'spline',
        });

        cumulativeVaccineSeries.series.push({
            name: "Cumulative Second Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedSecondDoseByPublishDate])),
            color: graphColours[1],
            type: 'spline'
        });

        vaccineData.data = _.sortBy(vaccineData.data, ['date']);
        
        for(let target of VaccineTargets) {
            let targetData = [];
            const startDate = new Date(vaccineData.data.filter(day => day.cumPeopleVaccinatedFirstDoseByPublishDate !== null)[0].date);
            targetData.push([startDate.getTime(), 0]);
            
            const targetDays = (new Date(target.date).getTime() - startDate) / (1000 * 3600 * 24);
            const rateRequired = target.firstDoses / targetDays;
            const startDoses = 0;
            
            const date = startDate;
            date.setDate(date.getDate() + 1);
            while(date <= new Date(target.date)) {
                startDoses += rateRequired;
                targetData.push([date.getTime(), Math.ceil(startDoses)]);
                date.setDate(date.getDate() + 1);
            }
            
            cumulativeVaccineSeries.series.push({
                name: `Target: ${target.name}`,
                data: targetData,
                color: graphColours[2],
                dashStyle: "ShortDot"
            });

            cumulativeVaccineSeries.series.push({
                name: `Predicted first doses at last 7 day rate`,
                data: predictDateToDoses(vaccineData, target),
                color: graphColours[0],
                dashStyle: "ShortDot"
            });
        }

        cumulativeVaccineSeries.series.forEach((series) => {
            series.data = series.data.filter(dataEntry => dataEntry[1] !== null);
            series.data = _.sortBy(series.data, [1]);
        });

        series.push(cumulativeVaccineSeries);
        
        return cumulativeVaccineSeries;
    };

    return (
        <div className="separator w-full h-stocks box-content">
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