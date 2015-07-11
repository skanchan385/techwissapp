angular.module('core').controller('configController', function($scope) {
    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: '100%',
            editable: true,
            header:{
                left: 'month agendaWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            select: function (start, end, jsEvent, view) {
                alert(start + " " + end);
            },
            selectable: true
        }
    };
});
