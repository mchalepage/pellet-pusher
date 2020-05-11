import { Route, Switch } from 'react-router-dom'
import React from 'react'
import Landing from './Components/Landing/Landing'
import Patient from './Components/Patient/Patient'
import Auth from './Components/Auth/Auth'
import Dashboard from './Components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/login' component={Auth} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/:patient_id' component={Patient} />
    </Switch>
)
