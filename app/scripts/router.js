var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var MessagesContainer = require('./components/chat.jsx').MessagesContainer;
var LoginForm = require('./components/chat.jsx').LoginForm;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'messages/': 'messages'

  },


  index: function(){
    ReactDOM.render(
      // add router to this.props
      React.createElement(LoginForm, { router: this }),
      document.getElementById('app')
    );
  },

  messages: function(){
    ReactDOM.render(
      React.createElement(MessagesContainer),
      document.getElementById('app')
    )
  }
});

var chatRouter = new Router();

module.exports = {
  chatRouter
};
