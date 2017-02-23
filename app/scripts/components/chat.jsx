var React = require('react');

var models = require('../models/message');

var Container = React.createClass({
    getInitialState: function(){
      var self = this;
      var messageCollection = new models.MessageCollection();
      messageCollection.fetch().done(function(){
        self.setState({ messageCollection: messageCollection })
      });

      return {
        messageCollection
      };
    }, 
    render() {
      return(
        <div className='container'>
          <div className="row">
            <div className='col-md-12'>
              <Form addMessage={this.addMessage}/>
              <List messages={this.state.messageCollection}/>
            </div>
          </div>
        </div>
      )
    }
  });

  var Form = React.createClass({
    getInitialState: function(){
      var state = {
        message: ''
      };
      return state

    },

    newMessage: function(event){
      event.preventDefault();

      console.log('newMessage');

    },

    updateMessage: function(event){
      this.setState({message: event.target.value});
    },

    render(){
      return(
        <form onSubmit={this.newMessage} className="top-form" action="index.html" method="post">
          <input type="text" name="" value="" placeholder="enter username" />
          <textarea onChange={this.updateMessage} value={this.state.message} name="" id="" rows="3" placeholder="enter message"></textarea>
          <button className="btn btn-primary" type="submit">Add Message</button>
        </form>
      )
    }
  });

  var List = React.createClass({

    render(){
      var messages = this.props.messages.map(function(message){
        return(
          <li key={message.cid}>
            <span>{message.get('username')}</span>
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

module.exports = {
  Container
}
