import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, BrowserRouter as Router} from 'react-router-dom';

//COMPONENTS//
import App from './App';
import HomePage from './HomePage/HomePage'
import SignUpPage from './SignUpPage/SignUpPage'
import SubmitContentPage from './SubmitContentPage/SubmitContentPage'
import UploadChoosePage from './UploadChoosePage/UploadChoosePage'
import FlowNotesChoosePage from './FlowNotesChoosePage/FlowNotesChoosePage'
import ThankYouPage from './ThankYouPage/ThankYouPage'
import FlowNotes from './FlowNotes/FlowNotes.js'
import Terms from './Terms/Terms.js'
import SOCAN from './SOCAN/SOCAN.js'

ReactDOM.render((
    <Router>
        <App>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/register' component={SignUpPage}/>
            <Route path='/submit' component={SubmitContentPage}/>
            <Route path='/upload/:content' component={UploadChoosePage}/>
            <Route exact path='/flownotes' component={FlowNotesChoosePage}/>
            <Route path='/flownotes/create' component={FlowNotes}/>
            <Route path='/thanks' component={ThankYouPage}/>
            <Route path='/terms' component={Terms}/>
            <Route path='/socan' component={SOCAN}/>
        </App>
    </Router>
), document.getElementById('root'));
