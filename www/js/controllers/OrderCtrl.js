/**
 * Created by sammy on 2016/4/17.
 */

define([],function(){
  'use strict';
  function orderCtrl($scope,$rootScope,$state ){

    var _this = this;
    _this.order = {};

    //$rootScope.hideTabs = ' ';
    console.log("------运单-------");
    $scope.$on('$destroy',function(){
      console.log("------orderCtrl销毁页面-------");
    })

    _this.toDetail = function(){
      console.log("toDetail");
      //$state.go("menu.orderDetail");
      $state.go("menu.tabs.orderDetail");
    }

  }

  return orderCtrl;
});
