function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
function getUserFollowings(curUserId){
  $("#mix").html('<li class="loading"></li>');
  $.ajax({
    url: 'https://api.soundcloud.com/users/'+curUserId+'/followings.json?client_id=956307a721999662072e3d9978287449',
    type: 'GET',
    dataType: 'json',
    success: function(data, textStatus, xhr) {
      var mixlen = 10;
      var i = 0;
      while(i < mixlen){
        var rand = getRandomInt(0, data.length-1);
        //does this user have public favs?
        if (data[rand].public_favorites_count != 0){
          getFollowersFavs(data[rand].id);
          i++;             
        }
      }    
    },
    complete: function(xhr, textStatus) {
    },
    error: function(xhr, textStatus, errorThrown) {
    }
  });
}

function getFollowersFavs(followerid){     
  $.ajax({
    url: 'https://api.soundcloud.com/users/'+followerid+'/favorites.json?client_id=956307a721999662072e3d9978287449',
    type: 'GET',
    dataType: 'json',
    complete: function(xhr, textStatus) {
      //console.log('complete', xhr, textStatus);
    },
    success: function(data, textStatus, xhr) {
      //console.log('success', data, textStatus, xhr);
      if(data.length > 0) {
        getFavTrack(data);
      }
    },
    error: function(xhr, textStatus, errorThrown) {
    }
  });
}

function getFavTrack(data){
  var rand = getRandomInt(0, data.length-1);
  var s = '<li id="sc-'+rand+'"><a href="'+data[rand].permalink_url+'" id="sc-player-'+rand+'" class="track">'+data[rand].title+' by '+data[rand].user.username+'</a></li>';
  $("#mix").append(s);
  //$('#sc-'+rand).scPlayer();
  
  
}

function showMix(){
  $('#sc-'+rand).scPlayer();
}