import { useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { GetCasesByDemogrpahicsData, GetNationalCasesByDemogrpahicsData } from "../utilities/apiFetcher";
import graphColours from "../utilities/graphColours";
import ColumnChart from './columnChart';
import { GetDateSuffix, ToUtc } from '../utilities/time';
import _ from "lodash";
import StocksChart from "./stocksChart";
import sevenDayAverage from "../utilities/sevenDayAverage";

function CasesByAgeDemographics() {
    const [favouriteAreas] = useLocalStorage('favouriteAreas', []);
    const categories = [];
    const max = useRef();

    const data = GetCasesByDemogrpahicsData(favouriteAreas);
    const englandData = GetNationalCasesByDemogrpahicsData();

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

    const getHistoricSeries = (datad) => {
        var result = [];
        var series_00_20 = [];
        var series_20_40 = [];
        var series_40_60 = [];
        var series_60_plus = [];
        
        for(var x of datad.data.data) {
            var categories_00_20 = ['00_04', '05_9', '10_14', '15_19'];
            var categories_20_40 = ['20_24', '25_29', '30_34', '35_39'];
            var categories_40_60 = ['40_44', '45_49', '50_54', '55_59'];
            var categories_60_plus = ['60+'];

            var data_00_20 = x.newCasesBySpecimenDateAgeDemographics.filter(a => categories_00_20.includes(a.age));
            var data_20_40 = x.newCasesBySpecimenDateAgeDemographics.filter(a => categories_20_40.includes(a.age));
            var data_40_60 = x.newCasesBySpecimenDateAgeDemographics.filter(a => categories_40_60.includes(a.age));
            var data_60_plus = x.newCasesBySpecimenDateAgeDemographics.filter(a => categories_60_plus.includes(a.age));

            if(data_00_20[0]) {
                series_00_20.push([ToUtc(new Date(x.date)), data_00_20.map(a => a.cases).reduce((total, num) => total + num)]);
            }

            if(data_20_40[0]) {
                series_20_40.push([ToUtc(new Date(x.date)), data_20_40.map(a => a.cases).reduce((total, num) => total + num)]);
            }

            if(data_40_60[0]) {
                series_40_60.push([ToUtc(new Date(x.date)), data_40_60.map(a => a.cases).reduce((total, num) => total + num)]);
            }

            if(data_60_plus[0]) {
                series_60_plus.push([ToUtc(new Date(x.date)), data_60_plus.map(a => a.cases).reduce((total, num) => total + num)]);
            }
        }
        
        result.push({
            name: "0-19",
            data: _.sortBy(series_00_20, [0]),
            color: graphColours[0],
            type: 'spline'
        });

        result.push({
            name: "20-39",
            data: _.sortBy(series_20_40, [0]),
            color: graphColours[1],
            type: 'spline'
        });

        result.push({
            name: "40-59",
            data: _.sortBy(series_40_60, [0]),
            color: graphColours[2],
            type: 'spline'
        });

        result.push({
            name: "60+",
            data: _.sortBy(series_60_plus, [0]),
            color: graphColours[3],
            type: 'spline'
        });

        result.push({
            name: "0-19 7 Day Average",
            data: sevenDayAverage(result[0].data),
            color: graphColours[0],
            type: 'spline',
            dashStyle: 'ShortDot'
        });

        result.push({
            name: "20-39 7 Day Average",
            data: sevenDayAverage(result[1].data),
            color: graphColours[1],
            type: 'spline',
            dashStyle: 'ShortDot'
        })

        result.push({
            name: "40-59 7 Day Average",
            data: sevenDayAverage(result[2].data),
            color: graphColours[2],
            type: 'spline',
            dashStyle: 'ShortDot'
        });

        result.push({
            name: "60+ 7 Day Average",
            data: sevenDayAverage(result[3].data),
            color: graphColours[3],
            type: 'spline',
            dashStyle: 'ShortDot'
        })

        return result;
    }

    return (
        <>
            <div style={{ height: '400px' }}>
                { (data && data.length > 0 && data[0].data) && 
                    <ColumnChart
                        title={`${getDate(data)} - Case Numbers by Age`}
                        dailySeries={getSeries(data)}
                        categories={categories}
                        max={max.current}
                        valueSuffix=" cases"
                        yAxisTitle="Cases" />
                }
            </div>
            <div>
                { (englandData && englandData.data) && 
                    <StocksChart
                        title="Daily Cases by Demographic (England)"
                        series={getHistoricSeries(englandData)}
                        valueSuffix="cases"
                        initialDaysMax={45}
                        initialDaysMin={45}
                    />
                }
            </div>
        </>
    );
}

export default CasesByAgeDemographics;