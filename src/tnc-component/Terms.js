import React, {Component} from 'react';
import './Terms.css';
import Nav from '../nav-component/Nav';
// import TermsCopy from './termscopy'

import {hashHistory} from 'react-router';

export default class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkbox: false,
            terms: 'Competition Rules / Terms &amp; Conditions The following constitutes the Rules, Terms and Conditions of the CommonEdits Hip Hop Competition ("Competition”). By applying to take part in the Competition, you ("Applicant”) confirm and agree to be bound to the terms and details outlined below. CommonEdits reserves the right, in its sole discretion, to modify these Terms and Conditions. Applicant will be informed of changes to these Terms and Conditions. Entering the Competition The Competition is open to all amateur and professional artists. Applicants must be legal residents of the 50 United States or the District of Columbia and must be 18 years of age or older at time of entry unless otherwise stated in this Agreement. (If an Applicant is under 18 years old, the signature of a parent or guardian is required to permit the Applicant to enter the Competition.) Do not enter the Contest unless you are located in the United States at the time of entry. The following persons are not eligible for any prize: Persons who on or after November 28, 2015, were or are employees of CommonEdits or KNON, or its related organizations, their immediate family, or persons living in the same household. General Competition Terms for All Applicants On November 28, 2015, CommonEdits will be hosting a special event for the Competition at Valley of the Kings Studio located at 9550 Skillman St., #140, Dallas, TX 75243 from 6 p.m. – 10 p.m. Applicants will be offered a 10-minute studio session on a first-come/first- serve basis. Only the first 20 artists appearing at the studio on November 28, 2015 will be guaranteed an studio session. Mugy Debarge will serve as the recording engineer for these Applicants on November 28, 2015. Applicant must create a profile on the CommonEdits Website, and submit other relevant Applicant information in order to complete Applicant’s submission into the Competition. Applicant must agree to all Terms and Conditions of the Competition. Within 48 hours of completing Applicant’s profile page on the CommonEdits Website, Applicant shall receive an Electronic Press Kit ("EPK”) with the completed Project Pat track (completed composition) available for streaming. The general public and Applicant’s fans will be able to vote for Applicant’s completed composition by sharing Applicant’s EPK via the following social media outlets: Facebook or Twitter. The EPK on CommonEdits Website will display and track the number of shares Applicant’s EPK receives. If Applicant receives 100 votes (i.e. social medial shares), Applicant will move forward to Round 2 of the Competition, and will be notified via email and on the CommonEdits Website. Please see Terms and Conditions below detailing how voting is completed in each Round and final Winner selected.'
        };
    }

    componentDidMount(){
    }

    checkboxStatus (){
     if (this.state.checkbox) {
      return 'checked'
     } else {
      return 'unchecked'
     }
    }

    acceptTerms (){
     if (this.state.checkbox) {
      if (this.props.getHomeState().role !== 'upload') {
      hashHistory.push(this.props.location.state.dest)
     } else {
      hashHistory.push({
       pathname: '/registration',
       state: {
        head: "Create an Account",
        subhead: "This is required to upload any content",
       }
      })
     }
     } else {
      alert("Please agree to terms and conditions")
     }
    }

    render() {
        return (
            <div className="container terms">
                <Nav homeMethods={this.props} user={this.state}/>
                <div className='content tnc'>

                    <h1>
                        Terms & Conditions
                    </h1>
                    <div className="revenue">
                        <div className="pull-left">
                            <img src={require('../images/pie-chart-5.png')} alt="Common Edits"/>
                        </div>

                        <div className="pull-right">
                            <h4>Revenue Split</h4>
                            <p>75% artists</p>
                            <p>25% distribution</p>
                        </div>
                    </div>
                    <textarea value={this.state.terms}/>

                </div>
                <div className='terms-buttons'>
                    <div className="checkbox-wrapper">
                       <div className="cb-wrap">
                        <input onClick={() => this.setState({checkbox: !this.state.checkbox})} type="checkbox" id="check" name="check" required readOnly={true}/>
                       </div>
                        <label htmlFor="check">I agree</label>
                    </div>
                    <a onClick={() => this.acceptTerms()} className={this.checkboxStatus()}>
                        Accept
                    </a>
                </div>
            </div>
        )
    }
}
