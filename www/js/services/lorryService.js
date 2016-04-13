/**
 * Created by sammy on 2016/4/8.
 */


define([],function(){
  'use strict';
  function lorryService($http,$q,$cordovaImagePicker,$cordovaCamera,$cordovaFile,$ionicLoading){

    console.log("-----------------enter lorryService----------------");


    function makeid(){
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i = 0;i < 5;i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function saveFromCamera(){
      return $q(function(resolve,reject){
        var theImage;
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };
        // 相机插件
        $cordovaCamera.getPicture(options).then(function(imageURI){
          console.log("imageURI: "+imageURI);

          var name = imageURI.substr(imageURI.lastIndexOf('/') + 1),
               path = imageURI.substr(0,imageURI.lastIndexOf('/') + 1),
               newName =  makeid() + name,
               newPath = cordova.file.cacheDirectory;

          console.log("name: "+name);
          console.log("Path: "+path);
          console.log("newName: "+newName);
          console.log("newPath: "+newPath);

          // 拷贝到缓存
          $cordovaFile.copyFile(path,name,newPath,newName)
            .then(function(fileEntry){
              console.log("----------success enter copyFile----------------");
              console.log(JSON.stringify(fileEntry));
              theImage = newPath + newName;
              console.log("----------leave copyFile----------------");
              resolve(theImage);
            },function(e){
              console.log("error: "+e);
              console.log("----------fail happened copyFile----------------");
              reject();
            });
        },function(e){
          console.log("error: "+e);
          $ionicLoading.show({template: 'Errore di caricamento...', duration: 3000});
          reject();
        });
      });
    }

    function saveFromLib(){

      return $q(function(resolve,reject){
        var theImage;
        var options = {
          maximumImagesCount: 1
        };
        $cordovaImagePicker.getPictures(options)
          .then(function(results){
            console.log("iamge URI: " + results[0]);
            theImage = results[0];
            resolve(theImage);
          },function(e){
            console.log("error: "+e);
            reject();
          });

      });
    }

      return {
        saveFromCamera:saveFromCamera,
        saveFromLib:saveFromLib
      };

  }

  return lorryService;

});
