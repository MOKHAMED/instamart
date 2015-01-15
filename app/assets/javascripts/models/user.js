Instamart.Models.User = Backbone.Model.extend({
  urlRoot: "users",

  fullName: function(){
    return this.escape("fname") + " " + this.escape("lname");
  },

  toJSON: function(){
    var json = { user: _.clone(this.attributes) };
    return json;
  }
});

Instamart.Models.CurrentUser = Instamart.Models.User.extend({

  url: "session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
      console.log("currentUser is signed in!", this);
      Backbone.history.navigate('', {trigger: true});
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
      Backbone.history.navigate('', {trigger: true});
    }
  }

});
