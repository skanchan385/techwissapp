'use strict';

angular.module('doctors').controller('DoctorsController', ['$timeout', '$scope', '$stateParams', '$location', 'Authentication', 'Doctors', '$rootScope',
	function($timeout, $scope, $stateParams, $location, Authentication, Doctors, $rootScope) {
		$scope.authentication = Authentication;

		$scope.timeZone = $rootScope.defaultTimeZone;
		$scope.eventSources = [];

		$scope.rate = 4;
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);

		};


		$scope.create = function(createDoctorForm) {
			angular.forEach(createDoctorForm.$error.required, function(field) {
				if(!field.$valid) {
					field.$setViewValue(field.$viewValue);
				}
			});
			if(createDoctorForm.$valid) {
				// Create new Doctor object
				var doctor = new Doctors ({
					name: this.name,
					location: this.location,
					qualification: this.qualification,
					speciality: this.speciality,
					description: this.description,
					availability: this.availability,
					timeZone: this.timeZone,
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
			}
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
