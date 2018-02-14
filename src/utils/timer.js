/*===============================

Countdown.
Based on Kerem Suer dribble shot:
http://dribbble.com/shots/560534

change value of the variable --countTo-- to set the timer.
Would love to see someone adding a UI to this one.

=================================*/



(function drawCanvas(){
  var canvas=document.getElementById('mycanvas');
  var ctx=canvas.getContext('2d');
  var cWidth=canvas.width;
  var cHeight=canvas.height;

  var countTo=90;

  var min=Math.floor(countTo/60);
  var sec=countTo-(min*60);
  var counter=0;
  var angle=270;
  var inc=360/countTo;


  function drawScreen() {



    //======= reset canvas

    ctx.fillStyle="#2e3032";
    ctx.fillRect(0,0,cWidth,cHeight);

    //========== base arc

    ctx.beginPath();
    ctx.strokeStyle="#252424";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();

    //========== dynamic arc

    ctx.beginPath();
    ctx.strokeStyle="#df8209";
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*270,(Math.PI/180)*angle,false);
    ctx.stroke();
    ctx.closePath();

    //======== inner shadow arc

    grad=ctx.createRadialGradient(cWidth/2,cHeight/2,80,cWidth/2,cHeight/2,115);
    grad.addColorStop(0.0,'rgba(0,0,0,.4)');
    grad.addColorStop(0.5,'rgba(0,0,0,0)');
    grad.addColorStop(1.0,'rgba(0,0,0,0.4)');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=14;
    ctx.arc(cWidth/2,cHeight/2,100,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();

    //======== bevel arc

    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'#6c6f72');
    grad.addColorStop(0.5,'#252424');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,93,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();

    //====== emboss arc

    grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
    grad.addColorStop(0.0,'transparent');
    grad.addColorStop(0.98,'#6c6f72');

    ctx.beginPath();
    ctx.strokeStyle=grad;
    ctx.lineWidth=1;
    ctx.arc(cWidth/2,cHeight/2,107,(Math.PI/180)*0,(Math.PI/180)*360,true);
    ctx.stroke();
    ctx.closePath();

    //====== Labels

    var textColor='#646464';
    var textSize="12";
    var fontFace="helvetica, arial, sans-serif";

    ctx.fillStyle=textColor;
    ctx.font=textSize+"px "+fontFace;
    ctx.fillText('MIN',cWidth/2-46,cHeight/2-40);
    ctx.fillText('SEC',cWidth/2+25,cHeight/2-15);

    //====== Values



    ctx.fillStyle='#6292ae';

    if (min>9) {
      ctx.font='84px '+fontFace;
      ctx.fillText('9' ,cWidth/2-55,cHeight/2+35);

      ctx.font='24px '+fontFace;
      ctx.fillText('+' ,cWidth/2-72,cHeight/2-5);
    }
    else {
      ctx.font='84px '+fontFace;
      ctx.fillText(min ,cWidth/2-60,cHeight/2+35);
    }

    ctx.font='50px '+fontFace;
    if (sec<10) {
      ctx.fillText('0'+sec,cWidth/2+10,cHeight/2+35);
    }
    else {
      ctx.fillText(sec,cWidth/2+10,cHeight/2+35);
    }


    if (sec<=0 && counter<countTo) {
      angle+=inc;
      counter++;
      min--;
      sec=59;
    } else
    if (counter>=countTo) {
      sec=0;
      min=0;
    } else {
      angle+=inc;
      counter++;
      sec--;
    }
  }

  setInterval(drawScreen,1000);

})();
