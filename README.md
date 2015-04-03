# MySuperAnimeList

## Author

LeNiglo (lefrantguillaume@gmail.com)

http://lefrantguillaume.com

## Concept

Based on [myanimelist](http://myanimelist.net), this is a usefull service available on request only.
It allows you to list every anime and serie that your are looking at (or have seen).

The project is open source so you can read, learn and fork it.
To allow a user on this application, create a file in the server folder and put something like :

```
Meteor.startup(function() {
  var users = [{
    username: 'Rocky',
    password: 'balboa75',
    email: 'rocky.balboa@gmail.com',
    profile: {
      name: 'Rocky Balboa'
    }
  }];

  if (Meteor.users.find().count() < users.length) {
    users.forEach(function(e) {
      Accounts.createUser(e);
    });
  }
});

```
