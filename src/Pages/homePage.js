import React, {Component} from 'react';
import {connect} from 'react-redux';

import balls from '../Assets/images/balls.gif';
import {addLocation} from '../Actions/locationActions';
import store from '../Store'
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import LocationPage from "./locationPage";
import CategoryPage from "./categoryPage";


class HomePage extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        this.navigateLocation = this.navigateLocation.bind(this);
        this.navigateCategory = this.navigateCategory.bind(this);
    }


    navigateLocation() {
        this.props.history.push("/location");
    }
    navigateCategory() {
        this.props.history.push("/category");
    }

    render() {


        return <div>

            <Switch>


                <Route
                    path='/location'
                    render={(props) => <LocationPage props={props}/>}
                />
                <Route
                    path='/category'
                    render={(props) => <CategoryPage props={props}/>}
                />

            </Switch>

            <div>
                <button className="btn" onClick={this.navigateLocation}>Location</button>
                <button className="btn" onClick={this.navigateCategory}>Category</button>
            </div>

        </div>


    }

}


export default withRouter(HomePage)
