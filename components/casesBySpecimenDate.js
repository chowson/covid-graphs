import React, { componentDidMount } from 'react';
import { GetCases } from '../utilities/apiFetcher';
import { GetFavouriteAreas } from '../utilities/userAreas';
import graphColours from '../utilities/graphColours';
import StocksChart from '../components/stocksChart';

class CasesBySpecimenDate extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loaded: false,
            averageSeries: [],
            series: []
        };
    }

    componentDidMount() {
        const favouriteAreas = GetFavouriteAreas();
        const casesBySpecimenDateData = GetCases(favouriteAreas);

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
                    color: graphColours[seriesOptions.length]
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
                    color: graphColours[averageSeriesOptions.length]
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
        return (this.state.loaded &&
            <div>
                <StocksChart title="Cases by Specimen Date (per 100,000)" series={this.state.series} />
                <StocksChart title="Cases by Specimen Date" series={this.state.averageSeries} />
            </div>
        );
    }
}

export default CasesBySpecimenDate;