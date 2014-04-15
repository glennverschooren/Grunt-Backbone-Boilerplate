
//
// BACKBONE BASIC COLLECTION -----------------------------
// A collection is a list of items 
// Every item in a collection is set by one model
//

define([
   
    'backbone'
    
  ],function( Backbone, App, Strings, Variable){

    var collection = Backbone.Collection.extend({
        model: Variable,



    });
    
      return collection;
});
  

	
