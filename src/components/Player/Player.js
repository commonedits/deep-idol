import React, {Component} from 'react';
import './Player.css';

export default class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            played: 0
        }

        this.interval = null;
    }

    componentWillMount() {
        console.log(this.props.song);
    }

    componentDidMount() {
        console.log("I got the first song");
        //play song

        const song = document.getElementById(`song-${this.props.song.id}`);
        this.playbackBarController(song);
    }

    playOrPause() {
        console.log(this.props.song, "Gotta play or pause");
        const song = document.getElementById(`song-${this.props.song.id}`);
        if (!song.paused) {
            song.pause();
            clearInterval(this.interval)
        } else {
            song.play();
            this.playbackBarController();
        }
    }

    playbackBarController() {

        const song = document.getElementById(`song-${this.props.song.id}`);

        clearInterval(this.interval);

        this.interval = setInterval(() => {
         if (this.state.played < 101) {
             let newState = song.currentTime / song.duration * 100;
             this.setState({played: newState});
         } else {
             clearInterval(this.interval);
             this.setState({played: 100});
         }
        }, 1000)

    }

    playSongFromThisPosition(event) {
     console.log(event.nativeEvent);
     let bar = document.getElementById('unplayed-bar').offsetWidth;
     //how many pixels is the player bar
     let totalPX = bar - event.target.offsetLeft

     //what pixel did i click in the player bar
     let currPX = event.pageX - event.target.offsetLeft

     const song = document.getElementById(`song-${this.props.song.id}`);
     let time = currPX/totalPX * song.duration;
     console.log(time / 60);
     console.log(song.duration / 60);
     song.currentTime = time;
     this.playbackBarController();

    }

    render() {
        return (
            <div className='Player-wrapper '>
                <div className='img-wrapper'></div>
                <div className='info-wrapper'>
                    <div onClick={(event) => this.playSongFromThisPosition(event)} id="unplayed-bar"></div>
                    <div onClick={(event) => this.playSongFromThisPosition(event)} id="played-bar" style={{
                        width: `${this.state.played}%`
                    }}></div>
                    <div className='info'>
                        <h1>{this.props.song.title}</h1>
                        <h4>{this.props.song.artist}</h4>
                    </div>
                    <img onClick={() => this.playOrPause()} alt="Common Edits" className="play" src={require('../../images/play-button.png')}/>
                </div>
            </div>
        )
    }
};
