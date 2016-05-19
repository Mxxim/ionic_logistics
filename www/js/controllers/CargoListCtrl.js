/**
 * Created by sammy on 2016/5/13.
 */
/**
 * Created by sammy on 2016/5/12.
 */

define([],function(){
  'use strict';
  function cargoListCtrl($scope,$state,$stateParams,$timeout,cargoService){



    //*************初始化******************
    var _this = this;
    var timer;
    _this.showloading = true;
    _this.cargos = [];

    console.log("---------------enter cargoListCtrl-------------------");
    $scope.$on('$destroy',function(){
      $timeout.cancel(timer);
      console.log("---------------cargoListCtrl销毁-------------------");
    });

      cargoService.query($stateParams.query,false).then(function(res){
        console.log(res);
        if(res.code == 1){
          timer = $timeout(
            function() {
              _this.showloading = false;
            },
            1000
          );
          _this.cargos = res.cargos;
        }
      },function(err){
        console.log(err);
      });
  }

  return cargoListCtrl;

});
