'use strict';

// Declare app level module which depends on views, and components
var makeCsvApp = angular.module('makeCsv', [
  'ngSanitize',
  'ngCsv'
]);

makeCsvApp.controller('makeCsvCtrl', 
    ['$scope', '$log',
    function($scope, $log) {
  var charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

  var mkPw = function(len) {
    var pw = '';
    for (var i=0; i<len; i++) {
      pw += charlist.charAt(Math.floor(Math.random()*charlist.length));
    }
    return pw
  }

  var getUser = function() {
    var user = {
      'Username*': null,
      'Password': mkPw(10),
      'First Name*': null,
      'Last Name*': null,
      'GroupID': 'Blend Labs Inc.',
      'Security Type*': 'Basic',
      'Email Address*': null,
      'User Role': 'Basic Access',
      'User Message Type': 'Email'
    }
    return user;
  };

  var allFields = [
    'Username*',
    'Password',
    'First Name*',
    'Last Name*',
    'GroupID',
    'Security Type*',
    'Email Address*',
    'User Role',
    'User Message Type'
  ];

  $scope.fields = [
    'Email Address*',
    'Last Name*',
    'First Name*',
    'Username*'
  ];

  $scope.users = [
    getUser()
  ];


  $scope.addUserRow = function() {
    $scope.users.push(getUser());
  };

  $scope.changed = function(index, field) {
    $log.info('%s.%s changed to %s. username is dirty: %s', 
        index, 
        field, 
        $scope.users[index][field],     
        $scope.answerForm['0.Username*'].$dirty
    );

    if (field == 'Email Address*') {
      var email = $scope.users[index]['Email Address*'];
      if (email.indexOf('@')) {
        var name = email.split('@')[0];
        if (! $scope.answerForm[index + '.Username*'].$dirty) {
          $scope.users[index]['Username*'] = name;
        }
        if (! $scope.answerForm[index + '.First Name*'].$dirty) {
          $scope.users[index]['First Name*'] = name.charAt(0).toUpperCase() + name.slice(1);
        }
      }
    }

    if (field == 'Last Name*' || field == 'First Name*') {
      var name = $scope.users[index][field];
      $scope.users[index][field] = name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  $scope.getArray = function () {
    var usersArray = [angular.copy(allFields)];
    for (var i=0; i < $scope.users.length; i++) {
      var userArray = [];
      for (var j=0; j < allFields.length; j++) {
        userArray.push($scope.users[i][allFields[j]]);
      }
      usersArray.push(userArray);
    }
    return usersArray;
  };

}]);
