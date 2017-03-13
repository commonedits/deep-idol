import React, {Component} from 'react';
import './App.css';

import {Route, browserHistory, BrowserRouter as Router} from 'react-router-dom';

import HomePage from './HomePage/HomePage'
import SignUpPage from './SignUpPage/SignUpPage'
import SubmitContentPage from './SubmitContentPage/SubmitContentPage'
import UploadChoosePage from './UploadChoosePage/UploadChoosePage'
import FlowNotesChoosePage from './FlowNotesChoosePage/FlowNotesChoosePage'
import ThankYouPage from './ThankYouPage/ThankYouPage'
import FlowNotes from './FlowNotes/FlowNotes.js'
import Nav from './components/Nav/Nav'

export default class App extends Component {

 constructor(props, context) {
   super(props, context);
   console.log("CONTEXT ", context);
   this.state = {
    displayNav: true,
   }
 }

 hideNav(){
  this.setState({displayNav: false})
 }

    render() {
        return (
            <Router history={browserHistory}>
                <div>
                    {/* Nav Bar */}
                    <Nav />

                    <div className='container'>

                        {/* Insert pages into this router */}
                        <Route exact path='/' component={HomePage}/>
                        <Route exact path='/register' component={SignUpPage}/>
                        <Route path='/submit' component={SubmitContentPage}/>
                        <Route path='/upload/:content' component={UploadChoosePage}/>
                        <Route exact path='/flownotes' component={FlowNotesChoosePage}/>
                        <Route path='/flownotes/create' component={FlowNotes}/>
                        <Route path='/thanks' component={ThankYouPage}/>
                    </div>
                </div>
            </Router>
        );
    }
}

App.contextTypes = {
  router: React.PropTypes.object
};
