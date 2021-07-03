import React from "react";
import { Route } from "react-router-dom"
import Home from "./Home"
import Dashboard from "./Dashboard"
import About from "./About"

function Main() {

  return (
    <main>

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/weathers" component={Dashboard} />
        {/* <Route path="/stocks/:stockSymbol" component={Stock} /> */}

    </main>
  )
}

export default Main