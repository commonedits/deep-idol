import React, {Component} from 'react';
import './ThankYouPage.css';
import SongDisplay from '../components/SongDisplay/SongDisplay'
import {Link} from 'react-router-dom'

export default class ThankYouPage extends Component {
    constructor(props) {
        super(props);
        this.hideMenus = this.hideMenus.bind(this)
    }

    TestSongs = [
        {
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
        }, {
            artist_name: "Tosin",
            date_created: "2017-03-09 22:44:54",
            date_updated: "2017-03-09 22:49:00",
            id: "245",
            license: null,
            most_recent_analysis_id: null,
            most_recent_analysis_json: null,
            most_recent_analysis_version: null,
            other_meta_data: null,
            s3key: "siberia/song/897d9e505a1258c2163958f569ba4ebe",
            song_id: "245",
            song_url: "http://cdn.commonedits.com/siberia/song/897d9e505a1258c2163958f569ba4ebe",
            still_processing_submission: "0",
            title: "Song For Sarah French",
            user_id: "3"
        }, {
            artist_name: "Tosin",
            date_created: "2017-03-09 22:41:59",
            date_updated: "2017-03-09 22:48:59",
            id: "244",
            license: null,
            most_recent_analysis_id: null,
            most_recent_analysis_json: null,
            most_recent_analysis_version: null,
            other_meta_data: null,
            s3key: "siberia/song/d1ecbdd5fcb1bdb2976a74126d19dde0",
            song_id: "244",
            song_url: "http://cdn.commonedits.com/siberia/song/d1ecbdd5fcb1bdb2976a74126d19dde0",
            still_processing_submission: "0",
            title: "In This Game",
            user_id: "3"
        }, {
            artist_name: "Tosin",
            date_created: "2017-03-09 22:21:20",
            date_updated: "2017-03-09 22:29:44",
            id: "237",
            license: null,
            most_recent_analysis_id: null,
            most_recent_analysis_json: null,
            most_recent_analysis_version: null,
            other_meta_data: null,
            s3key: "siberia/song/a32a3a24ff8cbb814b7022eb4e3905f7",
            song_id: "237",
            song_url: "http://cdn.commonedits.com/siberia/song/a32a3a24ff8cbb814b7022eb4e3905f7",
            still_processing_submission: "0",
            title: "Back Up",
            user_id: "3"
        }
    ]

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
            <div className='left-content thankspage'>
                <h1>Thank you for
                </h1>
                <h1>your participation!</h1>
                <h3>Our deep learning program will analyze your content for the next 72 hours.</h3>
                <a onClick={() => scrollTo(0,620)} className='ghost-button'>Listen to Samples</a>
                <div className="player-container">
                    <div onClick={() => this.hideMenus()} id="black-layer" className='blur-black hidden'></div>

                    {this.TestSongs.map((song, i) => {
                        return (<SongDisplay key={i} song={song}/>)
                    })}
                </div>

            </div>
        );
    }
}
