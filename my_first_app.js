count = new Number(0);
RSVP = new Meteor.Collection('RSVP');

var getCurrentEmail = function() {
  return Meteor.user() && 
    Meteor.user().emails &&
    Meteor.user().emails[0].address;
};

if (Meteor.isClient) {
  Template.RSVP.greeting = function () {
    return "Would you like to go to the event?";
  };

  Template.RSVP.allRSVP = function() {
    return RSVP.find();
  };

 // Template.RSVP.results = function() {
 //    return count;
 //  };

  Template.RSVP.userId = function() {
    console.log(Meteor.userId());
    return Meteor.userId();
  };

  Template.RSVP.rule1 = function(name) {
    if (name === "jing" || name === "Jing") {
      return "join Jing!";
      //console.log("join Jing!");
    };
  }

  Template.RSVP.rule2 = function(name) {
    if (name === "a" ) {
      return "join everybody!";
    };
  }

  Template.RSVP.rule3 = function(email) {
    if (email === getCurrentEmail()) {
      return "self!";
    };
  }

  Template.RSVP.events({
    'click #RSVPyes': function (evt, templ) {
      // template data, if any, is available in 'this'
      var name = templ.find("#name").value;
      var email = getCurrentEmail();
      if (!RSVP.find(email)) {
        RSVP.insert({name: name, 
                      email: email
                    });
      };
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
