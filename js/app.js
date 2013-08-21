(function() {
"use strict";

window.App = Ember.Application.create();


// ROUTES
App.Router.map(function() {
    this.resource("album", { path: "album/:album_id"});
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.ALBUM_FIXTURES;
    }
});

App.AlbumRoute = Ember.Route.extend({
    model: function(params) {
        return App.ALBUM_FIXTURES.findProperty("id", params.album_id);
    },
    events: {
        play: function(song) {
            this.controllerFor("nowPlaying").set("model", song);
        }
    }
});


// MODELS
App.Album = Ember.Object.extend({
    totalDuration: function() {
        return this.get("songs").reduce(function(totalDuration, song) {
            return totalDuration + song.get("duration");
        }, 0);
    }.property("songs.@each.duration")
});

App.Song = Ember.Object.extend({});


// CONTROLLERS
App.NowPlayingController = Ember.ObjectController.extend();


// COMPONENTS
App.AudioPlayerComponent = Ember.Component.extend({
    classNames: ["audio-control"]
});


// HELPERS
Ember.Handlebars.helper("format-duration", function(value, options) {
    var min = Math.floor(value / 60);
    var secRaw = value % 60;
    var sec = (secRaw < 10)? "0" + secRaw: secRaw;
    return min + ":" + sec;
});

})();
