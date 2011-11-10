function debug(){
  getUserFollowings('8775782'); //7787606-alanna //8775782-doodcatt // 8055511-ryan
  $("#loggedin").css('display','block');
  $("#loggedout").css('display','none');
}

function init(){
  window.scrollTo(0,1);
  SC.initialize({
    client_id: "956307a721999662072e3d9978287449"
  });
  $.scPlayer.defaults.onDomReady = null;
  $('#disconnect').click(function(){
    SC.disconnect();
    $('#loggedin').css('display','none');
    $('#loggedout').css('display','block');
  });
  $("#refresh").click(function(){
    getUserFollowings(_uid);
  });
  //debug();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
function getUserFollowings(curUserId){
  $("#mix").html('');
  $("#mix").before('<div class="loading"></div>');
  SC.get("/users/"+curUserId+"/followings", function(data){
    if(data.length < 1){
      $("#mix").html("<li class='alert'>You aren't following anybody! Follow some more people on <a href='http://soundcloud.com/people'>Soundcloud</a>, and then I'll make a sweet playlist for you! weeee!!!</li>");
    }
    else if (hasFaves(data)){
      var mixlen = 10;
      var i = 0;
      while(i < mixlen){
        var rand = getRandomInt(0, data.length-1);
        //does this user have public favs?
        if (data[rand].public_favorites_count > 0){
          //TODO: account for duplicate tracks
          getFollowersFavs(data[rand].id);
          i++;             
        }
      }
    }
    else{
      $("#mix").html("<li class='alert'>The people you are following have fewer than 5 fave tracks between them. Follow some more people on <a href='http://soundcloud.com/people'>Soundcloud</a>, and then I'll make a sweet playlist for you! weeee!!!</li>");
    }
    $('.loading').fadeOut('fast', function(){
      $("#mix").fadeIn('slow');
    });
  });
}

function getFollowersFavs(followerid){  
  SC.get("/users/"+followerid+"/favorites", function(data){
    if(data.length > 0) {
      getFavTrack(data);
    }
  });
}

function hasFaves(data){  
  var count = 0;
  for (var i=0; i < data.length; i++) {
    count += data[i].public_favorites_count;
  }
  if(count < 5){
    return false;
  }
  else{
    return true;
  }
}

function getFavTrack(data){
  var rand = getRandomInt(0, data.length-1);
  var s = '<li id="sc-'+rand+'"><a href="'+data[rand].permalink_url+'" id="sc-player-'+rand+'" class="track">'+data[rand].title+' by '+data[rand].user.username+'</a></li>';
  $("#mix").append(s);
  $('#sc-'+rand).scPlayer();
}