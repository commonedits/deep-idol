import React, {Component} from 'react';
import './ThankYouPage.css';
import SongDisplay from '../components/SongDisplay/SongDisplay'
// import {Link} from 'react-router-dom'import axios from 'axios';
import axios from 'axios';

const getSongs = 'https://api.commonedits.com/v1/deepidol/frontpage';

export default class ThankYouPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
         songs: [],
        }
        this.hideMenus = this.hideMenus.bind(this)
    }


    hideMenus() {
        document.getElementById('black-layer').classList.remove('show');
        let shown = document.getElementsByClassName('show');
        for (var i = 0; i < shown.length; i++) {
            shown[i].classList.remove('show');
        }
    }

    componentWillMount(){
     axios.get(getSongs).then((res) => {
      this.setState({songs: res.data.songs})
     })
    }


    render() {
        return (
            <div className='left-content thankspage'>
                <h1>Thank you for
                </h1>
                <h1>your participation!</h1>
                <h3>Our deep learning program will analyze your content for the next 72 hours.</h3>
                <a onClick={() => scrollTo(0,620)} className='ghost-button'>Listen to Samples</a>
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
