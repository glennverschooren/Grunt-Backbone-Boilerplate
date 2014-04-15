define([

    'backbone',
    'router',
    'socket',
    'app',

    'utils/handlebars-helpers',
    '../config'


], function(Backbone, Router, Socket, App) {

    'use strict';


    //
    // PREPARE FOR LIFT-OFF --------------------------------------------------
    // Define some app-wide stuff & last preparations before initializing
    // the app here (eg. get preferences from cookie, resize event, ...)
    //



  
    

    //
    // COPY CONFIG -----------------------------------------------------------
    // Copy server settings to the App.Object
    //

    App.SERVER = Config.SERVER;


    //
    // FETCH API DATA --------------------------------------------------------
    // These are some examples of how to make API-calls
    // and should be moved to controllers where they are needed
    //
    // Also todo: client-side caching (eg localStorage)
    // to minimize the amount of API-calls
    //

    //Socket.getVariables();

    

    //
    // CHECK LOGIN STATUS ----------------------------------------------------
    // Pass a unique user token with each Ajax request, if the request
    // returns '401 Unauthorized' the user is not/no longer logged in
    // In that case we re-direct to the login-view
    //

    //$(document).ajaxError(function(event, request) {
    //  if(request.status === 401 && Backbone.history.fragment.split('/')[0] !== 'login') {
    //      App.ROUTER.navigate('#/login', true);
    //  }
    //});


    // START ROUTER ----------------------------------------------------------
    //

    App.ROUTER = new Router();
    Backbone.history.start();

});