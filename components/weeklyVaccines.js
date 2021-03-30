import React from 'react';
import { GetVaccinesData } from '../utilities/apiFetcher';
import { ToUtc } from '../utilities/time';
import StocksChart from '../components/stocksChart';
import graphColours from '../utilities/graphColours';
import _ from 'lodash';

function WeeklyVaccines() {
    const data = GetVaccinesData();

    const getSeries = (vaccineData) => {
        const series = [];

        const weeklyVaccineSeries = {
            id: 'weeklyVaccineChart',
            title: 'Weekly Vaccines by vaccination date',
            series: []
        }

        var sortedData = _.sortBy(vaccineData.data, 'date');
        
        let weeklyFirstDoseEntries = [];
        let weeklySecondDoseEntries = [];
        let weeklyFirstDoseCount = 0;
        let weeklySecondDoseCount = 0;
        sortedData.forEach(entry => {
            if(!entry.newPeopleVaccinatedFirstDoseByPublishDate && !entry.newPeopleVaccinatedSecondDoseByPublishDate) {
                if(entry.weeklyPeopleVaccinatedFirstDoseByVaccinationDate) {
                    weeklyFirstDoseEntries.push([ToUtc(new Date(entry.date)), entry.weeklyPeopleVaccinatedFirstDoseByVaccinationDate])
                }
                if(entry.weeklyPeopleVaccinatedSecondDoseByVaccinationDate) {
                    weeklySecondDoseEntries.push([ToUtc(new Date(entry.date)), entry.weeklyPeopleVaccinatedSecondDoseByVaccinationDate])
                }
            }
            else {
                if(!!entry.newPeopleVaccinatedFirstDoseByPublishDate) {
                    weeklyFirstDoseCount += entry.newPeopleVaccinatedFirstDoseByPublishDate;
                }

                if(!!entry.newPeopleVaccinatedSecondDoseByPublishDate) {
                    weeklySecondDoseCount += entry.newPeopleVaccinatedSecondDoseByPublishDate;
                }

                if(new Date(entry.date).getDay() == 0) {
                    // Sunday push entry and reset
                    weeklyFirstDoseEntries.push([ToUtc(new Date(entry.date)), weeklyFirstDoseCount]);
                    weeklySecondDoseEntries.push([ToUtc(new Date(entry.date)), weeklySecondDoseCount]);

                    weeklyFirstDoseCount = 0;
                    weeklySecondDoseCount = 0;
                }
            }
        });
        
        const lastEntry = sortedData[sortedData.length - 1];
        if(new Date(lastEntry.date).getDay() !== 0) {
            weeklyFirstDoseEntries.push([ToUtc(new Date(lastEntry.date)), weeklyFirstDoseCount]);
            weeklySecondDoseEntries.push([ToUtc(new Date(lastEntry.date)), weeklySecondDoseCount]);
        }

        weeklyVaccineSeries.series.push({
            name: "Weekly First Dose Vaccines",
            data: weeklyFirstDoseEntries,
            color: graphColours[0],
            type: 'column',
            stacking: true
        });

        weeklyVaccineSeries.series.push({
            name: "Weekly Second Dose Vaccines",
            data: weeklySecondDoseEntries,
            color: graphColours[1],
            type: 'column',
            stacking: true
        });

        // weeklyVaccineSeries.series.push({
        //     name: "Weekly First Dose Vaccines",
        //     data: vaccineData.data
        //                 .filter(day => day.weeklyPeopleVaccinatedFirstDoseByVaccinationDate !== null)
        //                 .map((day => [ToUtc(new Date(day.date)), day.weeklyPeopleVaccinatedFirstDoseByVaccinationDate])),
        //     color: graphColours[0],
        //     type: 'column',
        //     stacking: true
        // });

        // weeklyVaccineSeries.series.push({
        //     name: "Weekly Second Dose Vaccines",
        //     data: vaccineData.data
        //                 .filter(day => day.weeklyPeopleVaccinatedSecondDoseByVaccinationDate !== null)
        //                 .map((day => [ToUtc(new Date(day.date)), day.weeklyPeopleVaccinatedSecondDoseByVaccinationDate])),
        //     color: graphColours[1],
        //     type: 'column',
        //     stacking: true
        // });

        series.push(weeklyVaccineSeries);
        
        return weeklyVaccineSeries;
    };

    return (
        <div className="separator w-full h-stocks box-content">
            { data && data.data && 
                <div>
                    <StocksChart
                        title="Weekly Vaccines by vaccination date"
                        series={getSeries(data.data).series}
                        valueSuffix="doses"
                    />
                </div>
            }
        </div>
    );
}

export default WeeklyVaccines;