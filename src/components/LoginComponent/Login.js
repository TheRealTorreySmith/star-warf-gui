import React, { Component } from 'react'
import Header from '../HeaderComponent/Header.js'
import { Button, Input, Icon } from 'react-materialize'
import './Login.css'

class Login extends Component {

  loginSubmit = () => {
    let username = this.refs.username.state.value
    let password = this.refs.password.state.value
    this.props.setCurrentUser(username, password)
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <div className={`animated fadeIn container`}>
          <div className="row">
            <div className="col s2 m2 l2">
            </div>
            <div className="col s8 m8 l8 card job-type-container center-align">
              <h5 className="jobtype-title">LOGIN:</h5>
              <div className="row login-container">
                <div className="col s2 m2 l2">
                </div>
                <div className="login">
                  <Input className="login-input" ref="username" s={10} placeholder="Username" validate><Icon>account_circle</Icon></Input>
                  <Input className="login-input" ref="password" s={10} type="password" placeholder="Password"><Icon>lock</Icon></Input>
                </div>
                <div className="col s2 m2 l2">
                </div>
              </div>
              <div>
                <Button onClick={this.loginSubmit} name='login' className='login-button' waves='light'>Submit</Button>
              </div>
            </div>
            <div className="col s2 m2 l2">
            </div>
          </div>
        </div>
     </div>
    )
  }
}

export default Login
