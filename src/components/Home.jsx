import { createGlobalStyle } from 'styled-components'
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const GlobalStyle = createGlobalStyle`
  body, html {
    background-image: url("https://raw.githubusercontent.com/edangx100/APITest/main/public/landscape-of-singapore-city-in-morning.jpeg");
    /* Full height */
    height: 100%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

  .text {
    position: absolute;
    float: left;
    top: 33%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: darkslategrey;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

    text-align: center;
  }
}
`


function Home() {

  const history = useHistory();

  const handleRedirect = () =>{ 
    // Redirect
    history.push("/station");
  }

  return (

    <>
        <GlobalStyle />
        <div className="text">

          <h6>Under Singapore's <a href="https://www.greenplan.gov.sg/cos/" target="_blank" rel="noreferrer">Greenplan 2030</a>, there is a whole-of-nation push for more energy efficient buildings, driving an increase in efforts by the data science community to perform energy consumption modelling of buildings in Singapore. Historic weather data from data.gov.sg is widely used as part of these efforts. </h6>
          <br></br>
          <h5> This simple web application is a MVP to help users extract and download historic weather data (at hourly intervals).</h5>

          <Button
            variant="info"
            onClick={handleRedirect} >
              Begin by choosing a Weather Station
          </Button>

        </div>
    </>
  );
}

export default Home