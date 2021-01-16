import React from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

function StocksChart({ title, series, valueSuffix }) {
    let options = {
        chart: {
            height: 600,
            style: { fontFamily: "'Jost', helvetica" }
        },

        title: {
            text: title,
            style: { fontWeight: "bold" }
        },

        subtitle: {
            text: "Source: https://coronavirus.data.gov.uk"
        },

        legend: {
            verticalAlign: "top",
            enabled: true,
            itemStyle: {
                fontWeight: "normal"
            }
        },

        rangeSelector: {
            selected: 1
        },

        series: series,

        tooltip: {
            valueSuffix: ` ${valueSuffix}`
        },

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 500
                        },
                        subtitle: {
                            text: null
                        },
                        navigator: {
                            enabled: false
                        }
                    }
                }
            ]
        }
    };

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            constructorType={'stockChart'}
        />
    );
}

export default StocksChart;