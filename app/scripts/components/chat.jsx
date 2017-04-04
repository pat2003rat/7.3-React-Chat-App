var React = require('react');

var models = require('../models/message');

var MessagesContainer = React.createClass({
  getInitialState: function() {
    var messageCollection = new models.MessageCollection();
    messageCollection.fetch().done(() => {
      this.setState({ messageCollection: messageCollection })
    });

    window.setInterval(this.getMessages, 30000);

    return {
      messageCollection
    };
  },

  getMessages: function(event){
    var messageCollection = this.state.messageCollection;
    messageCollection.fetch().done(() => {
      this.setState({ messageCollection: messageCollection })
    });
  },

  handleMessageChange: function(event) {
    this.setState({ message: event.target.value });
  },
  addChatMessage: function(event) {
    event.preventDefault();
    // create a new message;
    var message = new models.Message();

    // model.set(attributes, [options]); Set a hash of attributes (one or many) on the model.
    // do not have to set username; it is set when model is instantiated
    message.set({
      timestamp: new Date(),
      message: this.state.message
    });

    // send message to the server
    message.save();

    // show message in the DOM
    var messageCollection = this.state.messageCollection;

    // add message to messasgeCollection at index 0 (first object in the array)
    // message will appear under message input once user clicks 'Click to Post'
    messageCollection.add(message, { at: 0 });
    this.setState({ messageCollection })

},


  render() {
    return(
      <div>
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <input onChange={this.handleMessageChange} value={this.state.message} type="text" className="form-control" id="message" placeholder="Message" />
            <button onClick={this.addChatMessage}> Click to Post</button></div>
              <div className="chatroom-messages">
            <MessagesList username={this.props.username} messages={this.state.messageCollection}/>
            </div>
        </div>
        </div>
      </div>
    )
  }
});

var MessagesList = React.createClass({

  render(){
    var messages = this.props.messages.map(function(message){
      return(
        <li key={message.cid}>
          <span className="time">{message.get('timestamp')}:</span>
          <span>{message.get('username')}:</span>
          <span>{message.get('message')}</span>
        </li>
      )
    });
    return(
      <div>
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
});

  var LoginForm = React.createClass({
    getInitialState: function(){
      return { username: '' };
    },
    handleUsername: function(event){
      console.log('handle username firing', this.state);
      this.setState({ username: event.target.value });
    },
    saveUsername: function(event){
      event.preventDefault();
      //store username (saved as this.state.username) in localStorage
      localStorage.setItem('username', this.state.username);
      // calling navigate in order to update the URL
      // router was added to props in the router.js file
      this.props.router.navigate('messages/', { trigger:true });
    },
    render(){
      return(
        <div>
        <div className="chatroom">
             <h3 className="chatroomheader" > Welcome to Patrick's Chatroom </h3>
        </div>
        <div className="col-xs-12 col-md-6">
          <div className ="userinformation">
            <form onSubmit={this.saveUsername}>
              <div className = "form-group">
                <label id="usernamelabel" htmlFor="username"> Username: </label>
              <input onChange={this.handleUsername} value={ this.state.username } type="text" name="" placeholder="enter username" />
              </div>
              <input id="create-button" type="submit" className="btn btn-info" value="Next"/>
          </form>
          </div>
        </div>
        </div>
      )
    }
  });





module.exports = {
  MessagesContainer,
  LoginForm
}
