var Backbone = require('backbone');

var Message = Backbone.Model.extend({
  idAttribute: '_id',
  // added urlRoot so I can save a model without adding it to a collection first
  urlRoot: 'https://tiny-lasagna-server.herokuapp.com/collections/messages',
  defaults: {
    /* //get username from localStorage /*/
    username: localStorage.getItem('username')
  }
});

var MessageCollection = Backbone.Collection.extend({
  model: Message,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/messages',
  // sort the collection in descending order by timestamp
  comparator: function(message) {
    return -message.timestamp;
  }
});

module.exports = {
  Message,
  MessageCollection
}
