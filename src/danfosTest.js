// // import "./App.css";
// // import * as dfd from "danfojs/src/index";
// import * as dfd from "danfojs";

// console.log('Ok')

// // const dfd = require("danfojs-node")
// // s = new Series([1, 3, 5, undefined, 6, 8])
// // s.print()


// async function method2() {
//     const promises = [];
//     const startTime = new Date();
//     console.log('start:', startTime);
  
//     for (const item in data) {
//       const promise = new Promise(resolve => {
//         if (item % 3 === 0) {
//           resolve({});
//         } else {
//           resolve(item)
//         }
//       });
  
//       promises.push(promise);
//     }
  
//     await Promise.all(promises);
//     const endTime = new Date();
//     console.log('finish:', endTime);
//     console.log('total time:', endTime-startTime);
//   }


const hours = ["00","01","02"];

const fetchList = [];

for ( const hour of hours ) {
fetchList.push(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-01T${hour}%3A00%3A00`);
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
    console.log( typeof data );
    console.log( "yay");
})
.catch((error) => {
    console.log(error);
});





        // const makeApiCall = async (url_param, hour_param) => {
        //   const res = await fetch(url_param);
        //   const json = await res.json();
        //   const temprArray = json.items[0].readings;
        //   const temprObj = temprArray.find(element => element.station_id === stationID );

        //   setTempList( [...tempList, <TempRow hour={hour_param} temperature={temprObj.value} />] ); 

        //   console.log(hour_param);
        //   console.log(temprObj.value);
        // };

        // for ( const hour of hours ) {

        //     // const url = `https://api.data.gov.sg/v1/environment/air-temperature?date=2020-01-${days}`;
        //     const url = `https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-01T${hour}%3A00%3A00`
        
        //     makeApiCall(url, hour);

        //   }





// // const hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
// const hours = ["00","01","02"];

// function Dashboard() {
//     const [tempList, setTempList] = useState([]);

//     useEffect(() => {

//         const stationID = "S117";
//         const hours = ["00","01","02"];
//         const fetchList = [];

//         for ( const hour of hours ) {
//         fetchList.push(`https://api.data.gov.sg/v1/environment/air-temperature?date_time=2020-01-01T${hour}%3A00%3A00`);
//         }

//         Promise.all(fetchList)
//         .then((responses) => {
//             return Promise.all(
//               responses.map((response) => {
//                   return response.json();
//             })
//             );
//         })
//         .then((data) => {
//             const temprArray = data.items[0].readings;
//             const temprObj = temprArray.find(element => element.station_id === stationID );

//             setTempList( [...tempList, {hour: {hour},  temperature:{temprObj.value} } ); 

//             // console.log( typeof data );
//             // console.log( "yay");
//         })
//         .catch((error) => {
//             console.log(error);
//         });


//         console.log( "tempList Length " + tempList.length );