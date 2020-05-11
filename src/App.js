import React from 'react';
import './App.css';
import routes from './routes'
import AuthHeader from './Components/Auth/AuthHeader'
import Header from './Components/Header/Header'
import {connect} from 'react-redux'

function App(props) {
    return (
      <div className='App'>
        {props.isLoggedIn ? <Header /> : <AuthHeader />}
        {routes}
      </div>
    )
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(App)
// export default App