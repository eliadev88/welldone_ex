import React, {Component} from 'react';
import './App.css';
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';


import HomePage from './Pages/homePage';
import store from "./Store";



class App extends Component {


    constructor(props) {
        super(props);



        store.subscribe(function (result) {
            console.log(store.getState());
            localStorage.setItem('reduxState', JSON.stringify(store.getState()));
        });

    }


    render() {
        return (
            <div className="App">

                <div className="App-header">
                    <BrowserRouter>

                        <Switch>

                            <Route
                                path='/'
                                render={(props) => <HomePage props={props}/>}
                            />


                        </Switch>
                    </BrowserRouter>
                </div>

            </div>
        );
    }
}



export default App;
