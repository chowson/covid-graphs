import React, { useState } from 'react';
import { GetDailyCases } from '../utilities/apiFetcher';
import { GetFavouriteAreas } from '../utilities/userAreas';
import useLocalStorage from '../hooks/useLocalStorage';
import graphColours from '../utilities/graphColours';
import BarChart from '../components/barChart';
import { GetDateSuffix } from '../utilities/time';

function DailyCases() {
    const [dailyDate, setDailyDate] = useState(null);

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
                    setDailyDate(`${date.toLocaleDateString("en-GB", { weekday: 'long' })} ${date.getDate()}${GetDateSuffix(date.getDate())} ${date.toLocaleDateString("en-GB", { month: "long" })}`);
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

    console.log(dailyDate)
    
    return (dailyCasesData && hasLoaded(dailyCasesData) &&
        <div className="separator">
            <BarChart title={`${dailyDate} - Cases`} dailySeries={getSeries(dailyCasesData)} dailyDate={dailyDate} />
        </div>
    );
}

export default DailyCases;