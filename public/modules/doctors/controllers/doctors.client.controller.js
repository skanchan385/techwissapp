'use strict';

// Doctors controller
angular.module('doctors').controller('DoctorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Doctors',
	function($scope, $stateParams, $location, Authentication, Doctors) {
		$scope.authentication = Authentication;

		// Create new Doctor
		$scope.create = function() {
			// Create new Doctor object
			var doctor = new Doctors ({
				name: this.name,
				location: this.location,
				qualification: this.qualification,
				speciality: this.speciality,
				description: this.description,
				availability: this.availability,
				time_zone: this.time_zone,
				links: this.links
			});

			// Redirect after save
			doctor.$save(function(response) {
				$location.path('doctors/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Doctor
		$scope.remove = function(doctor) {
			if ( doctor ) { 
				doctor.$remove();

				for (var i in $scope.doctors) {
					if ($scope.doctors [i] === doctor) {
						$scope.doctors.splice(i, 1);
					}
				}
			} else {
				$scope.doctor.$remove(function() {
					$location.path('doctors');
				});
			}
		};

		// Update existing Doctor
		$scope.update = function() {
			var doctor = $scope.doctor;

			doctor.$update(function() {
				$location.path('doctors/' + doctor._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Doctors
		$scope.find = function() {
			$scope.doctors = Doctors.query();
		};

		// Find existing Doctor
		$scope.findOne = function() {
			$scope.doctor = Doctors.get({ 
				doctorId: $stateParams.doctorId
			});
		};
	}
]);
