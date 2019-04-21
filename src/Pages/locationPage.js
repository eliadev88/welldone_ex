import React, {Component} from 'react';
import {connect} from 'react-redux';

import balls from '../Assets/images/balls.gif';
import {addLocation,editLocation, deleteLocation} from '../Actions/locationActions';
import store from '../Store';
import Popup from "reactjs-popup";
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import {
    withRouter
} from 'react-router-dom';


class LocationPage extends React.Component {

    state = {
        addRow: false,
        nameInput: "",
        addressInput: "",
        coordinatesInput: "",
        categoryInput: "",
        editMode: false,
        removeMode: false,
        editRecord: null,
        disabledAdd: false,
        addMode: false,
        open: false,
        center: [50.879, 4.6997]
    };

    constructor(props) {
        super(props);


        this.addLocation = this.addLocation.bind(this);
        this.editLocation = this.editLocation.bind(this);
        this.viewLocation = this.viewLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.popupClosed = this.popupClosed.bind(this);
        store.subscribe(function (result) {

        });
    }


    componentWillMount() {

    }


    addLocation() {
        if (this.props.categories.length ==0) {
            alert('first add a category');
            return;
        }
        let record = {"id":"", "name" : "", "address": "", "coordinates" : "", "category" :"" };
        store.dispatch(this.props.addLocation(record));
        this.setState({disabledAdd: true});
        this.setState({nameInput: ""});
        this.setState({addressInput: ""});
        this.setState({coordinatesInput: ""});
        this.setState({categoryInput: ""});
        this.setState({ editRecord: record });
        this.setState({editMode: true});
        this.setState({addMode: true});
        this.setState({removeMode: false});
        this.setState({viewMode: false});


    }
    editLocation() {
        if (!this.state.editMode) {
            this.setState({editMode: true});
            if (this.state.addMode) {
                this.props.locations.pop();
                this.setState({addMode: false});
                this.setState({disabledAdd: false});
            }
            this.setState({removeMode: false});
            this.setState({viewMode: false});
        } else {
            this.setState({editMode: false});
        }

    }

    removeLocation() {
        if (!this.state.removeMode) {
            this.setState({removeMode: true});
            if (this.state.addMode) {
                this.props.locations.pop();
                this.setState({addMode: false});
            }
            this.setState({editMode: false});
            this.setState({viewMode: false});
        } else {
            this.setState({removeMode: false});
        }

    }

    viewLocation() {
        if (!this.state.viewMode) {
            this.setState({viewMode: true});
            if (this.state.addMode) {
                this.props.locations.pop();
                this.setState({addMode: false});
            }
            this.setState({removeMode: false});
            this.setState({editMode: false});
        } else {
            this.setState({viewMode: false});
        }

    }



    handleChange = (record, event, field) => {
        this.setState({ [field+"Input"]: event.target.value });
        //if (this.state)
    };
    handleBlur = (record, event, field) => {
        record[field] = event.target.value;
        var target = event.currentTarget;
        if (record.name !== "" && record.location !== "" && record.coordinates !== ""
        && record.category !== "") {
            store.dispatch(this.props.editLocation(this.state.editRecord));
            this.setState({disabledAdd: false});
            this.setState({ editRecord: null });
            this.setState({editMode: false});
            this.setState({addMode: false});
            this.forceUpdate();
        }


    };
    handleClick = (record, event) => {
        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;



        if (this.state.editMode) {
            if (navigator.vibrate) {
                navigator.vibrate(1000);
            }
            this.setState({ editRecord: record });
            this.setState({nameInput: record.name});
            this.setState({addressInput: record.address});
            this.setState({categoryInput: record.category});
            this.setState({coordinatesInput: record.coordinates});
            this.forceUpdate();
        }
        if (this.state.removeMode) {
            if (navigator.vibrate) {
                navigator.vibrate(1000);
            }
            store.dispatch(this.props.deleteLocation(record));
            this.forceUpdate();
        }

        if (this.state.viewMode) {
            if (navigator.vibrate) {
                navigator.vibrate(1000);
            }
            this.state.center = JSON.parse("[" + record.coordinates + "]");
            this.setState({open: true});

        }


    };

