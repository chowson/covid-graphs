import React from 'react';
import { GetVaccinesData } from '../utilities/apiFetcher';
import VaccineTargets from '../data/vaccineTargets.json';
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

        weeklyVaccineSeries.series.push({
            name: "Weekly First Dose Vaccines",
            data: vaccineData.data
                        .filter(day => day.weeklyPeopleVaccinatedFirstDoseByVaccinationDate !== null)
                        .map((day => [new Date(day.date).getTime(), day.weeklyPeopleVaccinatedFirstDoseByVaccinationDate])),
            color: graphColours[0],
            type: 'column'
        });

        weeklyVaccineSeries.series.push({
            name: "Weekly Second Dose Vaccines",
            data: vaccineData.data
                        .filter(day => day.weeklyPeopleVaccinatedSecondDoseByVaccinationDate !== null)
                        .map((day => [new Date(day.date).getTime(), day.weeklyPeopleVaccinatedSecondDoseByVaccinationDate])),
            color: graphColours[1],
            type: 'column'
        });

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