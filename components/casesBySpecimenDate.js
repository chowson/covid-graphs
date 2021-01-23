import React, { componentDidMount } from 'react';
import { GetCases } from '../utilities/apiFetcher';
import { GetFavouriteAreas } from '../utilities/userAreas';
import graphColours from '../utilities/graphColours';
import StocksChart from '../components/stocksChart';
import CasesData from '../components/casesData';

class CasesBySpecimenDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loaded: false,
            averageSeries: [],
            series: [],
            areas: []
        };
    }

    componentDidMount() {
        const favouriteAreas = GetFavouriteAreas();
        const casesBySpecimenDateData = GetCases(favouriteAreas);
        this.state.areas = favouriteAreas;

        const PerHundredThousand = (cases, population) => {
            return parseFloat((cases / (population / 100000)).toFixed(1));
        };

        const seriesOptions = [];
        const averageSeriesOptions = [];

        casesBySpecimenDateData.then((areaData) => {
            areaData.forEach(d => {
                let formattedData = [];
                for (let entry of d.data.data) {
                    formattedData.push([new Date(entry.date).getTime(), entry.newCases]);
                }
                
                seriesOptions.push({
                    name: d.area.Name,
                    data: formattedData.sort((a, b) => {
                        if (a[0] < b[0]) {
                            return -1;
                        }
                        if (a[0] > b[0]) {
                            return 1;
                        }
                        return 0;
                    }),
                    color: graphColours[seriesOptions.length],
                    type: 'spline'
                });

                const averageData = [];
                for (var j = formattedData.length - 1; j >= 0; j--) {
                    let total = 0;

                    for (var k = j; k > j - 7; k--) {
                        if (k >= 0) {
                            total += formattedData[k][1];
                        }
                    }

                    var perHundredThousand = PerHundredThousand(total, d.area.Population);
                    averageData.push([
                        new Date(formattedData[j][0]).getTime(),
                        perHundredThousand
                    ]);
                }

                averageSeriesOptions.push({
                    name: d.area.Name,
                    data: averageData.reverse(),
                    color: graphColours[averageSeriesOptions.length],
                    type: 'spline'
                });
            });

            this.setState({
                series: seriesOptions,
                averageSeries: averageSeriesOptions,
                loaded: true
            });
        });
    };

    render() {
        return (
            <div>
                <div className="separator h-stocks box-content">
                    { this.state.loaded &&
                        <StocksChart title="Cases by Specimen Date (per 100,000)" series={this.state.averageSeries} valueSuffix="cases" />
                    }
                </div>
                <div className="separator h-stocks box-content">
                    { this.state.loaded &&
                        <StocksChart title="Cases by Specimen Date" series={this.state.series} valueSuffix="cases" />
                    }
                </div>
                
                <CasesData
                    series={this.state.series}
                    averageSeries={this.state.averageSeries}
                    areas={this.state.areas}
                />
            </div>
        );
    }
}

export default CasesBySpecimenDate;