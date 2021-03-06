'use strict';
angular.module('doctors')
    .filter('doctorSpecialityFilter', function() {
        return function(doctors, term) {
            var list = [];
            angular.forEach(doctors, function (val, ind) {
                if(val.speciality.toLowerCase().indexOf(term.toLowerCase()) > 0) {
                    list.push(val);
                }
            });
            return list;
        };
    });
