define(function(require){
  'use strict';
  var services = angular.module('starter.services', ['ngResource']);
  services.factory('storageService',require('services/StorageService'));
  //controllers.controller('controller名字',require(对应的文件地址));
  //services.factory('cargoService',require('services/cargoService'));
  services.factory('LorryService',require('services/LorryService'));
  services.factory('userService',require('services/userService'));
  return services;
});
