import React, { useEffect } from 'react';
import Head from 'next/head'
import Header from '../components/header';
import DailyCases from '../components/dailyCases';
import CasesBySpecimenDate from '../components/casesBySpecimenDate';
import AreaSelector from '../components/areaSelector';
import CasesByAgeDemographics from '../components/CasesByAgeDemographics';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: true,
      areas: []
    }
  }

  localStorageUpdated(areaNames) {
    this.setState({
      areas: [...areaNames]
    })
    this.setState({ state: this.state})
  }

  areaKey() {
    return JSON.stringify(this.state.areas);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Cases | COVID-19 Graphs</title>
        </Head>

        <Header />

        <main className="container mx-auto text-primary">
          <AreaSelector onAreaChange={this.localStorageUpdated.bind(this)} />

          <DailyCases key={`dailyCases_${this.areaKey()}`} />

          <div className="separator box-content" style={{ height: '400px' }}>
              { this.state.loaded &&
                  <CasesByAgeDemographics />
              }
          </div>

          <CasesBySpecimenDate key={`casesBySpecimenDate_${this.areaKey()}`} />
        </main>
      </div>
    )
  }
}
