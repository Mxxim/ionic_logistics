/**
 * Created by sammy on 2016/4/8.
 */

define([],function(){
  'use strict';

  function cargoService($q,$resource,ENV){

    var getList = function(){
      return $q(function(resolve,reject){


        $resource(ENV.api+ENV.interface.getList, {}, {
          getAll: {
            method: 'get'
          }
        }).getAll({},function(res){
            resolve(res);
        });
      });
    };

    var getById = function(cid){
      return $q(function(resolve,reject){


        $resource(ENV.api+ENV.interface.getCargoById, {}, {
          get: {
            method: 'post'
          }
        }).get({
          cid:cid
        },function(res){
          resolve(res);
        });
      });
    };


    return{
      getList:getList,
      getById:getById
    }
  }

  return cargoService;

});
