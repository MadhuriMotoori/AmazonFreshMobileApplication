'use strict';

angular.module('routerApp')

        .service('signupDetailsService', function() {
        	var details ={};
        	
        	this.setDetails = function(value){
        		details = value;
        	}
            this.getDetails = function(){  
                return details;
            };
        })
        
;