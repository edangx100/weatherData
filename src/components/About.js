import React from "react";
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body, html {
    background-image: url("https://raw.githubusercontent.com/edangx100/APITest/main/public/landscape-of-singapore-city-in-morning.jpeg");
    /* Full height */
    height: 100%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`

function About() {

  return (

    <>
        {/* <GlobalStyle /> */}
        <h1>About Page</h1>
        <p>Under Singapore's Greenplan 2030, there is a nation-wide push for more energy efficient buildings. This triggers an increase in efforts by data science community to perform energy consumption modelling of buildings in Singapore. Historic weather data available from data.gov.sg is widely used as part of modelling efforts.</p>
        <p>The purpose of this simple web application to provide a tool for the extract and download of historic weather data (at hourly intervals)</p>
    </>

  );
}

export default About