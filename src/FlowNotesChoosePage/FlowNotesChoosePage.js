import React, {Component} from 'react';
import './FlowNotesChoosePage.css';

import {Link} from 'react-router-dom'
export default class FlowNotesChoosePage extends Component {

    componentWillMount() {
        console.log("PROPS: ", this.props);
    }

    render() {
        return (
            <div className='left-content submitpage'>
                <h2>Step One: Submit Content</h2>
                <h3>You must own 100%</h3>
                <div className="center-container center-content choice-container">
                    <Link className='stacked-ghost-button' to='/upload/lyrics'>Upload a Song</Link>
                    <Link className='stacked-ghost-button' to='/flownotes/create'>Write One Now</Link>

                </div>

            </div>
        );
    }
}
