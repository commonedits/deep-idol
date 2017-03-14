import React, {Component} from 'react';
import './UploadChoosePage.css';
import md5 from './md5'
// import axios from 'axios';
// const saveBotURL = "https://api.commonedits.com/v1/song/create"
import genres from './genres'
import Upload from 'rc-upload';
import cloudinary from 'cloudinary'
const uploadpicture = "https://api.commonedits.com/v1/user/picture_upload"
const uploadsong = "https://api.commonedits.com/v1/song/upload"
export default class UploadFile extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loaded: 0,
            filecounter: 0,
            bot: '',
            genre: '',
            genrelist: genres,
            songProps: {
                action: uploadsong,
                data: {
                    token: localStorage.token
                },
                onStart: (file) => {
                    console.log('onStart', file);
                },
                onSuccess: (ret) => {
                    console.log('Song Uploaded', ret);
                    this.setState({filecounter: this.state.filecounter + 1})
                },
                onError: (err) => {
                    console.log('Song Uploaded onError', err);
                },
                onProgress: (event) => {
                    console.log(event.percent, "%");
                    this.setState({loaded: event.percent})
                }
            },
            picProps: {
                action: uploadpicture,
                data: {
                    token: localStorage.token
                },
                onStart: (file) => {
                    console.log('onStart', file);
                },
                onSuccess: (ret) => {
                    console.log('Picture Uploaded', ret);
                },
                onError: (err) => {
                    console.log(' Picture Uploaded onError', err);
                },
                onProgress: (event) => {
                    console.log(event.percent, "%");
                    this.setState({loaded: event.percent})
                }
            }
        }
        this.interval = null;
        this.saveBot = this.saveBot.bind(this);
        this.moveStuff = this.moveStuff.bind(this);
        this.unMoveStuff = this.unMoveStuff.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.setPassword = this.setPassword.bind(this);

    }

    componentDidMount() {
        clearInterval(this.interval);

        // this.interval = setInterval(() => {
        //     if (this.state.loaded < 100) {
        //         //track progress from this.props
        //         this.setState({loaded: newState})
        //     } else {
        //         clearInterval(this.interval);
        //     }
        // }, 50);
    }

    saveBot() {
        document.getElementById('blacklayer').classList.remove('show');
        if (this.state.bot.length === 0 && this.state.genre.length === 0) {
         alert("please enter a bot name and at least one genre");
        } else {
         this.context.router.history.push('/thanks')
         // save it
        }
        // let data = {
        //         title: this.state.title,
        //         genre: this.state.genre.split(','),
        //         siberia_id: this.props.siberia_id
        //     }
        // axios.request({
        //     url: saveBotURL,
        //     method: 'post
        //     data: {
        //         token: localStorage.token,
        //         title: this.state.title,
        //         genre: this.state.genre.split(','),
        //         siberia_id: this.props.siberia_id
        //     }
        // }).then((res) => {
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

    genreHandler(genre, i) {
        let el = document.getElementById(`genre-${genre}`);
        el.style.border = "1px solid #7c4dff";
        let oldState = this.state.genre;
        let newState = oldState;
        if (oldState.length > 0) {
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

    setPassword(hash) {
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
                    width: `${this.state.loaded}%`
                }}></div>
                <div className="content">
                    <h1>
                        Track info
                    </h1>
                    <div className="info-container">
                        <div className="left-image">
                            <div className='pretty-input'>
                                <Upload {...this.state.picProps}>
                                    <img src={require('../images/upload-image.png')} alt="Common Edits"/>
                                </Upload>
                            </div>

                            <p>320 X 320</p>
                        </div>
                        <div className="right-inputs">

                            <input onChange={(event) => this.setState({bot: event.target.value})} placeholder="Bot Name" type="text"/>

                            <input onFocus={() => this.moveStuff()} id="genre-input" onChange={(event) => this.setState({genre: event.target.value})} placeholder="Genre" value={this.state.genre} required type="text"/>

                        </div>


                        <div className='button-group'>

                            <a onClick={() => this.saveBot()} id={this.state.bot.length === 0 && this.state.genre.length === 0
                                ? 'inactive'
                                : ''} className="save">
                                Save
                            </a>
                            <Upload {...this.state.songProps}>
                            <a className="saveandadd">
                                Upload Another
                            </a>
                           </Upload>
                           <h4>Bot Food Given: {this.state.filecounter}</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UploadFile.contextTypes = {
    router: React.PropTypes.object
};
