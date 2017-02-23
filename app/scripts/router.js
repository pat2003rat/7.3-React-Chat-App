var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var Container = require('./components/chat.jsx').Container;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    ReactDOM.render(
      React.createElement(Container),
      document.getElementById('app')
    );
  }
});

var chatRouter = new Router();

module.exports = {
  chatRouter
};
