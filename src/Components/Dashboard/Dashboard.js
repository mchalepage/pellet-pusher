import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Search from '../Search/Search'
import Header from '../Header/Header'

const Dashboard = props => {

    return(
        <div className='Dashboard'>
            <Header />
            <h4>Search for an existing patient or click the + to create a new patient</h4>
            <Search />
        </div>
    )
}

export default withRouter(Dashboard)