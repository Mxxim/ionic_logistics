/**
 * Created by sammy on 2016/5/8.
 */

/**
 * Created by xiaomin on 2016/3/30.
 */


define([],function(){
  'use strict';
  function cargoDetailCtrl($scope,$rootScope,$ionicPopup,$ionicLoading,$timeout,$state,$stateParams,storageService,cargoService,ENV ){

    console.log("---------------enter cargoDetailCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoDetailCtrl销毁-------------------");
    })

    //**************初始化*******************
    //var storageKey = "driver";
    var _this = this;
    _this.cargo = {};


    $rootScope.hideTabs = ' ';
    //$rootScope.api = ENV.api;


    // 根据ID得到该条货源详情
    cargoService.getById($stateParams.cid).then(function(res){
        console.log(res);
      if(res.code == 1){
        _this.cargo = res.cargo;
      }
    },function(err){
      console.log(err);
    });

    _this.showPopup = function(obj){

      //$scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<a href="tel:'+_this.cargo.user.username+'"><button class="button button-outline button-positive" ng-click="cargoDetail.closePopup()">确定(拨号)</button></a>',
        title: '请确认运单信息',
        subTitle: '点击确定后将自动拨通货主号码',
        scope: $scope,
        buttons: [
          { text: '取消' },
          {
            text: '<a href="#/menu/tabs/cargo">确定(拨号)</a>',
            type: 'button-positive',
            onTap: function(e) {
              //if (!$scope.data.wifi) {
              //  //don't allow the user to close unless he enters wifi password
              //  e.preventDefault();
              //} else {
              //  return $scope.data.wifi;
              //}
              console.log("--------onTap-----------");
              e.preventDefault();
              $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
              }, 3000);
            }
          }
        ]
      });

      _this.closePopup = function(){
        //$timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go("menu.order");
        //}, 3000);
      }
      //myPopup.then(function(res) {
      //  console.log('Tapped!', res);
      //});



      //
      //var confirmPopup = $ionicPopup.confirm({
      //  title: '请确认运单信息',
      //   subTitle: '点击确定后将自动拨通货主号码',
      //  okText:'<a href="tel:13726935307">确定(拨号)</a>',
      //  cancelText:'取消',
      //  template: '<div>货品信息：{{cargo.hello}}</div>'
      //});
      //
      //confirmPopup.then(function(res) {
      //  if(res) {
      //    console.log('You are sure');
      //  } else {
      //    console.log('You are not sure');
      //  }
      //});
    }
  }

  return cargoDetailCtrl;
});
