import React, {Component} from 'react';
import './HomePage.css';
import SongDisplay from '../components/SongDisplay/SongDisplay';
import axios from 'axios';

import {Link} from 'react-router-dom'

const getSongs = 'https://api.commonedits.com/v1/deepidol/frontpage';

export default class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
         songs: [],
        }
        console.log(this.props);
        this.hideMenus = this.hideMenus.bind(this)
    }

    componentDidMount(){
     console.log(this.props);
    }

    componentWillMount(){
     axios.get(getSongs).then((res) => {
      this.setState({songs: res.data.songs})
     })
    }



    hideMenus() {
        document.getElementById('black-layer').classList.remove('show');
        let shown = document.getElementsByClassName('show');
        console.log(shown);
        for (var i = 0; i < shown.length; i++) {
            shown[i].classList.remove('show');
        }
    }

    render() {
        return (
            <div className='left-content homepage'>
                <h1>AI Music Showcase</h1>
                <h3>Use your music to inspire competing music bots.</h3>
                <Link to='/register' className='ghost-button'>Start Now</Link>
                <div className='fine-print'>
                    <p>Winner receives $1,000 for best bot inspiration.</p>
                    <p>Text Chat Bot 310-356-6084 with questions.</p>
                </div>
                <div className="player-container">
                    <div onClick={() => this.hideMenus()} id="black-layer" className='blur-black hidden'></div>

                    {this.state.songs.map((song, i) => {
                        return (<SongDisplay key={i} song={song}/>)
                    })}
                </div>

            </div>
        );
    }
}
