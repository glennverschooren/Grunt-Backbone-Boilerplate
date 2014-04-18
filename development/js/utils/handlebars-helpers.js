//
// GLOBAL HANDLEBARS HELPERS -------------------------------------------
// Global Handlebars utility helpers for templating
//

define([

	'handlebars',
	'utils/client-detection'

], function(Handlebars, Client) {

	'use strict';


    //
    // LOOP HELPERS ---------------------------------------------------
    //


    Handlebars.registerHelper('eachProperty', function(context, options) {
        var ret = "";
        for(var prop in context)
        {
            ret = ret + options.fn({property:prop,value:context[prop]});
        }
        return ret;
    });


/*
	//
	// DEVICE DETECTION ------------------------------------------------
	//

	Handlebars.registerHelper('onTabletAndDesktop', function(options) {
        if(!Client.isSmartPhone) return options.fn(this);
        else return options.inverse(this);
    });


    Handlebars.registerHelper('onSmartphone', function(options) {
        if(Client.isSmartPhone) return options.fn(this);
        else return options.inverse(this);
    });


    Handlebars.registerHelper('onIpad', function(options) {
        if(Client.isIpad) return options.fn(this);
        else return options.inverse(this);
    });


    //
	// FEATURE DETECTION -----------------------------------------------
	//

	Handlebars.registerHelper('hasFullscreenSupport', function(options) {
        if(Client.isDesktop && Fullscreen.isSupported) return options.fn(this);
        else return options.inverse(this);
    });

    Handlebars.registerHelper('hasBackgroundSizeSupport', function(options) {
        if(Client.cssBGSize) return options.fn(this);
        else return options.inverse(this);
    });
*/






});