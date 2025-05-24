import React, { useState, useEffect } from 'react';
import ItemInput from './ItemInput';
import axios from 'axios';

class List extends React.Component {
    constructor() {
        super();
        this.components = [];
        this.counter = 0;
        this.items = [];
    }

    addComponent = () => {
        this.components = [...this.components, this.counter];
        this.counter = this.counter + 1;
    };

    submit = () =>{
        axios.post('http//localhost:5000/endpoint/itemForm', this.items);
    };

    handleCallback = (callback) => {
        this.items = [...this.items, callback]
    }

    render() {
        return (
            <div>
            <button onClick={this.addComponent}>Add Item</button>
            {this.components.map((component) => (
                <ItemInput parentCallback={this.handleCallback} key={component.id} />
            ))}
            <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
};
export default List;
