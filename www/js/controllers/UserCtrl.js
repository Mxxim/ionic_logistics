/**
 * Created by xiaomin on 2016/3/30.
 */

//angular.module('starter.userCtrl', [])
//
//  .controller('UserCtrl', function($scope) {
//
//
//    $scope.hello = "hello Sammy";
//  })

define([],function(){
  'use strict';
  function userCtrl($scope,$ionicLoading,$state,$ionicActionSheet,$rootScope,$cordovaFileTransfer,storageService,userService,ENV){

    var _this =this;
    var storageKey = "driver";

    _this.user = {
      username:"",
      password:"",
      re_password:"",
      type:""
    };

    // 调试——控制台输出
    console.log("------enter userCtrl-------");
    $scope.$on('$destroy',function(){
      console.log("------userCtrl销毁页面-------");
    });


    // 用户登录
    _this.signin = function(type){
      userService.signin(_this.user.username,_this.user.password,type)
        .then(function(res){
          console.log(res);
          if(res.code != 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 1500
            });
          }else{
            storageService.set(storageKey,res.user);
            $rootScope.userInfo = storageService.get(storageKey);
            $state.go('menu.tabs.cargo');  //路由跳转
          }

        },function(res){
          $ionicLoading.show({
            noBackdrop: true,
            template: res.message,
            duration: 1500
          });
        });
    }

    // 退出登录
    _this.logout = function(){
      // 在安卓端下显示不正常，注释ionic.css代码
      // Show the action sheet
      $ionicActionSheet.show({
        destructiveText: '退出登录',
        titleText: '确定退出当前登录账号么？',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        destructiveButtonClicked: function() {
          storageService.remove(storageKey);
          $rootScope.userInfo = storageService.get(storageKey);
          $state.go('menu.tabs.cargo');
          return true;
        }
      });
    }

    // 用户注册
    _this.signup = function(type){
      _this.user.type = type;
      userService.signup(_this.user)
        .then(function(res){
          console.log(res);
          if(res.code != 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 1500
            });
          }else{
            $state.go('menu.login');  //路由跳转
          }

        },function(res){
          $ionicLoading.show({
            noBackdrop: true,
            template: res.message,
            duration: 1500
          });
        });
    }

    _this.image =
      {IDCard:"",
      IDCardBack:"",
      userImage:"",
      carCard:""};
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
          //switch(index){
            //case 0:
              _this.addImage(index,type);
              //break;
            //case 1:
            //  _this.addImageFromLib(type);
              //break;
          //}
          return true;
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
      userService.saveImage(index).then(function(theImage){
        switch(type){
          // 身份证正面
          case 0:
            console.log("--------------0--------------");
            //_this.image.IDCard = theImage;
            _this.image.IDCard = "data:image/jpeg;base64,"+theImage;
            break;
          //  身份证背面
          case 1:
            console.log("--------------1--------------");
            _this.image.IDCardBack = "data:image/jpeg;base64,"+theImage;
            break;
          // 个人近照
          case 2:
            console.log("--------------2--------------");
            _this.image.userImage = "data:image/jpeg;base64,"+theImage;
            break;
          // 驾驶证照
          case 3:
            console.log("--------------3--------------");
            _this.image.carCard = "data:image/jpeg;base64,"+theImage;
            break;
        }
      },function(e){
        console.log("error: "+e);
      });
    }
    //// 图库
    //_this.addImageFromLib = function(type){
    //  console.log("------------图库------------");
    //  _this.hideSheet();
    //  userService.saveFromLib().then(function(theImage){
    //    switch(type){
    //      // 身份证正面
    //      case 1:
    //        console.log("--------------1--------------");
    //        _this.image.IDCard = "data:image/jpeg;base64,"+theImage;
    //        break;
    //      //  身份证背面
    //      case 2:
    //        console.log("--------------2--------------");
    //        _this.image.IDCardBack = "data:image/jpeg;base64,"+theImage;
    //        break;
    //      // 个人近照
    //      case 3:
    //        console.log("--------------3--------------");
    //        _this.image.userImage = "data:image/jpeg;base64,"+theImage;
    //        break;
    //      // 驾驶证照
    //      case 4:
    //        console.log("--------------4--------------");
    //        _this.image.carCard = "data:image/jpeg;base64,"+theImage;
    //        break;
    //    }
    //  },function(e){
    //    console.log("error: "+e);
    //  });
    //}

    // 用户认证
    _this.authentication = function (images) {

      console.log("----------images--------------");
      console.log("images = "+JSON.stringify(images));

      var userID = storageService.get(storageKey).id;

      // 只传dataURL给后端去解析
      userService.authentication(images,userID).then(function(res){
        console.log(JSON.stringify(res));
        $ionicLoading.show({
          noBackdrop: true,
          template: res.message,
          duration: 1000
        });
        if(res.code == 1){
          userService.getById($rootScope.userInfo.id)
            .then(function(res){
              console.log(JSON.stringify(res));
              storageService.set(storageKey,res.user);
              $rootScope.userInfo = storageService.get(storageKey);
              $state.go('menu.tabs.cargo');  //路由跳转
            },function(err){
              console.log(err);
            });
        }
      },function(err){
        console.log(err);
      });

      //var pics = [];
      //for(var key in images){
      //  pics.push(images[key]);
      //}

      //var options = new FileUploadOptions();
      //options.fileKey = "fileAddPic";
      //options.fileName = images.substr(images.lastIndexOf('/') + 1);
      //options.mimeType = "image/jpeg";
      //options.chunkedMode = false;
      //
      //
      //var uri = encodeURI(ENV.api+ENV.interface.authentication);
      //console.log("sever uri : "+uri);
      //
      //var ft = new FileTransfer();
      //
      //ft.upload(images, uri, onSuccess, onFail, options);
      //
      //ft.onprogress = onProgress;

      //if(pics.length != 4){
      //  $ionicLoading.show({
      //    noBackdrop: true,
      //    template: "不能为空",
      //    duration: 1500
      //  });
      //}else{
        //for(var fileURL in pics){
        //  console.log("fileURL = "+fileURL);
        //  var options = new FileUploadOptions();
        //  options.fileKey = "fileAddPic";
        //  options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
        //  options.mimeType = "image/jpeg";
        //  options.chunkedMode = false;
        //
        //
        //  var uri = encodeURI(ENV.api+ENV.interface.authentication);
        //  console.log("sever uri : "+uri);
        //
        //  var ft = new FileTransfer();
        //
        //  ft.upload(fileURL, uri, onSuccess, onFail, options);
        //
        //  ft.onprogress = onProgress;
        //
        //}
      //}



      //
      //// 服务端上传地址，图片在设备上的url地址，可选参数，trustAllHosts（true表示接受所有安全证书）。返回success和progress
      //$cordovaFileTransfer.upload(server,filePath,options)  // 能否批量上传图片？？？
      //  .then(function(res){
      //    // success
      //
      //  },function(err){
      //    // error
      //
      //  },function(progress){
      //    // progress
      //
      //  });
    }

    // 上传进度
    function onProgress(progressEvent) {
      if (progressEvent.lengthComputable) {
        var uploadProgress = (progressEvent.loaded / progressEvent.total) * 100;
        $ionicLoading.show({
          template: "已经上传：" + Math.floor(uploadProgress) + "%"
        });
        if (uploadProgress > 99) {
          $ionicLoading.hide();
        }
      } else {
        $ionicLoading.hide();
      }
    };

    // 上传失败
    function onFail(message) {
      console.log("error: "+JSON.stringify(message));
      if (message.indexOf('cancelled') < 0) {
        alert('出錯了：' + message);
      }
    }

    // 上传成功
    function onSuccess(msg) {
      /* msg.response是服务端返回的值，需要将字符串转为对象
       msg={"response":"{\"ReturnUrl"\:\"http://xxx.com/upload/modified.jpg\",\"Success\":true,\"Message\":\"上传成功\"}","responseCode:":200,"objectsId":"","bytesSent":16497}
       */
      console.log("msg :"+JSON.stringify(msg));
      var response = JSON.parse(msg.response);
      console.log("response:"+response);
      if (response.responseCode == "200") {
        if (response.Success) {
          $ionicLoading.show({
            template: response.Message,
            duration: 800
          });
          //$scope.images.unshift(response.ReturnUrl);
          //$ionicSlideBoxDelegate.$getByHandle("theSlider").update();
        } else {
          $ionicLoading.show({
            template: response.Message,
            duration: 1000
          });
        }
      } else {
        $ionicLoading.show({
          template: "通讯失败，上传失败",
          duration: 1000
        });
      }
    }
  }

  return userCtrl;
});
