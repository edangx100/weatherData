import React from "react";
import { Route, Switch } from "react-router-dom"
import Home from "./Home"
import Dashboard from "./Dashboard"
import About from "./About"
import Stock from "./Stock"

function Main() {

  return (
    <main>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* <Route exact path="/stocks" component={Dashboard} /> */}
        <Route exact path="/weathers" component={Dashboard} />
        <Route path="/stocks/:stockSymbol" component={Stock} />

    </main>
  )
}

export default Main