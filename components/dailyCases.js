import React, { useState } from 'react';
import { GetDailyCases } from '../utilities/apiFetcher';
import { GetFavouriteAreas } from '../utilities/userAreas';
import useLocalStorage from '../hooks/useLocalStorage';
import graphColours from '../utilities/graphColours';
import BarChart from '../components/barChart';
import { GetDateSuffix } from '../utilities/time';

function DailyCases() {
    const [dailyDate, setDailyDate] = useState(null);
    const [graphTitle, setGraphTitle] = useState(null);

    const [favouriteAreas, setFavouriteAreas] = useLocalStorage('favouriteAreas', []);
    const dailyCasesData = GetDailyCases(favouriteAreas);

    if(!favouriteAreas) {
        return (
            <div>No data</div>
        );
    }
    
    const getSeries = (dailyCasesData) => {
        let series = [];

        dailyCasesData.forEach(d => {
            let formattedData = [];
            for (let entry of d.data.data.data) {
                formattedData.push(entry.value);
                
                if(dailyDate === null) {
                    let date = new Date(entry.date);
                    setGraphTitle(`${date.toLocaleDateString("en-GB", { weekday: 'long' })} ${date.getDate()}${GetDateSuffix(date.getDate())} ${date.toLocaleDateString("en-GB", { month: "long" })}`);
                    setDailyDate(date.toLocaleDateString("en-GB", { day: '2-digit', month: 'short' }));
                }
            }

            series = series.concat({
                name: d.data.name,
                data: formattedData,
                color: graphColours[series.length]
            });
        });

        return series;
    }

    const hasLoaded = (dailyCasesData) => {
        return dailyCasesData.length > 0 && dailyCasesData.filter(data => data.data).length === dailyCasesData.length;
    }
    
    return (dailyCasesData && hasLoaded(dailyCasesData) &&
        <div className="separator">
            <BarChart title={`${graphTitle} - Cases`} dailySeries={getSeries(dailyCasesData)} categories={[dailyDate]} />
        </div>
    );
}

export default DailyCases;