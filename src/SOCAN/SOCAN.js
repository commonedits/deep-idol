import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SOCAN.css';
import axios from 'axios'

const socanAPI = "https://api.commonedits.com/v1/socan"
export default class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GIVEN_NAMES:'',
            MIDDLE_NAME:'',
            LAST_NAME:'',
            DATE_OF_BIRTH:'',
            STREET1:'',
            CITY:'',
            PROVINCE:'',
            COUNTRY:'USA',
            POSTAL_CODE:'',
            PHONE_NO1:'',
            EMAIL_ADDRESS:'',
            EMAIL_ADDRESS_VERIFY:'',
            USER_ID:'',
            PASSWORD:'',
            PASSWORD_VERIFY:'',
            HEAR_OF_SOCAN:'Common Edits',
            LANGUAGE_PREFERENCE:'E',
            TERMS:'Y'
        }
    }

    sendToSocan(){
     console.log(this.state);
     axios.request({
      url: socanAPI,
      method: 'post',
      headers: {'Content-Type': 'text/plain'},
      data: this.state,
     }).then((res) => {
      console.log(res);
     })
    }

    render() {
        return (
         <div className="socan">
             <h2 style={{
              marginTop: -30,
              marginBottom: 12,
              textAlign: 'center'
             }}>Register With Socan</h2>

             <div id="signup-inputs" className="input-container">

                 <input onChange={(event) => this.setState({GIVEN_NAMES: event.target.value})} value={this.state.GIVEN_NAMES} placeholder="First Name" type="text"/>
                 <input onChange={(event) => this.setState({MIDDLE_NAME: event.target.value})} value={this.state.MIDDLE_NAME} placeholder="Middle Name" type="text"/>
                 <input onChange={(event) => this.setState({LAST_NAME: event.target.value})} value={this.state.LAST_NAME} placeholder="Last Name" type="text"/>
                 <input onChange={(event) => this.setState({DATE_OF_BIRTH: event.target.value})} value={this.state.DATE_OF_BIRTH} placeholder="Date Of Birth" type="date"/>
                 <input onChange={(event) => this.setState({STREET1: event.target.value})} value={this.state.STREET1} placeholder="STREET1" type="text"/>
                 <input onChange={(event) => this.setState({CITY: event.target.value})} value={this.state.CITY} placeholder="City" type="text"/>
                 <input onChange={(event) => this.setState({PROVINCE: event.target.value})} value={this.state.PROVINCE} placeholder="State" type="text" maxLength={2}/>
                 <input onChange={(event) => this.setState({COUNTRY: event.target.value})} value={this.state.COUNTRY} placeholder="Country" type="text"/>
                 <input onChange={(event) => this.setState({POSTAL_CODE: event.target.value})} value={this.state.POSTAL_CODE} placeholder="Zip Code" type="text"/>
                 <input onChange={(event) => this.setState({PHONE_NO1: event.target.value})} value={this.state.PHONE_NO1} placeholder="Phone" type="phone"/>
                 <input onChange={(event) => this.setState({EMAIL_ADDRESS: event.target.value})} value={this.state.EMAIL_ADDRESS} placeholder="Email" type="email"/>
                 <input onChange={(event) => this.setState({EMAIL_ADDRESS_VERIFY: event.target.value})} value={this.state.EMAIL_ADDRESS_VERIFY} placeholder="Verify Your Email" type="email"/>
                 <input onChange={(event) => this.setState({USER_ID: event.target.value})} value={this.state.USER_ID} placeholder="Pick a User ID" type="text"/>
                 <input onChange={(event) => this.setState({PASSWORD: event.target.value})} value={this.state.PASSWORD} placeholder="Password" type="password"/>
                 <input onChange={(event) => this.setState({PASSWORD_VERIFY: event.target.value})} value={this.state.PASSWORD_VERIFY} placeholder="Verify Your Password" type="password"/>
                 <input onChange={(event) => this.setState({HEAR_OF_SOCAN: event.target.value})} value={this.state.HEAR_OF_SOCAN} placeholder="" type="hidden"/>
                 <input onChange={(event) => this.setState({LANGUAGE_PREFERENCE: event.target.value})} value={this.state.LANGUAGE_PREFERENCE} placeholder="Language" type="hidden"/>
                 <input onChange={(event) => this.setState({TERMS: event.target.value})} value={this.state.TERMS} placeholder="TERMS" type="hidden"/>


             </div>

             <p style={{textAlign: 'center'}}>SOCAN will be in touch to complete your account</p>
             <div id="signup" className="button-container">

                 <a className='stacked-ghost-button continue' onClick={() => this.sendToSocan()}>CONTINUE</a>
                 {/* <FacebookLogin textButton="LOGIN WITH FACEBOOK" id="facebook" appId="378299952548013" autoLoad={true} fields="name,email,picture,friends,music.listens,location,locale" scopes="public_profile,user_friends,email,user_actions.music,user_location" callback={this.responseFacebook} cssClass="facebook"/> */}


             </div>
         </div>
        );
    }
}
