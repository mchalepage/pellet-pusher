import React from 'react';
// import './App.css';
import routes from './routes'
import {connect} from 'react-redux'

function App(props) {
    return (
      <div className='App' style={{backgroundColor: '#e4ebf5', width: '100vw'}}>
        {routes}
      </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
// export default App