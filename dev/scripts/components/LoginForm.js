import React from 'react';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDhpZQDqygKV1G_ne9JJwxxWPnYYKxaX0Q",
  authDomain: "hy-jobs-board.firebaseapp.com",
  databaseURL: "https://hy-jobs-board.firebaseio.com",
  projectId: "hy-jobs-board",
  storageBucket: "hy-jobs-board.appspot.com",
  messagingSenderId: "1023755007156"
};
firebase.initializeApp(config);

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      loggedIn: false,
      password: '',
      email: ''
    }
    this.loginWithReadme = this.loginWithReadme.bind(this)

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

  }
  componentDidMount() {
   
    document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();
      fetch(`https://notes-api.hackeryou.com/v2/user/firebaseAuth?email=${this.email.value}&password=${this.password.value}`)
        .then(res => res.json())
        .then(res => {
          console.log(res.token);
          firebase.auth().signInWithCustomToken(res.token)
            .then(() => console.log('user logged in'))
            .catch(err => console.error(err));
        });
    });

  }
  loginWithReadme(e) {
    e.preventDefault();
    fetch(`https://notes-api.hackeryou.com/v2/user/firebaseAuth?email=${this.state.email}&password=${this.state.password}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        firebase.auth().signInWithCustomToken(res.token)
          .then(() => console.log('user logged in'))
          .catch(err => console.error(err));
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.setState({
          loggedIn: true
        })
        return;
      }
      this.setState({
        loggedIn: false
      })
    });
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
        <form action="" id="form">
          <h1>logged out</h1>
          <label for="">email:</label>
          <input type="email" name="email" id="" placeholder="enter your readme email" onChange={this.onChangeEmail} value={this.state.email} />
          <label htmlFor="">password:</label>
          <input type="password" name="password" placeholder="enter your readme password" onChange={this.onChangePassword} value={this.state.password} />
          <input type="submit" />
        </form>
    )
  }
}

export default LoginForm;
