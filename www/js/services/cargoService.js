/**
 * Created by sammy on 2016/4/8.
 */

function cargoService(){

  var cargoService = {};

  cargoService.someValue = '';
  cargoService.someMethod = function(){};

  return cargoService;
}

angular.module('starter.cargoService', [])

  .factory('cargoService',cargoService );
