import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ColumnChart({ title, dailySeries, categories, max = 100, valueSuffix = '%', yAxisTitle }) {
    useEffect(() => {
        Highcharts.setOptions({
            lang: {
                decimalPoint: '.',
                thousandsSep: ','
            }
        });
    });

    let height = 400;

    let options = {
        chart: {
            height: height,
            type: "column",
            style: { fontFamily: "'Jost', helvetica" }
        },
        title: {
            text: title,
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
            categories: categories,
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
            max,
            title: {
                text: yAxisTitle
            },
            labels: {
                overflow: "justify"
            }
        },
        tooltip: {
            valueSuffix
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

export default ColumnChart;