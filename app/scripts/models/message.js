var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    message: ''
  }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages'
});

module.exports = {
  Message,
  MessageCollection
}
