import React, {Component} from 'react';
import './SongDisplay.css'
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import Caret from 'react-icons/lib/fa/caret-down';
import Facebook from 'react-icons/lib/fa/facebook';
import Twitter from 'react-icons/lib/fa/twitter';
import Reddit from 'react-icons/lib/fa/reddit-alien';
import Wordpress from 'react-icons/lib/fa/wordpress';

export default class SongDisplay extends Component {
    constructor(props, context) {
        super(props, context);
        this.goToFullPageSong = this.goToFullPageSong.bind(this)
        this.playSong = this.playSong.bind(this)
        this.goToArtistProfile = this.goToArtistProfile.bind(this)
        this.goToSongProfile = this.goToSongProfile.bind(this)
        this.openSongMenu = this.openSongMenu.bind(this)
        this.playSongFromThisPosition = this.playSongFromThisPosition.bind(this)
        this.favoriteSong = this.favoriteSong.bind(this)
        this.displaySongDetails = this.displaySongDetails.bind(this)
        this.shareSong = this.shareSong.bind(this)
        this.hideMenus = this.hideMenus.bind(this)
    }

    componentWillMount() {
    }

    goToFullPageSong(song) {
        this.hideMenus();
    }
    shareSong(event, song) {
        this.hideMenus();
        let element = document.getElementById(`share-${song.id}-menu`);
        element.classList.add('show');
        document.getElementById('black-layer').classList.add('show');
    }
    playSong(song) {
        this.hideMenus();
        this.props.addSong(song);
    }
    goToArtistProfile(song) {
        this.hideMenus();
    }
    goToSongProfile(song) {
        this.hideMenus();
    }
    openSongMenu(song) {
        this.hideMenus();
        let element = document.getElementById(`song-${song.id}-menu`);
        element.classList.add('show');
        document.getElementById('black-layer').classList.add('show');
    }
    playSongFromThisPosition(song) {
        this.hideMenus();
    }
    favoriteSong(song) {
        this.hideMenus();
    }
    displaySongDetails(song) {
        this.hideMenus();
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
        let song = this.props.song;
        return (
            <div className='player-wrapper'>
                <div id={`song-${song.id}-menu`} className='song-openmenu hidden'>
                    <ul>
                        <li>
                            Tag Song</li>
                        <li>
                            Comment</li>
                        <li>
                            View Ledger</li>
                        <li>Crowd Remix</li>
                    </ul>
                </div>
                <audio id={`song-${song.id}`}>
                    <source src={song.song_url} type="audio/mpeg"/>
                    Your browser does not support the audio element.
                </audio>
                <div className="header">
                    <img onClick={() => this.playSong(song)} alt="Common Edits" className="play" src={require('../../images/play-button.png')}/>
                    <div className="songinfo">
                        <h4 onClick={() => this.goToArtistProfile(song)}>{song.artist_name}</h4>
                        <p onClick={() => this.goToSongProfile(song)}>{song.title}</p>
                    </div>
                    <img onClick={() => this.openSongMenu(song)} alt="Common Edits" className="song-menu" src={require('../../images/3-dots.png')}/>
                </div>
                <div className="waveform">
                    <img onClick={() => this.playSongFromThisPosition(song)} alt="Common Edits" className="waves" src={require('../../images/playing-waveform.png')}/>
                    <p>{song.duration
                            ? song.duration
                            : '--:--'}</p>
                </div>
                <div className="footer">
                    <div id={`share-${song.id}-menu`} className='share-dropdown hidden'>
                        <ul>
                            <li>
                                <Facebook style={{
                                    'marginRight': '8px',
                                    'fontSize': '24px'
                                }}/>
                                Facebook</li>
                            <li>
                                <Twitter style={{
                                    'marginRight': '8px',
                                    'fontSize': '24px'
                                }}/>
                                Twitter</li>
                            <li>
                                <Reddit style={{
                                    'marginRight': '8px',
                                    'fontSize': '24px'
                                }}/>
                                Reddit</li>
                            <li>
                                <Wordpress style={{
                                    'marginRight': '8px',
                                    'fontSize': '24px'
                                }}/>
                                Wordpress</li>
                        </ul>
                    </div>
                    <div>
                        <img onClick={() => this.favoriteSong(song)} alt="Common Edits" className="heart" src={require('../../images/heart.png')}/>
                        <h4 onClick={(event) => {
                            event.persist();
                            this.shareSong(event, song)
                        }}>SHARE
                            <Caret/></h4>
                    </div>
                    <FaChevronUp onClick={() => this.displaySongDetails(song)} className="upicon"/>
                </div>
            </div>
        )
    }

}
