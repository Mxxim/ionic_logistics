/**
 * Created by sammy on 2016/5/9.
 */

/**
 * Created by sammy on 2016/4/6.
 */
define([],function(){
  'use strict';
  function lorryAddCtrl($scope,$rootScope,$ionicLoading,$ionicActionSheet,$state,storageService,LorryService){

    console.log("---------------enter lorryAddCtrl-------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------lorryAddCtrl销毁-------------------");
    })


    //*************初始化******************
    var storageKey = "driver";
    var _this = this;
    _this.lorrys = [];
    _this.lorry = {
      userID:"",
      number:"",
      load:"",
      space:"",
      lorryLength:"",
      lorryType:"",
      images:{
        frontImg:"",
        sideImg:"",
        backImg:"",
        carIDImg:""
      }
    };
    _this.lorryLength = [3,3.6,4,4.2,4.8,5,5.2,5.8,6.2,6.5,6.8,7.2,7.6,7.8,8,8.6,9.6,10,11.5,12,13,13.5,
      15,16,16.5,17,17.5,18.5,20,21,22];
    _this.lorryType = ['平板车','高栏车','集装车','厢式车','半封闭','单桥车','双轿车','冷藏车','轿车运输车','特种车','大件车','危险品车','封闭车',
      '半挂车','商品运输车','挂车','爬梯车','可拼车','低栏车','半挂一拖二','半挂一拖三','半挂二拖二','半挂二拖三','前四后四','前四后六',
      '前四后八','前四后十','五轮车','后八轮','罐式车','自卸车','棉被车','其他'];

    $rootScope.hideTabs = ' ';

    var user = storageService.get(storageKey);

    //  定义上拉菜单的样式与操作
    _this.showActionSheet = function(type){
      _this.hideSheet = $ionicActionSheet.show({
        buttons:[
          {
            text:"拍照"
          },
          {
            text:"从相册中选择"
          }
        ],
        buttonClicked:function(index){
          _this.addImage(index,type);
        },
        cancelText:"取消",
        cancel:function(){
          console.log("您执行了取消操作");
          return true;
        }
      });
    }

    // 相机或图库
    _this.addImage = function(index,type){
      _this.hideSheet();
      LorryService.saveImage(index).then(function(theImage){
        switch(type){
          // 车头照片
          case 0:
            console.log("--------------0--------------");
            //_this.image.IDCard = theImage;
            _this.lorry.images.frontImg = "data:image/jpeg;base64,"+theImage;
            break;
          //  45度照片
          case 1:
            console.log("--------------1--------------");
            _this.lorry.images.sideImg = "data:image/jpeg;base64,"+theImage;
            break;
          // 车尾照片
          case 2:
            console.log("--------------2--------------");
            _this.lorry.images.backImg = "data:image/jpeg;base64,"+theImage;
            break;
          // 车辆驾驶证照片
          case 3:
            console.log("--------------3--------------");
            _this.lorry.images.carIDImg = "data:image/jpeg;base64,"+theImage;
            break;
        }
      },function(e){
        console.log("error: "+e);
      });
    }

    // 添加车辆
    _this.addLorry = function(lorry){
      _this.lorry.userID = user.id;
      LorryService.addLorry(lorry).then(function(res){
        $ionicLoading.show({
          noBackdrop: true,
          template: res.message,
          duration: 1500
        });
        if(res.code == 1){
          $state.go("menu.lorry");
        }

      },function(err){
        console.log(err);
      });
    }
  }

  return lorryAddCtrl;

});
