import React, {Component} from 'react';
import {connect} from 'react-redux';

import balls from '../Assets/images/balls.gif';
import {addCategory,editCategory, deleteCategory} from '../Actions/categoryActions';
import store from '../Store'
import {
    BrowserRouter,
    Link,
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';


class CategoryPage extends React.Component {

    state = {
        addRow: false,
        nameInput: "",
        addressInput: "",
        coordinatesInput: "",
        categoryInput: "",
        editMode: false,
        removeMode: false,
        viewMode: false,
        editRecord: null,
        disabledAdd: false,
        addMode: false
    };

    constructor(props) {
        super(props);


        this.addCategory = this.addCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.viewCategory = this.viewCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        store.subscribe(function (result) {

        });
    }


    componentWillMount() {

    }


    addCategory() {

        let record = {"id":"", "name" : ""};
        store.dispatch(this.props.addCategory(record));
        this.setState({disabledAdd: true});
        this.setState({nameInput: ""});
        this.setState({addressInput: ""});
        this.setState({coordinatesInput: ""});
        this.setState({categoryInput: ""});
        this.setState({ editRecord: record });
        this.setState({editMode: true});
        this.setState({addMode: true});
        this.setState({removeMode: false});


    }
    editCategory() {
        if (!this.state.editMode) {
            this.setState({editMode: true});
            if (this.state.addMode) {
                this.props.categories.pop();
                this.setState({addMode: false});
            }
            this.setState({removeMode: false});
        } else {
            this.setState({editMode: false});
        }

    }

    removeCategory() {
        if (!this.state.removeMode) {
            this.setState({removeMode: true});
            if (this.state.addMode) {
                this.props.categories.pop();
                this.setState({addMode: false});
            }
            this.setState({editMode: false});
        } else {
            this.setState({removeMode: false});
        }

    }

    viewCategory() {


    }



    handleChange = (record, event, field) => {
        this.setState({ [field+"Input"]: event.target.value });
        //if (this.state)
    };
    handleBlur = (record, event, field) => {
        record[field] = event.target.value;

        if (record.name !== "" && record.category !== "" && record.coordinates !== ""
        && record.category !== "") {
            store.dispatch(this.props.editCategory(this.state.editRecord));
            this.setState({disabledAdd: false});
            this.setState({ editRecord: null });
            this.setState({editMode: false});
            this.setState({addMode: false});
            this.forceUpdate();
        }


    };
    handleClick = (record, event) => {
        if (this.state.editMode) {
            this.setState({ editRecord: record });
            this.setState({nameInput: record.name});
            this.setState({addressInput: record.address});
            this.setState({categoryInput: record.category});
            this.setState({coordinatesInput: record.coordinates});
        }
        if (this.state.removeMode) {
            store.dispatch(this.props.deleteCategory(record));
        }
        this.forceUpdate();
    };

    render() {
        let that = this;

        const renderField = (props, field) => {

            if ((props.record.name === "" )||
                that.state.editMode && that.state.editRecord === props.record){

                    return (
                        <input  onChange={(e) => this.handleChange(props.record,e, field)}
                                onBlur={(e) => this.handleBlur(props.record,e, field)} value={that.state[field+"Input"]} type={"text"} />
                    )



            } else {

                    return (
                        <span  onClick={(e) => this.handleClick(props.record)}>
                     {props.value}
                 </span>
                    );


            }


        };
        const FilterableTable = require('react-filterable-table');

        const fields = [
            {name: 'name', displayName: "Name", inputFilterable: true, sortable: true, render: (props) => renderField(props,'name')},


        ];


        if (this.state.loading) {
            return <div className="">
                <img src={balls}/>
            </div>
        } else {


            return <div>

                <h1>
                    category Page
                </h1>

                <div>
                    <div>
                        <button onClick={this.viewCategory} className={(this.state.viewMode ? 'selected' : '')} >view</button>
                        <button onClick={this.addCategory} className={(this.state.addMode ? 'selected' : '')} disabled={this.state.disabledAdd}>add</button>
                        <button onClick={this.removeCategory} className={(this.state.removeMode ? 'selected' : '')}>remove</button>
                        <button onClick={this.editCategory}  className={(this.state.editMode && !this.state.addMode ? 'selected' : '')} >edit</button>
                    </div>
                    <FilterableTable
                        namespace="categories"
                        initialSort="name"
                        data={ this.props.categories}
                        fields={fields}
                        noRecordsMessage="There are no categories to display"
                        noFilteredRecordsMessage="No categories match your filters!"
                    />

                </div>

            </div>

        }


    }

}


const mapStateToProps = state => {
    return {
        categories: state.categories,
        addCategory: addCategory,
        editCategory: editCategory,
        deleteCategory: deleteCategory
    }
};

export default withRouter(connect(
    mapStateToProps,
)(CategoryPage));
