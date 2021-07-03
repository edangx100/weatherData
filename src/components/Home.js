import React from "react"; 
import { useHistory } from "react-router-dom";

function Home() {

  const history = useHistory();
  
  const redirect = () =>{ 
    history.push("/weathers");
  }

  return (
    <>
      <h1>Home Page</h1>

      <h3>Choose weather station</h3>
      <img src="https://raw.githubusercontent.com/edangx100/APITest/main/public/sg_map.png" />

      <h3>Choose year and month for historic weather data extract from data.gov.sg</h3>

      <label for="year">Choose year:</label>
      <select id="year" name="year">
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
      </select>
      <br/>

      <label for="month">Choose month:</label>
      <select id="month" name="month">
        <option value="01">Jan</option>
        <option value="02">Feb</option>
        <option value="03">Mar</option>
        <option value="04">Apr</option>
        <option value="05">May</option>
        <option value="06">Jun</option>
        <option value="07">Jul</option>
        <option value="08">Aug</option>
        <option value="09">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>

      <br/>
      <div>
        <button onClick={redirect}>Extract Data</button>
      </div>
    </>
  );
}

export default Home