import React, {Component} from 'react';
import './SubmitContentPage.css';

import {Link} from 'react-router-dom'
export default class SubmitContentPage extends Component {


    render() {
        return (
            <div className='left-content submitpage'>
                <h2>Submit Original Content</h2>
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
