// import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// const Stock = props => {

//   const [name, setName] = useState(null);
//   const [price, setPrice] = useState(null);
//   const { stockSymbol } = useParams();


//   // // Option using  'stock-data.js'

//   // useEffect(() => {
//   //   console.log(stockSymbol);
//   //   const stockObject = stocks.find( element => element.symbol === stockSymbol );
//   //   console.log(stockObject);
//   //   setName( stockObject.name );
//   //   setPrice( stockObject.lastPrice );
//   // }, []);


//    // Option sing API

//    const url = `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=f31fd81d9226ee612642133a254830bc`

//     useEffect(() => {
//       console.log(stockSymbol);

//       const makeApiCall = async () => {
//         const res = await fetch(url);
//         const json = await res.json();
//         const stockObject = json[0];

//         setName( stockObject.companyName );
//         setPrice( stockObject.price );
//       };
  
//       makeApiCall();

//     }, []);



//   return (
//     <div>
//       <h3>{name}</h3>
//       <h3 className="price">{price}</h3>
//     </div>
//   )
// }


// export default Stock