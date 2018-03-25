import React from "react"
import { Route } from "react-router-dom"

import Header from '../components/Header'
import Checkout from "../pages/Checkout"
import RulesManagement from '../pages/RulesManagement'

const ReactRouter = () => {

    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={Checkout} />
            <Route  path="/rules" component={RulesManagement} />
        </React.Fragment>
    )

}

export default ReactRouter
