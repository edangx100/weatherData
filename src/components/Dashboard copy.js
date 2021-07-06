import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import TempRow from "./TempRow"

import { Row, Col } from 'react-bootstrap';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LineChart from "./LineChart"

import { DataContext } from './Main'


const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const DAYS28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
const DAYS29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
const DAYS30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
const DAYS31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
const HOURS = ["00","01","02"];
// const HOURS = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];


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


function downloadCSV (tempList, type) {

    const csvString_Temperature = [
        [
          "Time",
          type
        ],
        ...tempList.map(item => [
          item.hour,
          item.value
        ])
      ].map(e => e.join(",")) 
      .join("\n");


    const downloadLink = document.createElement("a");
    const blob = new Blob(["\ufeff", csvString_Temperature]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `data_${type}.csv`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// ============================================================
function Dashboard(props) {

    const [tempList, setTempList] = useState([]);
    const [missCount_Temperature, setMissCount_Temperature] = useState(0);
    const [windspeedList, setWindspeedList] = useState([]);
    const [missCount_Windspeed, setMissCount_Windspeed] = useState(0);
    const [winddirectionList, setWinddirectionList] = useState([]);
    const [missCount_Winddirection, setMissCount_Winddirection] = useState(0);

    // const [csvTemperature, setCsvTemperature] = useState();

    const dataContext = useContext(DataContext)



    const stationID = dataContext.station;  

        
    const inputYear = dataContext.year;
    const inputMonthStart = dataContext.month;
    const inputMonthEnd = dataContext.month;
    
    // let monthsArray = [];
    let daysArray = [];
    
    const monthSpan = sliceMonthSpan(inputMonthStart, inputMonthEnd);
    const daysinMth = determineDaysInMonth( inputYear, inputMonthStart);
    daysArray = selectDaysArray( daysinMth );
    
    console.log( daysinMth );
    console.log( "daysArray: " + daysArray );



    useEffect(() => {

        //========= TEMPERATURE ==========//
        const fetchList_Temperature = [];

        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                // fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-${month}-${day}T${hour}%3A15%3A00`) );
                fetchList_Temperature.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=${inputYear}-${month}-${day}T${hour}%3A05%3A00`) );
                // console.log( `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${inputYear}-${month}-${day}T${hour}%3A15%3A00` )
            }

        Promise.all(fetchList_Temperature)
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

                // console.log( "time " + object.items[0].timestamp);
                // console.log( "temperature " + temprObj.value);
                

                // setTempList( tempList =>[...tempList, <TempRow hour={object.items[0].timestamp} temperature={temprObj.value} />] ); 
                const newObj = {  
                    hour: object.items[0].timestamp,
                    value: temprObj.value 
                }
                setTempList( tempList =>[...tempList, newObj ] );
              }
              catch {
                console.log( "Missing object");
                missing += 1;
              }
            }
            console.log("Missing: " + missing );
            setMissCount_Temperature(missing);
        })
        .catch((error) => {
            console.log(error);
        });

        // console.log( "tempList Length? " + tempList.length );

        //========= WIND SPEED ==========//
        const fetchList_Windspeed = [];

        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                fetchList_Windspeed.push( fetch(`https://api.data.gov.sg/v1/environment/wind-speed?date_time=${inputYear}-${month}-${day}T${hour}%3A05%3A00`) );
            }

        Promise.all(fetchList_Windspeed)
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
              let windspeedArray;
              let windspeedObj;

              try{
                windspeedArray = object.items[0].readings;
                windspeedObj = windspeedArray.find(element => element.station_id === stationID );

                console.log( "time " + object.items[0].timestamp);
                console.log( "wind speed " + windspeedObj.value);
                

                const newObj = {  
                    hour: object.items[0].timestamp,
                    value: windspeedObj.value 
                }
                setWindspeedList( windspeedList =>[...windspeedList, newObj ] );
              }
              catch {
                console.log( "Missing object");
                missing += 1;
              }
            }
            console.log("Missing: " + missing );
            setMissCount_Windspeed(missing);
        })
        .catch((error) => {
            console.log(error);
        });
        
        //========= WIND DIRECTION ==========//
        // const fetchList_Winddirection = [];

        // // Push by month
        // for ( const month of monthSpan )
        //   for ( const day of daysArray )
        //     for ( const hour of HOURS ) {
        //         fetchList_Winddirection.push( fetch(`https://api.data.gov.sg/v1/environment/wind-direction?date_time=${inputYear}-${month}-${day}T${hour}%3A05%3A00`) );
        //     }

        // Promise.all(fetchList_Winddirection)
        // .then((responses) => {
        //     return Promise.all(
        //         responses.map((response) => {
        //             return response.json();
        //     })
        //     );
        // })
        // .then((data) => {
        //     console.log( data );

        //     let missing = 0;
        //     for ( const object of data ) {
        //       let winddirectionArray;
        //       let winddirectionObj;

        //       try{
        //         winddirectionArray = object.items[0].readings;
        //         winddirectionObj = winddirectionArray.find(element => element.station_id === stationID );

        //         console.log( "time " + object.items[0].timestamp);
        //         console.log( "wind speed " + winddirectionObj.value);
                

        //         const newObj = {  
        //             hour: object.items[0].timestamp,
        //             value: winddirectionObj.value 
        //         }
        //         setWinddirectionList( winddirectionList =>[...winddirectionList, newObj ] );
        //       }
        //       catch {
        //         console.log( "Missing object");
        //         missing += 1;
        //       }
        //     }
        //     console.log("Missing: " + missing );
        //     setMissCount_Winddirection(missing);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });


        // =================================//



        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);




  return (
    <>
    {/* <h1>Historic Temperature Readings</h1>
    
    <table>
      <tr>
        <th>Time</th>
        <th>Temperature value</th>
      </tr>
      {tempList}
    </table> */}


    <Row className="app-container">
        <Col md={6} id='todo_container'>

            <h1>Historic Weather Readings</h1>

            <h4>Weather Station ID: {stationID}</h4>
            <h4>Number of Missing records for Temperature): {missCount_Temperature}</h4>
            <h4>Number of Missing records for Wind Speed): {missCount_Windspeed}</h4>
            <h4>Number of Missing records for Wind Direction): {missCount_Winddirection}</h4>

            <button onClick={ ()=>downloadCSV(tempList, "Temperature") }>Download Temperature</button>
            <br></br>
            <button onClick={ ()=>downloadCSV(windspeedList, "Wind_Speed") }>Download Wind Speed</button>
            <br></br>
            <button onClick={ ()=>downloadCSV(winddirectionList, "Wind_Direction") }>Download Wind Direction</button>

        </Col>

        <Col>
            <div className='chart'>
                {/* Temperature  */}
                <LineChart dataList={tempList} type={"temperature"} />
            </div>

            <br></br>

            <div className='chart'>
                {/* Wind Speed */}
                <LineChart dataList={windspeedList} type={"windspeed"} />
            </div>

            <div className='chart'>
                {/* Wind Direction */}
                <LineChart dataList={winddirectionList} type={"winddirection"} />
            </div>
        </Col>
    </Row>

  </>
  );
}

export default Dashboard
