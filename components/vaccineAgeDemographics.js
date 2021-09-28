import { useEffect, useRef, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetVaccinesByDemogrpahicsData } from "../utilities/apiFetcher";
import graphColours from "../utilities/graphColours";
import { GetDateSuffix } from "../utilities/time";
import ColumnChart from './columnChart';

function VaccineAgeDemographics() {
    const [favouriteAreas] = useLocalStorage('favouriteAreas', []);
    const categories = [];

    const data = GetVaccinesByDemogrpahicsData(favouriteAreas);

    const getSeries = (dailyCasesData) => {
        let series = [];

        dailyCasesData.forEach((d, idx) => {
            let formattedData = [];

            if(d.data) {
                const latestEntry = d.data.data.data[0];
                
                latestEntry.vaccinationsAgeDemographics.forEach(e => {
                    formattedData.push({ age: e.age, vaccinated: e.cumVaccinationCompleteCoverageByVaccinationDatePercentage });
                });

                if(categories.length == 0) {
                    latestEntry.vaccinationsAgeDemographics.forEach(e => {
                        categories.push(e.age.replace('_', ' to '));
                    });
                }
            }

            series = series.concat({
                name: favouriteAreas[idx],
                data: formattedData.map(a => a.vaccinated),
                color: graphColours[series.length]
            });
        });

        return series;
    };

    const getDate = (dailyCasesData) => {
        let dateStr = '';
        dailyCasesData.forEach(d => {
            if(d.data) {
                const latestEntry = d.data.data.data[0];
                const date = new Date(latestEntry.date);
                dateStr = `${date.toLocaleDateString("en-GB", { weekday: 'long' })} ${date.getDate()}${GetDateSuffix(date.getDate())} ${date.toLocaleDateString("en-GB", { month: "long" })}`;
            }
        });

        return dateStr;
    };

    return (
        <>
            
            { (data && data.length > 0 && data[0].data) && 
                <ColumnChart
                    title={`${getDate(data)} - Full Vaccination Rates by Age`}
                    dailySeries={getSeries(data)}
                    categories={categories}
                    yAxisTitle="Vaccination Rate" />
            }
        </>
    );
}

export default VaccineAgeDemographics;