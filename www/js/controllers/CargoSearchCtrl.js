/**
 * Created by sammy on 2016/5/12.
 */

define([],function(){
  'use strict';
  function cargoSearchCtrl($scope,$state,cargoService){

    console.log("---------------enter cargoSearchCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoSearchCtrl销毁-------------------");
    })


    //*************初始化******************
    var _this = this;
    _this.lorryLength = [3,3.6,4,4.2,4.8,5,5.2,5.8,6.2,6.5,6.8,7.2,7.6,7.8,8,8.6,9.6,10,11.5,12,13,13.5,
      15,16,16.5,17,17.5,18.5,20,21,22];
    _this.lorryType = ['平板车','高栏车','集装车','厢式车','半封闭','单桥车','双轿车','冷藏车','轿车运输车','特种车','大件车','危险品车','封闭车',
      '半挂车','商品运输车','挂车','爬梯车','可拼车','低栏车','半挂一拖二','半挂一拖三','半挂二拖二','半挂二拖三','前四后四','前四后六',
      '前四后八','前四后十','五轮车','后八轮','罐式车','自卸车','棉被车','其他'];
    _this.condition = {
      from:"",
      to:"",
      dateTime:"",
      lorryType:"",
      lorryLength:""
    };

    _this.search = function(from,to,dateTime){
      _this.condition.from = from;
      _this.condition.to = to;
      console.log(dateTime);
      if(dateTime.year!= ""){
        _this.condition.dateTime = dateTime.year + "-" + dateTime.month + "-" + dateTime.day;
      }else{
        _this.condition.dateTime = "";
      }
      console.log(_this.condition);
      $state.go("menu.tabs.cargoList",{query:_this.condition});
    }

    if($state.name == "menu.tabs.cargoList"){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      _this.cargos = [];
      cargoService.query(_this.condition).then(function(res){
          console.log(res);
        if(res.code == 1){
          _this.cargos = res.cargos;
        }
      },function(err){
        console.log(err);
      });
    }
  }

  return cargoSearchCtrl;

});
