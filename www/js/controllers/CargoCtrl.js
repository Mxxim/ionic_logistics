/**
 * Created by xiaomin on 2016/3/30.
 */

//angular.module('starter.cargoCtrl', [])
//
//  .controller('CargoCtrl', function($scope) {
//
//    console.log("------货源-------");
//    $scope.hello = "hello Sammy";
//  })

define([],function(){
  'use strict';
  function cargoCtrl($scope,$rootScope ){
    // 原来是使用$scope.cargo={}
    // $scope.doSomething = function (){}
    this.cargo = {};
    // resolved!
    //this.something  = cargoService.something;
    $rootScope.hideTabs = ' ';
    console.log("------货源-------");
    $scope.$on('$destroy',function(){
      console.log("------cargoCtrl销毁页面-------");
    })
  }
  // create the resolved property
  //cargoCtrl.resolve = {
  //  doSomething: function(cargoService){
  //    return cargoService.doSomething();
  //  }
  //}

  return cargoCtrl;
});
