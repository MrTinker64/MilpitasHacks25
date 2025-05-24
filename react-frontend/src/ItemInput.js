import React, { useState, useEffect } from 'react';

class ItemInput extends React.Component {
    constructor() {
        super();
        this.items = [];
    }

    handleSubmit = () => {
        this.props.parentCallback(this.item)
    }

    handleChange = (event) => {
        this.items = event;
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Enter your name:
                    <input 
                    type="text" 
                    value=""
                    onChange={this.handleChange}
                    />
                </label>
                <input type="submit" />
            </form>
        )
    }
}

export default ItemInput;