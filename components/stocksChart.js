import React from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';

function StocksChart({ title, series, valueSuffix, xAxis, initialDaysMin, initialDaysMax }) {
    Highcharts.setOptions({
        lang: {
            decimalPoint: '.',
            thousandsSep: ','
        }
    });

    function OnChartLoad(chart) {
        let min = new Date(chart.xAxis[0].dataMin);
        if(initialDaysMin) {
            min = new Date();
            min.setDate(min.getDate() - initialDaysMin);
            if(min.getTime() < chart.xAxis[0].dataMin) {
                min = new Date(chart.xAxis[0].dataMin);
            }
        }
        
        let max = new Date(chart.xAxis[0].dataMax);
        if(initialDaysMax) {
            max = new Date();
            max.setDate(max.getDate() + initialDaysMax);
            if(max.getTime() > chart.xAxis[0].dataMax) {
                max = new Date(chart.xAxis[0].dataMax);
            }
        }

        chart.xAxis[0].setExtremes(min.getTime(), max.getTime());
    }

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

        xAxis: xAxis,

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: 600
                        },
                        subtitle: {
                            text: null
                        },
                        navigator: {
                            enabled: true
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
            callback={OnChartLoad}
        />
    );
}

export default StocksChart;