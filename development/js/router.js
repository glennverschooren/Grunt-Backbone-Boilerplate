define([

	'backbone',
	'app',

	


], function(Backbone, App) {

	'use strict';


	//
	// SETUP A ROUTER --------------------------------------------------------
	//
	// ROUTE EXAMPLES 
	// =======================================================================
	//
	//   'dashboard(/)'               			: 'dashboard',
    //   'dna/:id(/:view)(/)'         			: 'dna',
    //   'sets(/:id)(/:view)(/)'      			: 'sets',
    //   'metrics(/:id)(/:view)(/)' 			: 'metrics',
    //   'alerts(/:id)(/:view)(/)'    			: 'alerts',
    //   'configuration(/)(:view)(/)'			: 'configuration',
    //   'configuration(/)(:view)(/:id)(/)'		: 'configurationedit',



	var Router = Backbone.Router.extend({



		history : [],
		routes: {

            ''                           			: 'root',
            '*actions'                   			: 'error'

		},


		//
		// INITIALIZE --------------------------------------------------------
		//

		initialize: function() {

			

		},


		//
		// ROUTE: ROOT -------------------------------------------------------
		//

        root: function() {

        	console.log('run this root');
         
        },


        //
		// ROUTE: 404 --------------------------------------------------------
        //

        error: function() {

          

        },









        // 
        // CREATE VIEW IN ROUTE EXAMPLES --------------------------------------
        // 
        // Normal call -> this.create('dashboard', DashboardView);
        //		First paramater		: The name of the view you create
        //		Second parameter 	: The view instance 
        //
        // Call with childviews ->  this.create('dna', DNAView, { subview: subview || 'dna', origin: '#/dna/'+ id +'/', id: id });
        // 		


        //
		// UTILITY: CREATE VIEWS ---------------------------------------------
		// Unbind & auto-close the current view
		// Re-use views to avoid 'zombie-views', for this we need
		// to delegate events again before rendering the view
		// Update navigation when done
		//

		create: function(key, View, options) {

			this.update(options);

			App.currentView !== App.VIEWS[key] && this.validate('current') && this.clean(App.currentView);
			App.currentView = App.VIEWS[key] = App.VIEWS[key] || new View();
			App.currentView.delegateEvents();

			// Only render the view if:
			// - previous view is not a settings-view (user-settings || application-setting)
			// - current view has no options (if it's an overview-view)
			// - but is different from the view before the settings-view
			(this.validate('previous') ||
			(!this.validate('previous') && !this.validate('current')) ||
			!!options || (this.history[0] !== this.history[2])) && 
			App.currentView.render(options);

		},


		//
		// UTILITY: CLEAN VIEWS ----------------------------------------------
		// Use unbind & undelegate to clean up views after removing/hiding
		// Call the hide-method on the removed view (for additional cleaning) 
		// if such a method is provided by the view
		//

		clean: function(view) {

			if(view) {

				view.unbind();
				view.undelegateEvents();
				view.hide && view.hide();

			}

		},


		//
		// UTILITY: UPDATE NAVIGATION & HISTORY ------------------------------
		// Update navigation by calling navigation:update
		// passing on the current view (Backbone.history.fragment)
		//

		update: function(options) {
			
			if(!Backbone.history.fragment) return;

			var data = {};
			var current = Backbone.history.fragment.split('/')[0];

			if(options){
				
				data.activeItem = current;
				data.subview = options.subview;

				Backbone.Events.trigger('navigation:update', data);


			}else {
				
				data.activeItem = current
				Backbone.Events.trigger('navigation:update', data);
			}
			

		

			// Keep track of history by adding the current
			// fragment to the front of the history array
			// To prevent the array of becoming too big,
			// keep track of the last 20 items
			this.history.unshift(Backbone.history.fragment.replace(/\/?$/, '/'));
			this.history = this.history.slice(0, 20);

		},


		//
		// UTILITY: FIND TOGGLE ROUTE FOR SETTINGS-VIEW ----------------------
		// Find the nearest route, which isn't a subview, 
        // to go back to after the settings-view is closed
        // If there's no valid route, provide a fallback
		//

		toggleRoute: function() {

        	var route = _.find(this.history, function(route){ 
        		return route !== 'me' && 
        		       route !== 'me/' && 
        		       route !== 'settings' && 
        		       route !== 'settings/'; 
        	});

        	// Clean trailing slashes and add #/ 
        	// http://stackoverflow.com/a/11531417
        	route && (route = '#/'+ route.replace(/\/?$/, '/'));

        	// Fallback to dashboard if invalid
        	return route || '#/dashboard/';

		},


		//
		// UTILITY: CHECK IF A (PREVIOUS) ROUTE IS EXCLUDED ------------------
		// Exclude certain routes from triggering a render, update, ...
        // This utility checks if a route has been excluded
		//

		validate: function(index) {

			index === 'previous' && (index = 1);
			index === 'current' && (index = 0);

			return this.history &&
			       this.history[index] !== 'me' &&
			       this.history[index] !== 'me/' &&
			       this.history[index] !== 'settings' &&
			       this.history[index] !== 'settings/';

		}


	});


	return Router;


});