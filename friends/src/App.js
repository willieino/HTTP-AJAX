import React, { Component } from 'react';
import axios from "axios";
import FriendsList from "./components/friendsList";
import AddFriend from "./components/AddFriend";
import UpdateFriend from "./components/UpdateFriend";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      name: null,
      age: null,
      id: null,
      email: null,
      selected: null,
      highLight: null,
      keyIndex: null,
      formClass: null,
      currentFriend: []
    };
  }

  componentDidUpdate() {

  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteHandler = id => {
    
        
          axios.delete(`http://localhost:5000/friends/${id}`)
          .then( response => {
            this.setState({friends: response.data})
           
          })
          .catch(err => console.log(err))
         
      }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/friends', {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    })
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const newIndex = this.state.currentFriend.id
    let webUrl = 'http://localhost:5000/friends/' + newIndex;
    axios.put(webUrl, {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    })
      .then(response => {
        this.setState(() => ({ friends: response.data }));
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
  


    return (
      <div className="App"><h1 className="title">HTTP/AJAX Friends App</h1>
        <div className="friends-container">
          <div className="friends-list">{this.state.friends.map((friend, index) => {
            return <FriendsList key={index} name={friend.name} age={friend.age} email={friend.email} friends={this.state.friends}  id={friend.id} selected={friend.id} keyIndex={index} clickHandler={this.clickHandler} deleteHandler={this.deleteHandler} />
          })}</div>
          <div className="both-friends-container">
            <div className="update-form"><UpdateFriend friends={this.state.friends} selectedFriend={this.props.selectedFriend} name={this.props.name} age={this.props.age} email={this.props.email} changeHandler={this.changeHandler} handleUpdate={this.handleUpdate} /></div>
            <div className="friend-form"><AddFriend friends={this.state.friends} name={this.props.name} age={this.props.age} email={this.props.email} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} /></div>
          </div></div>
      </div>
    );
  }
}

export default App;
