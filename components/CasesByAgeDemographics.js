import { useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetCasesByDemogrpahicsData } from "../utilities/apiFetcher";
import graphColours from "../utilities/graphColours";
import ColumnChart from './columnChart';
import { GetDateSuffix } from '../utilities/time';
import _ from "lodash";

function CasesByAgeDemographics() {
    const [favouriteAreas] = useLocalStorage('favouriteAreas', []);
    const categories = [];
    const max = useRef();

    const data = GetCasesByDemogrpahicsData(favouriteAreas);

    const getSeries = (dailyCasesData) => {
        let series = [];
        let highestCases = 0;

        dailyCasesData.forEach((d, idx) => {
            let formattedData = [];
            

            if(d.data) {
                const sortedData = _.orderBy(d.data.data.data, 'date', 'desc');
                const latestEntry = sortedData[0];

                latestEntry.newCasesBySpecimenDateAgeDemographics.forEach(e => {
                    if(e.age !== '00_59' && e.age !== '60+') {
                        formattedData.push({ age: e.age, cases: e.cases });
                        if(e.cases > highestCases) {
                            highestCases = e.cases;
                        }
                    }
                });

                if(categories.length == 0) {
                    latestEntry.newCasesBySpecimenDateAgeDemographics.forEach(e => {
                        if(e.age !== '00_59' && e.age !== '60+') {
                            categories.push(e.age.replace('_', ' to '));
                        }
                    });
                }
            }

            series = series.concat({
                name: favouriteAreas[idx],
                data: formattedData.map(a => a.cases),
                color: graphColours[series.length]
            });
        });

        max.current = highestCases;

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
                    title={`${getDate(data)} - Case Numbers by Age`}
                    dailySeries={getSeries(data)}
                    categories={categories}
                    max={max.current}
                    valueSuffix=" cases"
                    yAxisTitle="Cases" />
            }
        </>
    );
}

export default CasesByAgeDemographics;