/**
 * Created by sammy on 2016/4/8.
 */


define([],function(){
  'use strict';
  function lorryService($q,$resource,$cordovaImagePicker,$cordovaCamera,$cordovaFile,$ionicLoading,ENV){

    console.log("-----------------enter lorryService----------------");


    function makeid(){
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i = 0;i < 5;i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    var saveImage = function(index){
      return $q(function(resolve,reject){
        var options = {
          quality: 50,
          //destinationType: Camera.DestinationType.FILE_URI,
          destinationType: Camera.DestinationType.DATA_URL,
          //sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };
        if(index == 0){
          // 拍照
          console.log("------------相机------------");
          options.sourceType = Camera.PictureSourceType.CAMERA;
        }else{
          // 相册
          console.log("------------图库------------");
          options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        // 相机插件
        $cordovaCamera.getPicture(options).then(function(imageURI){
          resolve(imageURI);
        },function(e){
          console.log("error: "+e);
          $ionicLoading.show({template: 'Errore di caricamento...', duration: 3000});
          reject();
        });
      });
    };

    var addLorry = function(lorry){
      return $q(function(resolve,reject){
        if(lorry.number == "" || lorry.load == "" || lorry.lorryLength == "" || lorry.lorryType == "" || lorry.frontImg || lorry.sideImg || lorry.backImg || lorry.carIDImg){
          reject({message:"不能为空"});
        }else{
          $resource(ENV.api+ENV.interface.addLorry,{},{
            save : {
              method:"POST"
            }
          }).save(lorry, function(response) {
            resolve(response);
          });
        }
      });
    };

    var getList = function(uid){
      return $q(function(resolve,reject){
          $resource(ENV.api+ENV.interface.getLorryList,{},{
            getAll : {
              method:"POST"
            }
          }).getAll({
            userID:uid
          }, function(response) {
            resolve(response);
          });
      });
    }

    //function saveFromCamera(){
    //  return $q(function(resolve,reject){
    //    var theImage;
    //    var options = {
    //      quality: 50,
    //      destinationType: Camera.DestinationType.FILE_URI,
    //      sourceType: Camera.PictureSourceType.CAMERA,
    //      allowEdit: false,
    //      encodingType: Camera.EncodingType.JPEG,
    //      popoverOptions: CameraPopoverOptions,
    //      saveToPhotoAlbum: true
    //    };
    //    // 相机插件
    //    $cordovaCamera.getPicture(options).then(function(imageURI){
    //      console.log("imageURI: "+imageURI);
    //
    //      var name = imageURI.substr(imageURI.lastIndexOf('/') + 1),
    //           path = imageURI.substr(0,imageURI.lastIndexOf('/') + 1),
    //           newName =  makeid() + name,
    //           newPath = cordova.file.cacheDirectory;
    //
    //      console.log("name: "+name);
    //      console.log("Path: "+path);
    //      console.log("newName: "+newName);
    //      console.log("newPath: "+newPath);
    //
    //      // 拷贝到缓存
    //      $cordovaFile.copyFile(path,name,newPath,newName)
    //        .then(function(fileEntry){
    //          console.log("----------success enter copyFile----------------");
    //          console.log(JSON.stringify(fileEntry));
    //          theImage = newPath + newName;
    //          console.log("----------leave copyFile----------------");
    //          resolve(theImage);
    //        },function(e){
    //          console.log("error: "+e);
    //          console.log("----------fail happened copyFile----------------");
    //          reject();
    //        });
    //    },function(e){
    //      console.log("error: "+e);
    //      $ionicLoading.show({template: 'Errore di caricamento...', duration: 3000});
    //      reject();
    //    });
    //  });
    //}
    //
    //function saveFromLib(){
    //
    //  return $q(function(resolve,reject){
    //    var theImage;
    //    var options = {
    //      maximumImagesCount: 1
    //    };
    //    $cordovaImagePicker.getPictures(options)
    //      .then(function(results){
    //        console.log("iamge URI: " + results[0]);
    //        theImage = results[0];
    //        resolve(theImage);
    //      },function(e){
    //        console.log("error: "+e);
    //        reject();
    //      });
    //
    //  });
    //}

      return {
        //saveFromCamera:saveFromCamera,
        //saveFromLib:saveFromLib
        saveImage:saveImage,
        addLorry:addLorry,
        getList:getList
      };

  }

  return lorryService;

});
