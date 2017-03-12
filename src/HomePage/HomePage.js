import React, {Component} from 'react';
import './HomePage.css';

import {Link} from 'react-router-dom'

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
             <h1>This is the Home Page</h1>

             <Link to='/upload'>Go Upload</Link>
            </div>
        );
    }
}
