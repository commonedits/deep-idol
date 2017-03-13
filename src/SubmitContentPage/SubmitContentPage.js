import React, {Component} from 'react';
import './SubmitContentPage.css';

import {Link} from 'react-router-dom'
export default class SubmitContentPage extends Component {

    componentWillMount() {
        console.log("PROPS: ", this.props);
    }

    render() {
        return (
            <div className='left-content submitpage'>
                <h2>Step One: Submit Content</h2>
                <h3>You must own 100%</h3>
                <div className="center-container center-content choice-container">
                    <Link className='stacked-ghost-button' to='/upload/acapella'>Acapella</Link>
                    <Link className='stacked-ghost-button' to='/upload/instrumental'>Instrumental</Link>
                    <Link className='stacked-ghost-button' to='/upload/fullsong'>Complete Song</Link>
                    <Link className='stacked-ghost-button' to='/flownotes'>Lyrics</Link>
                </div>

            </div>
        );
    }
}
