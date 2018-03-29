jQuery(function($){
  var step=20;
  var playGround={
    x:600,
    y:360
  }
  var score=0;
  var bodyArry=[];
  var $head=$("#head");
  var $gameBox=$("#gameBox");
  var $egg;
  var typeX=1;
  var typeY=0;
  var timer;
  $(document).bind("keydown",function(evt){
     console.log(evt.keyCode);
     move(evt.keyCode);
  })
  $("#reStart").bind("click",function(){
          reStart();
  })
  //重启
  function reStart(){
    window.location.reload();
  }
  //加蛋
   function addEgg(){
    var x =  Math.floor(Math.random()*(playGround.x/20) )*step; //29*(0-1)*20
    var y =  Math.floor(Math.random()*(playGround.y/20) )*step; //17*(0-1)*20
    addBody(x, y, "egg");
   }
   //吃蛋
   function eatEgg(){
     if(!$egg)return;
     if( $head.css("top")==$egg.css("top") 
      && $head.css("left")==$egg.css("left") ){
        //转化为身体
        $egg.removeClass("egg").addClass("snake");
        bodyArry.push($egg);
        //加分数
         $("#score").html(++score);
        //加蛋
        addEgg();
      }
    } 
   function initGame(){
     addBody(180,200);
     addEgg();
     snakerun(true);
   } 
  function move(key){
    if(key==38){
      typeY=-1;
      typeX=0;             // 上
    }else if(key==39){
      typeX=1;
      typeY=0;              //  右
    }else if(key==40){
      typeY=1;
      typeX=0;             // 下
    }else if(key==37){
      typeX=-1;
      typeY=0;            //  左
    }else if(key==82||key==13){
      snakerun(true);        
    }else if(key==32){
      snakerun(false);        
    }else{
      if(key){
        return;
      }
    }
   var moveY = typeY * step;
   var moveX = typeX * step; 
   //保存头部走动前位置
    var oldheadX=+$head.css("left").split("px")[0];
    var oldheadY=+$head.css("top").split("px")[0];
    //头部走一步
    $("#head").css("top","+="+moveY+"px");
    $("#head").css("left","+="+moveX+"px");
    //尾部移动到原来头的位置
    bodyArry[bodyArry.length-1].css("top",oldheadY+"px");
    bodyArry[bodyArry.length-1].css("left",oldheadX+"px");
    if(bodyArry.length>1){
      bodyArry.unshift(bodyArry[bodyArry.length-1]);
      bodyArry.pop();
    }
    //判断游戏是否结束
    if(gameOver()){
      clearInterval(timer);
      myAlert("gameOver!!!",function(){
        reStart()
      });
    }
      //是否吃蛋
      eatEgg();
  }
   function gameOver(){
     //1.撞墙
      var headX=+$head.css("left").split("px")[0];
      var headY=+$head.css("top").split("px")[0];
      if(headY<0||headY>playGround.y-20||headX<0||headX>playGround.x-20){        
        return true;
      }
      //2.撞自己
    for (var i = 0;i<=bodyArry.length - 1; i++) {
      if($head.css("top")==bodyArry[i].css("top")
        && $head.css("left")==bodyArry[i].css("left") ){
        return true;
      };    
    };
    return false;
   }
    function addBody(x,y,type){ 
      var type= type ||"snake";
      var html="<div class= ' "+type+" snake'></div>";
      var $snakeBody=$(html);
      $snakeBody.css("top",y+"px");
      $snakeBody.css("left",x+"px");
      $gameBox.append($snakeBody);
      if( type!="egg"){
        bodyArry.push($snakeBody);
      }else{
        $egg=$snakeBody;
      }     
    }
    function snakerun(bool){
      if(bool){
       timer= setInterval(function(){
         move();
       },500)
    }else{
      clearInterval(timer);
    }  
 }   
     function myAlert(str,fun){
      $("#myAlert-content").html(str);
      $("#myAlert-bk").show();
      $("#myAlert").show();
      $("#myAlert-btn-ok").unbind("click").bind("click",function(){
        $("#myAlert-bk").hide();
          $("#myAlert").hide();
          if(typeof fun=="function")fun();
      })
     }
     myAlert("你准备好了吗？",function(){
         initGame()} 
       );    
})                     
      