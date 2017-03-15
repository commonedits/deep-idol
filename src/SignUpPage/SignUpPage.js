import React, {Component} from 'react';
import './SignUpPage.css';
import md5 from './md5';
import axios from 'axios';
const signup = "https://api.commonedits.com/v1/user/signup"
const login = "https://api.commonedits.com/v1/user/login"
import {Link} from 'react-router-dom'

export default class SignUpPage extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hasAccount: false,
            email: '',
            password: '',
            artist: '',
        }

        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    signup() {
        this.passwordHandler((hash) => {
            //send to server
            let data = {
                email: this.state.email,
                password: hash,
                artist_name: this.state.artist
            }
            axios.post(signup, data).then((res) => {
                localStorage.uid = res.data.user.id
                localStorage.email = res.data.user.email
                localStorage.token = res.data.token
                this.context.router.history.push('/submit', {account: res.data})
            })
        })
    }

    login() {
        this.passwordHandler((hash) => {
            //send to server
            let data = {
                email: this.state.email,
                password: hash
            }
            axios.post(login, data).then((res) => {
                localStorage.uid = res.data.user.id
                localStorage.email = res.data.user.email
                localStorage.token = res.data.token
                this.context.router.history.push('/submit', {account: res.data})
            })
        })

    }

    passwordHandler(cb) {
        var salt = "Two peanuts were walking down a road";
        var hash = md5(this.state.password + salt);

        cb(hash);
    }

    renderSignUp() {

        return (
            <div className="signuppage">
                <h2 style={{
                 marginTop: -30,
                 marginBottom: 12,
                }}>Create an Account</h2>

                <div id="signup-inputs" className="input-container">

                    <input onChange={(event) => this.setState({artist: event.target.value})} value={this.state.artist} placeholder="Artist Name" type="text"/>

                    <input onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} placeholder="Email Adress" type="email"/>

                    <input onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} placeholder="Password" type="password"/> {/* <input onChange={(event) => this.setState({confirm: event.target.value})} placeholder="Confirm Password" type="password"/> */}
                    <div>
                     <input onClick={() => this.setState({
                      checkbox: !this.state.checkbox
                     })} type="checkbox" id="check" name="check" required readOnly={true}/>
                     <span> Agree to <Link to='/terms'>Terms and Conditions</Link>
                    </span>
                   </div>

                </div>
                <div id="signup" className="button-container">

                    <a className='stacked-ghost-button continue' onClick={() => this.signup()}>CONTINUE</a>
                    {/* <FacebookLogin textButton="LOGIN WITH FACEBOOK" id="facebook" appId="378299952548013" autoLoad={true} fields="name,email,picture,friends,music.listens,location,locale" scopes="public_profile,user_friends,email,user_actions.music,user_location" callback={this.responseFacebook} cssClass="facebook"/> */}

                    <a onClick={() => {
                        this.setState({hasAccount: true})
                    }} className="toggle">I already have an account</a>

                </div>
            </div>
        )
    }

    renderLogIn() {
        return (
            <div className="signuppage">

                <h2>Please Log In</h2>

                <div id="signup-inputs" className="input-container">

                    <input onChange={(event) => this.setState({email: event.target.value})} value={this.state.email} className="input-space" placeholder="Email Adress" type="text"/>

                    <input onChange={(event) => this.setState({password: event.target.value})} value={this.state.password} placeholder="Password" type="password"/>

                </div>
                <div className="button-container">

                    <a className='stacked-ghost-button continue' onClick={() => this.login()}>CONTINUE</a>
                    {/* <FacebookLogin textButton="LOGIN WITH FACEBOOK" id="facebook" appId="378299952548013" autoLoad={true} fields="name,email,picture,friends,music.listens,location,locale" scopes="public_profile,user_friends,email,user_actions.music,user_location" callback={this.responseFacebook} cssClass="facebook"/> */}

                    <a className='toggle' onClick={() => {
                        this.setState({hasAccount: false})
                    }}>I don't have an account</a>
                </div>

            </div>
        )
    }

    render() {
        return (
            <div>
                {this.state.hasAccount
                    ? this.renderLogIn()
                    : this.renderSignUp()}
            </div>
        )
    }
};

SignUpPage.contextTypes = {
    router: React.PropTypes.object
};
