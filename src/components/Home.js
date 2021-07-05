import React, {useContext} from "react"; 
import { useHistory, Link } from "react-router-dom";
import { DataContext } from './Main'
// import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {

  const history = useHistory();
  const dataContext = useContext(DataContext)
  

  const handleRedirect = () =>{ 

    // Get Station ID, Year and Month from user input
    const eventStation = document.getElementById("stationId");
    const strStation = eventStation.value;
    dataContext.setStation( strStation );

    const eventYear = document.getElementById("year");
    const strYear = eventYear.value;
    dataContext.setYear( strYear );

    const eventMonth = document.getElementById("month");
    const strMonth = eventMonth.value;
    dataContext.setMonth( strMonth );

    // Redirect
    history.push("/weathers");
  }

  return (
    <>
      <h1>Home Page</h1>

      <h3>Weather stations location</h3>
      {/* <img src="https://raw.githubusercontent.com/edangx100/APITest/main/public/sg_map_annotated.JPG" alt="singapore map"/> */}

      <img src="https://raw.githubusercontent.com/edangx100/APITest/main/public/sg_map_annotatedv2.JPG" usemap="#image-map" />

      <map name="image-map">
          <area target="_blank" alt="Station 1" title="Station 1" href="https://goo.gl/maps/pwDogjnHGWCmSLDYA" coords="261,380,25" shape="circle" />
          <area target="_blank" alt="Station 2" title="Station 2" href="https://goo.gl/maps/15UKd2WNZQKmjRcw8" coords="563,111,23" shape="circle" />
          <area target="_blank" alt="Station 3" title="Station 3" href="https://goo.gl/maps/15UKd2WNZQKmjRcw8" coords="1045,301,26" shape="circle" />
          <area target="_blank" alt="Station 4" title="Station 4" href="https://goo.gl/maps/JiXwyrVcYD5mtoDw5" coords="731,523,20" shape="circle" />
      </map>
      

      <h3>Choose what to extract for historic weather data from data.gov.sg</h3>

      {/* <h3>Choose weather station:</h3>
      <form>
        <input type="radio" id="station_1" name="stationId" value="S44"/>
        <label for="station_1"> <a href="https://goo.gl/maps/wsH4CihhgejnZCuTA" target="_blank">Station 1</a> </label><br></br>
        <input type="radio" id="station_2" name="stationId" value="S104"/>
        <label for="station_2"> Station 2</label><br></br>
        <input type="radio" id="station_3" name="stationId" value="S24"/>
        <label for="station_3"> Station 3</label><br></br>
        <input type="radio" id="station_4" name="stationId" value="S108"/>
        <label for="station_4"> Station 4</label><br></br>
      </form> */}

      <label for="year">Choose weather station </label>
      <select id="stationId" name="year">
        <option value="S44">Station 1</option>
        <option value="S104">Station 2</option>
        <option value="S24">Station 3</option>
        <option value="S108">Station 4</option>
      </select>
      <br/>


      <label for="year">Choose year:</label>
      <select id="year" name="year">
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
        <button onClick={handleRedirect}>Extract Data</button>
      </div>
    </>
  );
}

export default Home