    closeModal () {
        this.setState({ open: false })
    }
    popupClosed() {
        this.setState({ open: false })
    }
    render() {
        let that = this;

        const renderField = (props, field) => {

            if ((props.record.name === "" || props.record.location === "" || props.record.coordinates === ""
                || props.record.category === "")||
                that.state.editMode && that.state.editRecord === props.record){
                if (field === "category") {
                    return (  <select defaultValue={""}  onChange={(e) => this.handleChange(props.record,e, field)}
                                      value={that.state[field+"Input"]}   onBlur={(e) => this.handleBlur(props.record,e, field)}
                                      disabled={!this.state.editMode || !(that.state.editRecord === props.record) &&
                                      props.record.category!= ""   }>
                        <option   key={""}  value="" >Category</option>
                        {
                            this.props.categories.map(function(cat) {
                                return <option  key={cat.id}  value={cat.id}>{cat.name}</option>;
                            })
                        }
                    </select> )


                } else {
                    let placeholder = "";
                    if (field == "coordinates"){
                        placeholder = "x,y"
                    }
                    return (
                        <input placeholder={placeholder}  onChange={(e) => this.handleChange(props.record,e, field)}
                                onBlur={(e) => this.handleBlur(props.record,e, field)} value={that.state[field+"Input"]} type={"text"} />
                    )
                }


            } else {
                if (field === "category") {
                    return (  <select defaultValue={""}  onChange={(e) => this.handleChange(props.record,e, field)}
                                      value={props.value}   onBlur={(e) => this.handleBlur(props.record,e, field)}
                                      disabled={!this.state.editMode || !(that.state.editRecord === props.record) &&
                                      props.record.category!= ""   }>
                        <option  key={""} value="" >Category</option>
                        {
                            this.props.categories.map(function(cat) {
                                return <option  key={cat.id}  value={cat.id}>{cat.name}</option>;
                            })
                        }
                    </select> )


                } else {
                    return (
                        <span  onClick={(e) => this.handleClick(props.record)}>
                     {props.value}
                 </span>
                    );
                }

            }


        };
        const FilterableTable = require('react-filterable-table');

        const fields = [
            {name: 'name', displayName: "Name", inputFilterable: true, sortable: true, render: (props) => renderField(props,'name')},
            {name: 'address', displayName: "address", render: (props) => renderField(props,'address')},
            {name: 'coordinates', displayName: "coordinates", render: (props) => renderField(props, 'coordinates')},
            {name: 'category', displayName: "category",sortable: true,
                render: (props) => renderField(props, 'category')}
        ];


        if (this.state.loading) {
            return <div className="">
                <img src={balls}/>
            </div>
        } else {


            return <div>

                <h1>
                    Location Page
                </h1>

                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.popupClosed}
                >
                    <div className="modal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        <Map center={this.state.center} zoom={12} width={600} height={400}>
                            <Marker anchor={this.state.center} payload={1} onClick={({ event, anchor, payload }) => {}} />

                            <Overlay anchor={this.state.center} offset={[120, 79]}>
                                <img src='pigeon.jpg' width={240} height={158} alt='' />
                            </Overlay>
                        </Map>
                    </div>
                </Popup>
                <div>
                    <div>
                        <button onClick={this.viewLocation} className={(this.state.viewMode ? 'selected' : '')}>view</button>
                        <button onClick={this.addLocation} className={(this.state.addMode ? 'selected' : '')} disabled={this.state.disabledAdd}>add</button>
                        <button onClick={this.removeLocation} className={(this.state.removeMode ? 'selected' : '')}>remove</button>
                        <button onClick={this.editLocation}  className={(this.state.editMode && !this.state.addMode ? 'selected' : '')} >edit</button>
                    </div>
                    <FilterableTable
                        namespace="Locations"
                        initialSort="name"
                        data={ this.props.locations}
                        fields={fields}
                        noRecordsMessage="There are no locations to display"
                        noFilteredRecordsMessage="No locations match your filters!"
                    />

                </div>

            </div>

        }


    }

}


const mapStateToProps = state => {
    return {
        locations: state.locations,
        categories: state.categories,
        addLocation: addLocation,
        editLocation: editLocation,
        deleteLocation: deleteLocation
    }
};

export default withRouter(connect(
    mapStateToProps,
)(LocationPage));
