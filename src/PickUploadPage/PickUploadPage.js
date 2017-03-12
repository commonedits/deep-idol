import React, {Component} from 'react';
import './PickUploadPage.css';

import {Link} from 'react-router-dom'
export default class PickUploadPage extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        console.log("PROPS: ", this.props);
    }

    RolesArray = [
        {
            text: "Acapella",
            role: ""
        }, {
            text: "Instrumentals",
            role: ""
        }, {
            text: "Complete Song",
            role: ""
        }, {
            text: "Lyrics",
            role: ""
        }
    ]

    render() {
        return (
            <div>
                <div className='content roles-page'>
                    <h1 className='center'>Creative Suite</h1>
                </div>
                <div className="choice-container">
                    {this.RolesArray.map((item, index) => {
                        return (
                            <div key={index} className={`create ${item.role}`} onClick={() => this.onBoarding(item)}>
                                <h2>{item.text}
                                </h2>
                            </div>
                        )
                    })}
                </div>
                <Link to='/'>Go Home</Link>
            </div>
        );
    }
}
