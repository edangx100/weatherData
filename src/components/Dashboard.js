import React, { useState, useContext } from "react";
import { Container } from 'react-bootstrap';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DataContext } from './Main'
import ExtractDownload from "./ExtractDownload"


const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const DAYS28 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
const DAYS29 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"]
const DAYS30 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30" ]
const DAYS31 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31" ]
// const HOURS = ["00","01","02"];
const HOURS = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];


const monthsMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
}

const stationMap = {
    "S44": "S44 (Nanyang Avenue)",
    "S104": "S104 (Woodlands Avenue 9)",
    "S24": "S24 (Upper Changi Road North)",
    "S108": "S108 (Marina Gardens Drive)",
}

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
    const [disableExtract_Temperature, setDisableExtractButton_Temperature] = useState(false);
    const [disableDownload_Temperature, setDownloadButton_Temperature] = useState(true);
    const [extractStatus_Temperature, setExtractStatus_Temperature] = useState(false);
    const [missDisplay_Temperature, setMissDisplay_Temperature] = useState(false);
    const [missList_Temperature, setMissList_Temperature] = useState([]);

    const [windspeedList, setWindspeedList] = useState([]);
    const [missCount_Windspeed, setMissCount_Windspeed] = useState(0);
    const [disableExtract_Windspeed, setDisableExtractButton_Windspeed] = useState(false);
    const [disableDownload_Windspeed, setDownloadButton_Windspeed] = useState(true);
    const [extractStatus_Windspeed, setExtractStatus_Windspeed] = useState(false);
    const [missDisplay_Windspeed, setMissDisplay_Windspeed] = useState(false);
    const [missList_Windspeed, setMissList_Windspeed] = useState([]);

    const [winddirectionList, setWinddirectionList] = useState([]);
    const [missCount_Winddirection, setMissCount_Winddirection] = useState(0);
    const [disableExtract_Winddirection, setDisableExtractButton_Winddirection] = useState(false);
    const [disableDownload_Winddirection, setDownloadButton_Winddirection] = useState(true);
    const [extractStatus_Winddirection, setExtractStatus_Winddirection] = useState(false);
    const [missDisplay_Winddirection, setMissDisplay_Winddirection] = useState(false);
    const [missList_Winddirection, setMissList_Winddirection] = useState([]);

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



    function extractTemperature () {

        //========= TEMPERATURE ==========//
        const fetchList_Temperature = [];
        const timestampList_Temperature = [];
        setExtractStatus_Temperature(true);
        setDisableExtractButton_Temperature(true);

        setDisableExtractButton_Windspeed(true);
        setDisableExtractButton_Winddirection(true);

        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                // fetchList.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-${month}-${day}T${hour}%3A15%3A00`) );
                fetchList_Temperature.push( fetch(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=${inputYear}-${month}-${day}T${hour}%3A00%3A00`) );
                // console.log( `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${inputYear}-${month}-${day}T${hour}%3A15%3A00` )
                timestampList_Temperature.push( `${inputYear} ${monthsMap[month]}, Day(within month):${day}, Hour:${hour}` );
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

            // for ( const object of data ) {
            for ( let index=0; index<data.length; index++ ) {
                const object = data[index];
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
                const missingDataTimestamp = timestampList_Temperature[index];
                setMissList_Temperature( missList_Temperature =>[...missList_Temperature, missingDataTimestamp ] );
              }
            }
            console.log("Missing: " + missing );
            setMissCount_Temperature(missing);

            // setDisableExtractButton_Temperature(true);
            setDownloadButton_Temperature(false);
            setExtractStatus_Temperature(false)
            setMissDisplay_Temperature(true);

            setDisableExtractButton_Windspeed(false);
            setDisableExtractButton_Winddirection(false);
        })
        .catch((error) => {
            console.log(error);
        });

        // setDisableExtractButton_Temperature(true);
        // setDownloadButton_Temperature(false);
      }


      function extractWindspeed () {

        //========= WIND SPEED ==========//
        const fetchList_Windspeed = [];
        const timestampList_Windspeed = [];
        setExtractStatus_Windspeed(true);
        setDisableExtractButton_Windspeed(true);

        setDisableExtractButton_Temperature(true);
        setDisableExtractButton_Winddirection(true);
  
        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                fetchList_Windspeed.push( fetch(`https://api.data.gov.sg/v1/environment/wind-speed?date_time=${inputYear}-${month}-${day}T${hour}%3A00%3A00`) );
                timestampList_Windspeed.push( `${inputYear} ${monthsMap[month]}, Day(within month):${day}, Hour:${hour}` );
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
            // for ( const object of data ) {
            for ( let index=0; index<data.length; index++ ) {
                const object = data[index];
                let windspeedArray;
                let windspeedObj;
  
              try{
                windspeedArray = object.items[0].readings;
                windspeedObj = windspeedArray.find(element => element.station_id === stationID );
  
                // console.log( "time " + object.items[0].timestamp);
                // console.log( "wind speed " + windspeedObj.value);
                
  
                const newObj = {  
                    hour: object.items[0].timestamp,
                    value: windspeedObj.value 
                }
                setWindspeedList( windspeedList =>[...windspeedList, newObj ] );
              }
              catch {
                console.log( "Missing object");
                missing += 1;
                const missingDataTimestamp = timestampList_Windspeed[index];
                setMissList_Windspeed( missList_Windspeed =>[...missList_Windspeed, missingDataTimestamp ] );
              }
            }
            console.log("Missing: " + missing );
            setMissCount_Windspeed(missing);
  
            // setDisableExtractButton_Windspeed(true);
            setDownloadButton_Windspeed(false);
            setExtractStatus_Windspeed(false);
            setMissDisplay_Windspeed(true);

            setDisableExtractButton_Temperature(false);
            setDisableExtractButton_Winddirection(false);
        })
        .catch((error) => {
            console.log(error);
        });
  
        // setDisableExtractButton_Windspeed(true);
        // setDownloadButton_Windspeed(false);
      }


      function extractWinddirection () {

        //========= WIND DIRECTION ==========//
        const fetchList_Winddirection = [];
        const timestampList_Winddirection = [];
        setExtractStatus_Winddirection(true);
        setDisableExtractButton_Winddirection(true);

        setDisableExtractButton_Temperature(true);
        setDisableExtractButton_Windspeed(true);

        // Push by month
        for ( const month of monthSpan )
          for ( const day of daysArray )
            for ( const hour of HOURS ) {
                fetchList_Winddirection.push( fetch(`https://api.data.gov.sg/v1/environment/wind-direction?date_time=${inputYear}-${month}-${day}T${hour}%3A00%3A00`) );
                timestampList_Winddirection.push( `${inputYear} ${monthsMap[month]}, Day(within month):${day}, Hour:${hour}` );
            }

        Promise.all(fetchList_Winddirection)
        .then((responses) => {
            return Promise.all(
                responses.map((response) => {
                    return response.json();
            })
            );
        })
        .then((data) => {
            // console.log( data );

            let missing = 0;
            // for ( const object of data ) {
            for ( let index=0; index<data.length; index++ ) {
                const object = data[index];
                let winddirectionArray;
                let winddirectionObj;

              try{
                winddirectionArray = object.items[0].readings;
                winddirectionObj = winddirectionArray.find(element => element.station_id === stationID );

                // console.log( "time " + object.items[0].timestamp);
                // console.log( "wind direction " + winddirectionObj.value);
                

                const newObj = {  
                    hour: object.items[0].timestamp,
                    value: winddirectionObj.value 
                }
                setWinddirectionList( winddirectionList =>[...winddirectionList, newObj ] );
            }
            catch {
                console.log( "Missing object");
                missing += 1;
                const missingDataTimestamp = timestampList_Winddirection[index];
                setMissList_Winddirection( missList_Winddirection =>[...missList_Winddirection, missingDataTimestamp ] );
            }
        }
        console.log("Missing: " + missing );

            setMissCount_Winddirection(missing);

            // setDisableExtractButton_Winddirection(true);
            setDownloadButton_Winddirection(false);
            setExtractStatus_Winddirection(false);
            setMissDisplay_Winddirection(true);

            setDisableExtractButton_Temperature(false);
            setDisableExtractButton_Windspeed(false);
        })
        .catch((error) => {
            console.log(error);
        });

        // setDisableExtractButton_Winddirection(true);
        // setDownloadButton_Winddirection(false);

      }





  return (
    <>
    <h1> {monthsMap[inputMonthStart]} {inputYear} Weather Readings </h1>
    <h4>Weather Station ID: {stationMap[stationID]}</h4>

    <Container fluid>
        <ExtractDownload 
            extractStatus = {extractStatus_Temperature}
            missCount = {missCount_Temperature}
            callExtractDataAPI = {extractTemperature}
            disableExtractButton = {disableExtract_Temperature}
            downloadCSV_wParams = {  ()=>downloadCSV(tempList, "Temperature") }
            disableDownloadButton = {disableDownload_Temperature}
            dataList = {tempList}
            dataType={"Temperature"}
            missDisplay={missDisplay_Temperature}
            missList = {missList_Temperature}
        />
        <br></br>

        <ExtractDownload 
            extractStatus = {extractStatus_Windspeed}
            missCount = {missCount_Windspeed}
            callExtractDataAPI = {extractWindspeed}
            disableExtractButton = {disableExtract_Windspeed}
            downloadCSV_wParams = {  ()=>downloadCSV(windspeedList, "Wind_Speed") }
            disableDownloadButton = {disableDownload_Windspeed}
            dataList = {windspeedList}
            dataType={"Windspeed"}
            missDisplay={missDisplay_Windspeed}
            missList = {missList_Windspeed}
        />
        <br></br>

        <ExtractDownload
            extractStatus = {extractStatus_Winddirection}
            missCount = {missCount_Winddirection}
            callExtractDataAPI = {extractWinddirection}
            disableExtractButton = {disableExtract_Winddirection}
            downloadCSV_wParams = {  ()=>downloadCSV(winddirectionList, "Wind_Direction") }
            disableDownloadButton = {disableDownload_Winddirection}
            dataList = {winddirectionList}
            dataType={"Winddirection"}
            missDisplay={missDisplay_Winddirection}
            missList = {missList_Winddirection}
        />



        {/* <Row >
            <Col className="test">1 of 3</Col>
            <Col xs={6} className="test">2 of 3 (wider)</Col>
            <Col className="test">3 of 3</Col>
        </Row> */}


    </Container>
  </>
  );
}

export default Dashboard
