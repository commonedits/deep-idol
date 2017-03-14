import React, {Component} from 'react';
import './UploadChoosePage.css';

// import {Link} from 'react-router-dom'
// import axios from 'axios'

// import {hashHistory} from 'react-router';
import Upload from 'rc-upload';
import UploadFile from './UploadFile';
const upload = "https://api.commonedits.com/v1/song/upload"
// const debug = "https://api.commonedits.com/phpinfo.php"
export default class UploadChoosePage extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loaded: 0,
            siberia_id: 0,
            initProps: {
                action: upload,
                multiple: true,
                data: {
                    token: localStorage.token
                },
                onStart: (file) => {
                    document.getElementById('blacklayer').classList.add('show');
                    console.log('onStart', file);
                },
                onSuccess: (ret) => {
                    this.props.updateToken(ret['renewed_token']);
                    console.log('onSuccess', ret);
                    this.setState({siberia_id: ret.siberia_id})
                    this.refs.uploadmodal.setState({filecounter: 1})
                },
                onError: (err) => {
                    console.log('onError', err);
                },
                onProgress: (event) => {
                    console.log(event.percent, "%");
                    this.refs.uploadmodal.setState({loaded: event.percent})
                }
            }
        }

    }

    componentWillMount() {
        console.log("PROPS: ", this.props);
    }


    render() {

     let content = this.props.match.params.content;
     if (content === 'fullsong'){
      content = 'Complete Song'
     } else {
      content = content.split('');
      content[0] = content[0].toUpperCase();
      content = content.join('');

     }

        return (
            <div className='left-content submitpage'>
                <div id="blacklayer" className="hidden">
                    <UploadFile ref='uploadmodal' siberia_id={this.state.siberia_id} loaded={this.state.loaded}/>
                </div>
                <h2>Upload your {content}</h2>
                <h3>You must own 100%</h3>
                <div className="center-container center-content choice-container">
                    <Upload className='stacked-ghost-button' {...this.state.initProps}>
                        <a style={{
                         fontSize: 22
                        }}>Choose a file</a>
                    </Upload>
                    {content === 'Acapella' &&
                    <a className='stacked-ghost-button' id='record file'>Record File</a>
                   }

                </div>

            </div>
        );
    }
}
