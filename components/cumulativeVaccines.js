import React from 'react';
import { GetVaccinesData } from '../utilities/apiFetcher';
import VaccineTargets from '../data/vaccineTargets.json';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';
import predictDoses from '../utilities/targets/predictTarget';
import _ from 'lodash';
import { ToUtc, AddDays } from '../utilities/time';

function CumulativeVaccines() {
    const data = GetVaccinesData();
    
    const xAxis = {
        plotLines: [],
    };

    const getSeries = (vaccineData) => {
        const series = [];

        const cumulativeVaccineSeries = {
            id: 'cumulativeVaccineChart',
            title: 'Cumulative Vaccines by publish date',
            series: []
        }

        const cumulativeFirstDoses = vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedFirstDoseByPublishDate]));
        cumulativeVaccineSeries.series.push({
            name: "Cumulative First Dose Vaccines",
            data: cumulativeFirstDoses,
            color: graphColours[0],
            type: 'spline',
        });

        cumulativeVaccineSeries.series.push({
            name: "Cumulative Second Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedSecondDoseByPublishDate])),
            color: graphColours[1],
            type: 'spline'
        });

        cumulativeVaccineSeries.series.push({
            name: "Cumulative Third Dose Vaccines",
            data: vaccineData.data.map((day => [new Date(day.date).getTime(), day.cumPeopleVaccinatedThirdDoseByPublishDate])),
            color: graphColours[2],
            type: 'spline'
        });

        vaccineData.data = _.sortBy(vaccineData.data, ['date']);
        let targetStartDate = new Date(vaccineData.data.filter(day => day.cumPeopleVaccinatedFirstDoseByPublishDate !== null)[0].date);
        let targetStartDoses = 0;
        let predictFromDate = _.last(vaccineData.data).date;
        
        let predictedTargetData = [];

        let targetData = [];
        for(let target of VaccineTargets) {
            const startDate = targetStartDate;
            const startDoses = targetStartDoses;

            targetData.push([ToUtc(startDate), startDoses]);
            
            const targetDays = (new Date(target.date).getTime() - startDate) / (1000 * 3600 * 24);
            const rateRequired = target.firstDoses / targetDays;
                        
            const date = startDate;
            date.setDate(date.getDate() + 1);
            
            while(date <= new Date(target.date)) {
                startDoses += rateRequired;
                targetData.push([ToUtc(date), Math.ceil(startDoses)]);
                date.setDate(date.getDate() + 1);
            }
            
            predictedTargetData.push(...predictDoses(vaccineData, predictFromDate, targetStartDoses, target.firstDoses));

            xAxis.plotLines.push({
                value: ToUtc(new Date(target.date)),
                color: graphColours[2],
                dashStyle: 'ShortDot',
                width: 1,
                label: {
                    rotation: 0,
                    align: xAxis.plotLines.length == 0 ? 'center' : 'right',
                    text: target.name,
                    style: {
                        width: '100px'
                    },
                    y: 15,
                    x: -5
                }
            })

            targetStartDate.setDate(date.getDate() - 1);
            targetStartDoses += target.firstDoses;
        }

        cumulativeVaccineSeries.series.push({
            name: `Target`,
            data: targetData,
            color: graphColours[2],
            dashStyle: "ShortDot"
        });

        cumulativeVaccineSeries.series.push({
            name: `Predicted first doses at last 7 day rate`,
            data: predictedTargetData,
            color: graphColours[0],
            dashStyle: "ShortDot"
        });

        cumulativeVaccineSeries.series.push({
            name: `Required second dose rollout`,
            data: cumulativeFirstDoses.map(entry => {
                let firstDoseDatePlus3Months = ToUtc(AddDays(entry[0], 90));
                return [firstDoseDatePlus3Months, entry[1]];
            }),
            color: '#f4a4a4',
            dashStyle: "ShortDot"
        });
        
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
                        xAxis={xAxis}
                        initialDaysMin={30}
                        initialDaysMax={45}
                    />
                </div>
            }
        </div>
    );
}

export default CumulativeVaccines;