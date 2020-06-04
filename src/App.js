// class bassed component
import React from 'react';
// import the components
// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker';

import { Cards, Chart, CountryPicker } from './components';
// styles
import styles from "./App.module.css";
// call data
import { fetchData } from './api'

import coronaImage from './images/covid19.jpg'
class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const cleanData = await fetchData();
    this.setState({ data: cleanData })
    // console.log(data)
  }
  // change the country
  handleCountryChange = async (country) => {
    const fetchDataCountry = await fetchData(country);

    // console.log(fetchDataCountry)
    // console.log(country)

    this.setState({ data: fetchDataCountry, country: country })
  }
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} className={styles.card}/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}
export default App;