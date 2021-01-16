import React, { componentDidMount } from 'react';
import { GetDailyCases } from '../utilities/apiFetcher';
import { GetFavouriteAreas } from '../utilities/userAreas';
import graphColours from '../utilities/graphColours';
import BarChart from '../components/barChart';

class DailyCases extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loaded: false,
            dailyDate: null,
            dailySeries: []
        };
    }

    componentDidMount() {
        const favouriteAreas = GetFavouriteAreas();
        const dailyCasesData = GetDailyCases(favouriteAreas);

        if(!favouriteAreas) {
            return;
        }

        dailyCasesData.then((areaData) => {
            areaData.forEach(d => {
                let formattedData = [];
                for (let entry of d.data.data) {
                    formattedData.push(entry.value);
                    this.setState({
                        dailyDate: new Date(entry.date).toLocaleDateString("en-GB", {
                            month: "short",
                            day: "2-digit"
                        })
                    });
                }

                var joined = this.state.dailySeries.concat({
                    name: d.area.Name,
                    data: formattedData,
                    color: graphColours[this.state.dailySeries.length]
                });

                this.setState({ dailySeries: joined });
            });

            this.setState({
                loaded: true
            });
        });
    };

    render() {
        return (this.state.loaded &&
            <div className="separator">
                <BarChart dailySeries={this.state.dailySeries} dailyDate={this.state.dailyDate} />
            </div>
        );
    }
}

export default DailyCases;