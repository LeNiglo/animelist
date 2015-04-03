# MySuperAnimeList

## Author

LeNiglo (lefrantguillaume@gmail.com)

http://lefrantguillaume.com

## Concept

Based on [myanimelist](http://myanimelist.net), this is a usefull service available on request only.
It allows you to list every anime and serie that your are looking at (or have seen).

The project is open source so you can read, learn, fork or deploy it.
To allow a user on this application, create a `users.js` file in the server folder and put something like :

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

## How ?

The big advantage of this service is its speed.
Built in [MeteorJS](http://meteor.com), it's very lightweight and fast.
Everything is build on the client so you don't have to be scared of your datas.

## Basics

You can add a (serie|anime) by simply filling the name !
It will be added to your wishlist (what you have to see) or you can specify a state (Running, Waiting, To See, Finished) and where you are in the show (Season, Episode).
You can setup your anime by choosing a custom picture from an external source.

[Here](http://puu.sh/gZY3T.png) is an example of the visual.

Multiple sorting and searching tools are included.
To customize the background of the application (not user by user), change de `public/img/back.png` file.
