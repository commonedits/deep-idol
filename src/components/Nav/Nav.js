import React, {Component} from 'react';
import './Nav.css'

import {Link} from 'react-router-dom'

export default class Nav extends Component {

    componentDidMount(){
     console.log(this.props);
    }

    render() {
        return (
            <div id="navbar" className='navbar'>

                <div className='left'>
                    <Link to='/'>
                        Deep Idol
                    </Link>
                </div>

                <div className='right'>
                    <a>Listen</a>
                </div>

            </div>
        );
    }
}
