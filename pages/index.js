import React, { useEffect } from 'react';
import Head from 'next/head'
import Header from '../components/header';
import DailyCases from '../components/dailyCases';
import CasesBySpecimenDate from '../components/casesBySpecimenDate';
import AreaSelector from '../components/areaSelector';

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
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://api.coronavirus.data.gov.uk" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap" rel="stylesheet"></link>
        </Head>

        <Header />

        <main className="container mx-auto text-primary">
          <AreaSelector onAreaChange={this.localStorageUpdated.bind(this)} />

          <DailyCases key={`dailyCases_${this.areaKey()}`} />

          <CasesBySpecimenDate key={`casesBySpecimenDate_${this.areaKey()}`} />
        </main>
      </div>
    )
  }
}
