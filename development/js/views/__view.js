
//
// BACBONE VIEW ---------------------------------------------------------
// A Backbone view is used for all DOM interactions with the user
//


define([

	'backbone',
	'handlebars'

	//'text!templates/'

], function(Backbone, Handlebars, Template) {

	'use strict';


	var View = Backbone.View.extend({


		//
		// INITIALIZE --------------------------------------------------
		// Pre-compile template
		//

		initialize: function() {
			
			this.template = Handlebars.compile(Template);

		},


		//
		// RENDER TEMPLATE ---------------------------------------------
		// Render base template
		//

		render: function() {

			this.$el.hide().html(this.template).fadeIn(150);
	
		}


	});


	return View;


});