import React, {Component} from 'react';
import './Nav.css'

export default class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='navbar'>

                <div className='left'>
                    <a> Deep Idol </a>
                </div>

                <div className='right'>
                    <a>Listen</a>
                </div>

            </div>
        );
    }
}
