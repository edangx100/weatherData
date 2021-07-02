import React from "react";
import Header from "./Header"
import Main from "./Main"

function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App


// import "./App.css";
// import * as dfd from "danfojs/src/index";

// function App() {

//   const df = new dfd.DataFrame(
//     { pig: [20, 18, 489, 675, 1776], horse: [4, 25, 281, 600, 1900] },
//     { index: [1990, 1997, 2003, 2009, 2014] }
//   );
//   df.head().print()


//   return (
//     <div className="App">
//       <header className="App-header">
//         <a
//           className="App-link"
//           href="https://danfo.jsdata.org/getting-started"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn Danfojs 
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
