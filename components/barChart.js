import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function BarChart({ dailySeries, dailyDate }) {
    useEffect(() => {
        Highcharts.setOptions({
            lang: {
                decimalPoint: '.',
                thousandsSep: ','
            }
        });
    });

    let height = 300 + ((dailySeries.length - 4) * 30);

    let options = {
        chart: {
            height: height,
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
        <div style={ { "height": `${height}px` } }>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
}

export default BarChart;