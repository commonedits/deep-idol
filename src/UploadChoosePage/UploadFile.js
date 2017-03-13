import React, {Component} from 'react';
import './UploadChoosePage.css';
import md5 from './md5'
import {hashHistory} from 'react-router';
import axios from 'axios';
const saveBotURL = "https://api.commonedits.com/v1/song/create"
export default class UploadFile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: 0,
            name: '',
            bot: '',
            email: '',
            genre: '',
            hashedpw: '',
            genrelist: [
                "Blues",
                "Earth Metal",
                "Break Core",
                "Classic Rock",
                "Country",
                "Dance",
                "Disco",
                "Funk",
                "Grunge",
                "Hip-Hop",
                "Jazz",
                "Metal",
                "New Age",
                "Oldies",
                "Other",
                "Pop",
                "R&B",
                "Rap",
                "Reggae",
                "Rock",
                "Techno",
                "Industrial",
                "Alternative",
                "Ska",
                "Death Metal",
                "Pranks",
                "Soundtrack",
                "Euro-Techno",
                "Ambient",
                "Trip-Hop",
                "Vocal",
                "Jazz+Funk",
                "Fusion",
                "Trance",
                "Classical",
                "Instrumental",
                "Acid",
                "House",
                "Game",
                "Sound Clip",
                "Gospel",
                "Noise",
                "AlternRock",
                "Bass",
                "Soul",
                "Punk",
                "Space",
                "Meditative",
                "Instrumental Pop",
                "Instrumental Rock",
                "Ethnic",
                "Gothic",
                "Darkwave",
                "Techno-Industrial",
                "Electronic",
                "Pop-Folk",
                "Eurodance",
                "Dream",
                "Southern Rock",
                "Comedy",
                "Cult",
                "Gangsta",
                "Top 40",
                "Christian Rap",
                "Pop/Funk",
                "Jungle",
                "Native American",
                "Cabaret",
                "New Wave",
                "Psychadelic",
                "Rave",
                "Showtunes",
                "Trailer",
                "Lo-Fi",
                "Tribal",
                "Acid Punk",
                "Acid Jazz",
                "Polka",
                "Retro",
                "Musical",
                "Rock & Roll",
                "Hard Rock",
                "Folk",
                "Folk-Rock",
                "National Folk",
                "Swing",
                "Fast Fusion",
                "Bebob",
                "Latin",
                "Revival",
                "Celtic",
                "Bluegrass",
                "Avantgarde",
                "Gothic Rock",
                "Progressive Rock",
                "Psychedelic Rock",
                "Symphonic Rock",
                "Slow Rock",
                "Big Band",
                "Chorus",
                "Easy Listening",
                "Acoustic",
                "Humour",
                "Speech",
                "Chanson",
                "Opera",
                "Chamber Music",
                "Sonata",
                "Symphony",
                "Booty Bass",
                "Primus",
                "Porn Groove",
                "Satire",
                "Slow Jam",
                "Club",
                "Tango",
                "Samba",
                "Folklore",
                "Ballad",
                "Power Ballad",
                "Rhythmic Soul",
                "Freestyle",
                "Duet",
                "Punk Rock",
                "Drum Solo",
                "Acapella",
                "Euro-House",
                "Samples",
                "SFX"
            ]
        }
        this.interval = null;
        this.saveBot = this.saveBot.bind(this);
        this.moveStuff = this.moveStuff.bind(this);
        this.unMoveStuff = this.unMoveStuff.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.setPassword = this.setPassword.bind(this);

    }

    compenentWillMount() {
        console.log(this.state.genrelist);
    }

    componentDidMount() {
        clearInterval(this.interval);

        // this.interval = setInterval(() => {
        //     if (this.state.loaded < 100) {
        //         //track progress from this.props
        //         this.setState({loaded: newState})
        //     } else {
        //         clearInterval(this.interval);
        //         console.log("Song is uploaded");
        //     }
        // }, 50);
    }

    saveBot() {
     console.log(this.state);
     document.getElementById('blacklayer').classList.remove('show');
        // axios.request({
        //     url: saveBotURL,
        //     method: 'post',
        //     data: {
        //         token: localStorage.token,
        //         title: this.state.title,
        //         genre: this.state.genre.split(','),
        //         siberia_id: this.props.siberia_id
        //     }
        // }).then((res) => {
        //  console.log(res);
        //  document.getElementById('blacklayer').classList.remove('show');
        // }).catch((err) => {
        //  alert("there was an error completing your song")
        // })

    }

    moveStuff() {
        let genre = document.getElementById('genre-input');
        let suggestion = document.getElementById('suggestion-box');
        genre.classList.add('to-bottom')
        suggestion.classList.add('show')
    }
    unMoveStuff() {
        let genre = document.getElementById('genre-input');
        let suggestion = document.getElementById('suggestion-box');
        genre.classList.remove('to-bottom')
        suggestion.classList.remove('show')
    }

    genreHandler(genre, i){
     let el = document.getElementById(`genre-${genre}`);
     el.style.border = "1px solid #7c4dff";
     let oldState = this.state.genre;
     let newState = oldState;
     if (oldState.length > 0){
       newState = `${oldState}, ${genre}`;
     } else {
       newState = genre;
     }
     this.setState({genre: newState})
    }

    passwordHandler(event, cb) {
        var salt = "Two peanuts were walking down a road";
        var hash = md5(event.target.value + salt);

        cb(hash);
    }

    setPassword(hash){
     this.setState({hashedpw: hash});
    }

    render() {
        return (
            <div className="container track-info show">
                <div id="suggestion-box" className="suggestion hidden">
                    <a id='close-button' onClick={() => this.unMoveStuff()}>CLOSE</a>
                    {this.state.genrelist.map((genre, i) => {
                        return (
                            <a id={`genre-${genre}`} onClick={() => this.genreHandler(genre)} key={i}>{genre}</a>
                        )
                    })}
                </div>
                <div id="loading-bar"></div>
                <div id="loaded-bar" style={{
                    width: `${this.props.loaded}%`
                }}></div>
                <div className="content">
                    <h1>
                        Track info
                    </h1>
                    <div className="info-container">
                        <div className="left-image">
                            <img src={require('../images/upload-image.png')} alt="Common Edits"/>
                            <p>320 X 320</p>
                        </div>
                        <div className="right-inputs">
                            <input onChange={(event) => this.setState({name: event.target.value})} placeholder="Name" type="text"/>

                            <input onChange={(event) => this.setState({bot: event.target.value})} placeholder="Bot Name" type="text"/>

                            <input onFocus={() => this.moveStuff()} id="genre-input" onChange={(event) => this.setState({genre: event.target.value})} placeholder="Genre" value={this.state.genre} required type="text"/>

                            <input onChange={(event) => this.setState({email: event.target.value})} placeholder="Email Address" required type="email"/>

                            <input required onChange={(event) => this.passwordHandler(event, this.setPassword)} placeholder="Password" type="password"/>

                            <a onClick={() => this.saveBot()} id={this.state.name.length === 0
                                ? 'inactive'
                                : ''} className="save">
                                Save
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
