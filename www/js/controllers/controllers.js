
define(function(require){
  'use strict';
  var services = require('services/services');
  var controllers = angular.module('starter.controllers', []);
  //controllers.controller('controller名字',require(对应的文件地址));
  //controllers.controller('MainCtrl',require('controllers/MainCtrl'));
  controllers.controller('CargoCtrl',require('controllers/CargoCtrl'));
  controllers.controller('CargoDetailCtrl',require('controllers/CargoDetailCtrl'));
  controllers.controller('LorryCtrl',require('controllers/LorryCtrl'));
  controllers.controller('LorryInfoCtrl',require('controllers/LorryInfoCtrl'));
  controllers.controller('OrderCtrl',require('controllers/OrderCtrl'));
  controllers.controller('UserCtrl',require('controllers/UserCtrl'));
  return controllers;
});
