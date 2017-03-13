import React, {Component} from 'react';
import './App.css';


import axios from 'axios';
const server = "https://api.commonedits.com/v1"
import Nav from './components/Nav/Nav'
// import Player from './components/Player/Player'

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            userLoggedIn: false,
            showMenu: false,
            token: '',
            uid: 'guest',
            pic: '',
            artist_name: '',
            role: '',
            nowPlaying: {
                artist_name: "Tosin",
                date_created: "2017-03-09 22:48:06",
                date_updated: "2017-03-09 22:49:01",
                id: "246",
                license: null,
                most_recent_analysis_id: null,
                most_recent_analysis_json: null,
                most_recent_analysis_version: null,
                other_meta_data: null,
                s3key: "siberia/song/0dc95d1ec1c4b37fa5665d569ead37b9",
                song_id: "246",
                song_url: "http://cdn.commonedits.com/siberia/song/0dc95d1ec1c4b37fa5665d569ead37b9",
                still_processing_submission: "0",
                title: "Th Many Faces Of The Morning",
                user_id: "3"
            }
        }
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.updateToken = this.updateToken.bind(this);
        this.getHomeState = this.getHomeState.bind(this);
        this.setRole = this.setRole.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    componentDidUpdate() {
        scrollTo(0, 0);
    }

    componentWillMount() {
        if (localStorage.token) {
            axios.post(`${server}/user/check`, {token: localStorage.token}).then((res) => {
                this.updateToken(res.data['renewed_token']);
                this.setState({userLoggedIn: true, token: res.data['renewed_token'], uid: localStorage.uid});
            }).catch((err) => {
            })
        }
    }

    addSong(song) {
        let allPlayers = document.getElementsByTagName('audio');
        for (var i = 0; i < allPlayers.length; i++) {
            allPlayers[i].pause()
            allPlayers[i].currentTime = 0;
        }
        const songToPlay = document.getElementById(`song-${song.id}`);
        songToPlay.play();
        this.setState({
            nowPlaying: song
        }, () => {
            if (this.state.nowPlaying) {
                this.refs.player.playbackBarController()
            }
        })

    }

    showMenu() {
        this.setState({showMenu: true})
    }

    hideMenu() {
        this.setState({showMenu: false})
    }
    setRole(role) {
        this.setState({role: role})
    }

    loginUser(token, id, name) {
        this.setState({userLoggedIn: true, token: token, uid: id, artist_name: name})
    }

    updateToken(newToken) {
        if (newToken) {
            localStorage.token = newToken;
            this.setState({token: newToken})
        }
    }

    logoutUser() {
        this.setState({userLoggedIn: false, token: '', uid: 'guest', showMenu: false})
    }

    getHomeState() {
        return this.state;
    }

    render() {
        return (

            <div className='container'>
                <Nav />
                {this.props.children}
            </div>

        );
    }
}

App.contextTypes = {
    router: React.PropTypes.object
};
