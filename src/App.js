import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";

function App() {
    
  const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
  

  //STATE = How to write a variable in react
  // USEREFFECT = Runs a piece of code based on given condition

  //load worldwide statics after page load
  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //The code inside here will run once
    //when the component loads and not again
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United Status, United kindom
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          const sortedData = sortData(data);
          
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  //Country Change
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    //Load all Static data 
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        //All of the data from the country response
        setCountryInfo(data);
      });
  };

  console.log("Country Info >>>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* Header */}
          <h1>COVID-19 Tracker</h1>

          {/* Title + Select input dropdown field */}
          <FormControl className="app__dropdown">
            {/* Loop through all the countries and show drop down list of the option */}
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* InfoBoxes */}
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/*npm install --save react-chartjs-2 chart.js Insall chart js*/}
          <LineGraph />
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
