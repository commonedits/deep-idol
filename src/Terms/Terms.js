import React, {Component} from 'react';
import './Terms.css';
import TNC from './TNC';
import Privacy from './Privacy';
import EULA from './EULA';

import {hashHistory} from 'react-router';

export default class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkbox: false
        };
    }

    checkboxStatus() {
        if (this.state.checkbox) {
            return 'checked'
        } else {
            return 'unchecked'
        }
    }

    acceptTerms() {
        if (this.state.checkbox) {
            if (this.props.getHomeState().role !== 'upload') {
                hashHistory.push(this.props.location.state.dest)
            } else {
                hashHistory.push({
                    pathname: '/registration',
                    state: {
                        head: "Create an Account",
                        subhead: "This is required to upload any content"
                    }
                })
            }
        } else {
            alert("Please agree to terms and conditions")
        }
    }

    render() {
        return (
            <div className="transition-item maw-page container">
                <div className='content tnc'>
                    <div className='policies-wrapper'>

                        <h3>Terms & Conditions</h3>
                        <TNC/>
                          <h3>Privacy</h3>
                        <Privacy/>
                         <h3>End User License Agreement</h3>
                        <EULA/>

                    </div>

                </div>
            </div>
        )
    }
}
