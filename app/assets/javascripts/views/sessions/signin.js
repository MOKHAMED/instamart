Instamart.Views.SignIn = Backbone.View.extend({

  initialize: function(options){
    this.callback = options.callback;
    this.listenTo(Instamart.currentUser, "signIn", this.signInCallback);
  },

  events: {
    "submit form": "submit"
  },

  template: JST['sessions/signin'],

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;

    Instamart.currentUser.signIn({
      email: formData.email,
      password: formData.password,
      error: function(data){
        this.$el.find('form.new_user').prepend('<div class="alert alert-error" style="text-align: left;"><ul><li>You fucked up!</li></ul></div>');
        console.log(data);
      }.bind(this)
    });
  },

  signInCallback: function(event){
    if(this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", { trigger: true });
    }
  }

});