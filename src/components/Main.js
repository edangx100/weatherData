import React, {useState, createContext} from "react";
import { Route } from "react-router-dom"
import Station from "./Station"
import Dashboard from "./Dashboard"
import Home from "./Home"

export const DataContext = createContext()

function Main(props) {

  const [station, setStation] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  const prop_object = {
    station: station,
    setStation: setStation,
    year: year,
    setYear: setYear,
    month: month,
    setMonth: setMonth
  }


  return (
    <main>

      <DataContext.Provider value={prop_object} >

        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/">
          <Home />
        </Route>


        <Route path="/station" component={Station} />


        {/* <Route exact path="/weathers" component={Dashboard} /> */}
        <Route path="/weathers">
          <Dashboard />
        </Route>

      </DataContext.Provider>

    </main>
  )
}

export default Main