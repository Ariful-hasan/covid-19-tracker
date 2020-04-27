import React from 'react';
import logo from './logo.svg';
import './App.css';

// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import { Cards, Chart, CountryPicker } from './components'; // for this add index.js file in componet folder and export all the components.
import styles from './App.module.css';
import {fetchData} from './api';
import dashboardImage from './images/image.png'

class App extends React.Component {

  state = {
    data : {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    //console.log(fetchedData);
    
    this.setState({
      data: fetchedData
    });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({data: fetchedData, country: country});
    //console.log(fetchedData);  
  }

  render(){
    const {data, country} = this.state

    return (
      <div className={styles.container}>
        <img className={styles.image} src={dashboardImage} alt="Covid-19" />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
