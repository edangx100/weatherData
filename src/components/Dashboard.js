import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import TempRow from "./TempRow"


const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const DAYS28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
const DAYS29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
const DAYS30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
const DAYS31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
// const HOURS = ["00","01","02"];
const HOURS = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];


function determineDaysInMonth ( year, month ) {

    const isLeapYear = (year % 4) || ((year % 100 === 0) &&
        (year % 400)) ? 0 : 1;

    const daysInMonth = (month === 2) ?
        (28 + isLeapYear) : 31 - (month - 1) % 7 % 2;

    return daysInMonth;
}

function selectDaysArray ( daysinMth_param ) {
    let daysArrayToUse = [];

    switch (daysinMth_param) {
        case 28:
            daysArrayToUse = [...DAYS28];
            break;
        case 29:
            daysArrayToUse = [...DAYS29];
            break;
        case 30:
            daysArrayToUse = [...DAYS30];
            break;
        case 31:
            daysArrayToUse = [...DAYS31];
            break;
        default:
            console.log( "Switch no match!");
      }

      return daysArrayToUse;
}

function sliceMonthSpan ( monthStart, monthEnd ) {
    return MONTHS.slice( monthStart-1, monthEnd );
}

// ============================================================
function Dashboard() {

    const [tempList, setTempList] = useState([]);

    const stationID = "S24";   // Changi
        
    const inputYear = 2020;
    const inputMonthStart = 3;
    const inputMonthEnd = 3;
    
    // let monthsArray = [];
    let daysArray = [];
    
    const monthSpan = sliceMonthSpan(inputMonthStart, inputMonthEnd);
    const daysinMth = determineDaysInMonth( inputYear, inputMonthStart);
    daysArray = selectDaysArray( daysinMth );
    
    console.log( daysinMth );
    console.log( "daysArray: " + daysArray );



    useEffect(() => {

        const fetchList = [];

        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-${month}-${day}T${hour}%3A00%3A00`) );
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

            let missing = 0;
            for ( const object of data ) {
              let temprArray;
              let temprObj;

              try{
                temprArray = object.items[0].readings;
                temprObj = temprArray.find(element => element.station_id === stationID );

                console.log( "time " + object.items[0].timestamp);
                console.log( "temperature " + temprObj.value);

                setTempList( tempList =>[...tempList, <TempRow hour={object.items[0].timestamp} temperature={temprObj.value} />] ); 
              }
              catch {
                console.log( "Missing object");
                missing += 1;
              }
            }
            console.log("Missing: " + missing );
        })
        .catch((error) => {
            console.log(error);
        });

        console.log( "tempList Length? " + tempList.length );
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);




  return (
    <>
    <h1>Historic Temperature Readings</h1>
    
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
