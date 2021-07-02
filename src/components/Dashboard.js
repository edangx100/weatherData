import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import TempRow from "./TempRow"


function determineDaysInMonth ( year, month ) {
  const isLeapYear = (year % 4) || ((year % 100 === 0) &&
      (year % 400)) ? 0 : 1;
  const daysInMonth = (month === 2) ?
      (28 + isLeapYear) : 31 - (month - 1) % 7 % 2;

  return daysInMonth;
}


function Dashboard() {

    const [tempList, setTempList] = useState([]);

    const stationID = "S117";
        const days28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
        const days29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
        const days30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
        const days31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
        const hours = ["00","01","02"];
        // const hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
        
        const inputYear = 2020;
        const inputMonth = 2;
        const daysinMth = determineDaysInMonth( inputYear, inputMonth);
        let daysArray = [];

        switch (daysinMth) {
            case 28:
                daysArray = [...days28];
                break;
            case 29:
                daysArray = [...days29];
                break;
            case 30:
                daysArray = [...days30];
                break;
            case 31:
                daysArray = [...days31];
                break;
            default:
                console.log( "Switch no match!");
          }


    useEffect(() => {

        const fetchList = [];
        for ( const hour of hours ) {
          fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-01T${hour}%3A00%3A00`) );
        }

        for ( const day of daysArray )
          for ( const hour of hours ) {
              fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-${day}T${hour}%3A00%3A00`) );
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

        // console.log( "tempList Length? " + tempList.length );

        // eslint-disable-next-line react-hooks/exhaustive-deps
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