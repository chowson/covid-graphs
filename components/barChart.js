import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function BarChart({ dailySeries, dailyDate }) {
    let options = {
        chart: {
            height: 300,
            type: "bar",
            style: { fontFamily: "'Jost', helvetica" }
        },
        title: {
            text: "Today's Cases",
            style: { fontWeight: "bold" }
        },
        subtitle: {
        text: "Source: https://coronavirus.data.gov.uk"
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        xAxis: {
            categories: [dailyDate],
            title: {
                text: null
            }
        },
        legend: {
            verticalAlign: "top",
            itemStyle: {
                fontWeight: "normal"
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: "New cases"
            },
            labels: {
                overflow: "justify"
            }
        },
        tooltip: {
            valueSuffix: " cases"
        },
    
        series: dailySeries
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default BarChart;