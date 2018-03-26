import React from "react"
import { Route, withRouter } from "react-router-dom"

import Header from '../components/Header'
import Checkout from "../pages/Checkout"
import RulesManagement from '../pages/RulesManagement'

export const ReactRouter = () => {

    return (
        <React.Fragment>
            <Header />
            <Route exact path="/" component={Checkout} />
            <Route  path="/rules" component={RulesManagement} />
        </React.Fragment>
    )

}

export default withRouter(ReactRouter)
