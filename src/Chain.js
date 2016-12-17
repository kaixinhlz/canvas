/**
 * Created by Administrator on 2016-12-16.
 * @param {node} [canvas]���뻭������
  @param {context} [context]���������Ĳ���
 @param {number} [bigRadius] �������Բ���İ뾶
 @param {number} [zeroX]���ø�Ƕ��Բ�������ĵ�����x
 @param {number} [zeroY]���ø�Ƕ��Բ�������ĵ�����y
 @param {number} [speed]���ö�ʱ����ʱ�䣬��ֵԽ����Բ�������ٶ�Խ��
 @param {Array} [arr]�ӵ�����������ʼ�����ÿ�����鼴����һ��Բ��������ĳ�ԱΪ��Բ���ϵ�СԲ�е��ı�
 */

function Chain(canvas,ctx,bigRadius,zeroX,zeroY,speed){
    this.textsArr = [];
    this.bigRadius = bigRadius;
    this.zeroX = zeroX;
    this.zeroY = zeroY;
    this.ctx = ctx;
    this.canvas = canvas;
    this.startAngle = 0;
    this.speed = speed;
    for(var i=6 ; i<arguments.length ; i++){
        this.textsArr.push(arguments[i]);
    }
    this.init();
}
Chain.prototype = {
    constructor:Chain,
    init:function(){
        this.colorArr = [];
        for(var i=0 ; i<200 ; i++){
            var color = "rgb("+this.getColorNum()+","+this.getColorNum()+","+this.getColorNum()+")";
            this.colorArr.push(color);
        }
        this.setAllRadius();
        this.bindDom();
        this.setTimer(this.speed);
        this.bindEvent();
    },
    getColorNum:function (){
        return Math.floor(Math.random()*100+155);
    },
    bindDom:function(){
        for(var i = 0 ; i<this.textsArr.length ; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.zeroX,this.zeroY,this.allBigRadiusArr[i],0,Math.PI*2);
            this.ctx.strokeStyle = this.colorArr[i+100];
            this.ctx.stroke();
            var length = this.textsArr[i].length;
            if(length==1&&i==this.textsArr.length-1){
                this.ctx.fillStyle = this.colorArr[i+100];
                this.ctx.fill();
            }
            for(var j=0 ; j<length ; j++){
                this.ctx.beginPath();
                this.ctx.font = "14px Microsoft YaHei";
                this.ctx.fillStyle = "#222"
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                if(length==1&&i==this.textsArr.length-1){
                    this.ctx.fillText(this.textsArr[i][j],this.zeroX,this.zeroY);
                }else{
                    this.ctx.beginPath();
                    this.ctx.arc(this.zeroX+this.allBigRadiusArr[i]*Math.cos(Math.PI*2/length*j+Math.pow(-1,i)*this.startAngle),this.zeroY+this.allBigRadiusArr[i]*Math.sin(Math.PI*2/length*j+Math.pow(-1,i)*this.startAngle),this.allSmallRadiusArr[i],0,Math.PI*2);
                    this.ctx.fillStyle = this.colorArr[j*j+i]
                    this.ctx.fill();
                    this.ctx.beginPath();
                    this.ctx.fillStyle = "#222"
                    this.ctx.fillText(this.textsArr[i][j],this.zeroX+this.allBigRadiusArr[i]*Math.cos(Math.PI*2/length*j+Math.pow(-1,i)*this.startAngle),this.zeroY+this.allBigRadiusArr[i]*Math.sin(Math.PI*2/length*j+Math.pow(-1,i)*this.startAngle));
                }
            }
        }
    },
    setAllRadius:function(){
        this.allBigRadiusArr = [this.bigRadius];
        this.allSmallRadiusArr = [];
        var radiusDValue = -50;
        var length = this.textsArr.length;
        for(var i=0 ; i<length ; i++) {
//              ����ÿ��СԲ�İ뾶
            if(this.textsArr[length-1].length==1){
            this.allSmallRadiusArr.push((this.bigRadius-length*5)/2/(length-1.2)/2*(1.1+Math.random()*0.9));
            }else{
               this.allSmallRadiusArr.push(((this.bigRadius-length*15)/2/(length-0.8))/2*(1+Math.random()*0.4));   
            }
          
            radiusDValue += this.allSmallRadiusArr[i]+30;
            if(i>0){
//                  ���ÿ����Բ�İ뾶��С
                this.allBigRadiusArr.push(this.bigRadius- radiusDValue )
            }
        }
    },
    setTimer:function(speed){
        var that = this;
        this.timer = setInterval(function(){
            that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
            that.startAngle += Math.PI/ 280;
            that.bindDom();
        },speed)
    },
    bindEvent:function(){
        var that = this;
        this.canvas.onmouseover = function(){
            clearInterval(that.timer);
            that.setTimer(50);

        }
        this.canvas.onmouseout = function(){
            clearInterval(that.timer);
            that.setTimer(that.speed);
        }
    }

}