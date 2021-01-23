import React, { useEffect, useRef } from 'react';
import styles from './casesData.module.css';

export default function CasesData({ series, averageSeries, areas }) {
    const dataTable = useRef();

    useEffect(() => {
        if(!(series.length && averageSeries.length && areas.length))
        {
            console.log('no datas');
            return;
        }
        var table = dataTable.current;

        while (table.firstChild) {
            table.removeChild(table.lastChild);
        }

        var fragment = document.createDocumentFragment();

        var header = fragment.appendChild(document.createElement("thead"));
        var headerRow = header.insertRow(0);
        var cell = document.createElement("th");
        cell.innerHTML = "Date";
        headerRow.appendChild(cell);

        for (let area of areas) {
            cell = document.createElement("th");
            cell.innerHTML = area.Name;
            headerRow.appendChild(cell);
        }

        var tbody = fragment.appendChild(document.createElement("tbody"));
        
        for (
            let count = averageSeries[0].data.length - 1;
            count >= 0;
            count--
        ) {
            let dataRow = tbody.insertRow();
            let dateCell = dataRow.insertCell();
            let date = averageSeries[0].data[count][0];
            dateCell.innerHTML = new Date(
                averageSeries[0].data[count][0]
            ).toLocaleDateString("en-GB", { month: "short", day: "2-digit" });

            for (let area = 0; area < areas.length; area++) {
                let dataCell = dataRow.insertCell();

                let averageDataToDisplay = averageSeries[area].data.filter(
                    (entry) => entry[0] === date
                );
                let dataToDisplay = series[area].data.filter(
                    (entry) => entry[0] === date
                );
                if (dataToDisplay.length > 0 && averageDataToDisplay.length > 0) {
                    dataCell.innerHTML = `${dataToDisplay[0][1]} (${averageDataToDisplay[0][1]})`;
                }
                else {
                    dataCell.innerHTML = "No data";
                }
            }
        }

        table.appendChild(fragment);
    });

    return (
        <div className="flex flex-col items-center">
            <h3 className="font-bold">Raw data - Daily cases (per 100,000)</h3>
            <div className={styles['table-container']}>                
                <table ref={dataTable} className={styles['data-table']}></table>
            </div>
        </div>
    )
}