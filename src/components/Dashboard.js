import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import TempRow from "./TempRow"

// const hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];


function Dashboard() {

    const [tempList, setTempList] = useState([]);

    useEffect(() => {

        const stationID = "S117";
        const hours = ["00","01","02"];
        const fetchList = [];

        for ( const hour of hours ) {
        fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-01T${hour}%3A00%3A00`) );
        }

        Promise.all(fetchList)
        .then((responses) => {
            return Promise.all(
                responses.map((response) => {
                    return response.json();
            })
            );
        })
        .then((data) => {
            console.log( data );




            for ( const object of data ) {
              const temprArray = object.items[0].readings;
              const temprObj = temprArray.find(element => element.station_id === stationID );

              console.log( "time " + object.items[0].timestamp);
              console.log( "temperature " + temprObj.value);
              
              setTempList( tempList =>[...tempList, <TempRow hour={object.items[0].timestamp} temperature={temprObj.value} />] ); 
            }
        })
        .catch((error) => {
            console.log(error);
        });

        console.log( "tempList Length " + tempList.length );
    
      }, []);




  return (
    <>
      <h1>Dashboard Page</h1>

    <table>
      <tr>
        <th>Time</th>
        <th>Temperature value</th>
      </tr>
      {tempList}
    </table>

  </>
  );
}

export default Dashboard