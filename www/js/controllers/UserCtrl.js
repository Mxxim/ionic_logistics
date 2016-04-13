/**
 * Created by xiaomin on 2016/3/30.
 */

//angular.module('starter.userCtrl', [])
//
//  .controller('UserCtrl', function($scope) {
//
//
//    $scope.hello = "hello Sammy";
//  })

define([],function(){
  'use strict';
  function userCtrl($scope){
      console.log("toAdd");
    $scope.$on('$destroy',function(){
      console.log("------userCtrl销毁页面-------");
    })
  }

  return userCtrl;
});
