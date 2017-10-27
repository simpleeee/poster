import er from "../img/er.png";
import toast from './modal.js';
import colorConfig from "../db/color.json"
export default class CreateCanvas{
    constructor(tag,text){
        this.tag=$(tag);
        this.text=text;
        this.canvas=document.createElement("canvas");
        this.dc=0;
        this.init();
    }
    init(){
        this.canvas.id='canvas';
        this.canvas.width=640;
        this.canvas.height=1000;
        this.tag.append(this.canvas);
        this.tag.height($('#canvas').height())
        let upload=`<div class="upload"></div>`;
        let input=`<input type="file" accept="image/*" id="upload" hidden>`;
        this.tag.append(upload);
        let _this=this;
        $('.upload').click(function(){
           let i=$('#upload').length;
           if(i){
            $('#upload').remove();
           }
           $('body').append(input);
           $('#upload').click();
           $('#upload').change(function(){
                //转换上传的图片为dataurl
                $('.loader').addClass('loader-black').removeClass('hide');
            let files = event.target.files[0];
            let reader = new FileReader;
            reader.readAsDataURL(files);
            reader.onload = () => {
                let baseImg = event.target.result;//获取dataUrl
                _this.drawImg(baseImg);
            }
           })
        })
       
    }
    drawImg(img){
        // let scale=this.canvas.width/$('#canvas').width();
        let stage=new createjs.Stage(this.canvas);
        stage.removeAllChildren();
        let image = new createjs.Bitmap(img);
        let scl=this.canvas.width/image.getBounds().width;
        image.scaleX=scl;
        image.scaleY=scl;
        let ers = new createjs.Bitmap(er);
        ers.x=500;
        ers.y=850;
        ers.alpha=0;
        // console.log(ers)
        let text = new createjs.Text(this.text, "bold 2.5rem Microsoft YaHei", "#fff");
        text.x = 30;
        text.lineHeight = 80;
        text.y= 500;
        text.skewY=-10;
        stage.addChild(image,text,ers);
        createjs.Touch.enable(stage);
        $('.loader').addClass('hide').removeClass('loader-black');
        $('.caozuo').removeClass('hide')
        $('.share').removeClass('hide')
        $('.tip').removeClass('hide')
        setTimeout(function() {
            $('.tip').addClass('hide')
        }, 3000);
        createjs.Ticker.addEventListener("tick", handleTick);
        function handleTick(event) {
            stage.update();
        }

        text.addEventListener('click',(e)=>{
            this.changeColor(e);
        })
        this.changeType(image)
        this.changeType(text)

         $('.scale-add').click(function(){
            image.scaleX+=0.1;
            image.scaleY+=0.1;
        })
        $('.scale-minus').click(function(){
            image.scaleX-=0.1;
            image.scaleY-=0.1;
        })
        $('.route-add').click(function(){
            image.rotation+=5;
        })
        $('.route-minus').click(function(){
            image.rotation-=5;
        })
        $('.back').click(function(){
            stage.removeAllChildren();
            $('#canvas').remove();
            $('.upload').remove();
            $('.page-04').addClass('hide');
            $('.page-03').removeClass('hide');
            $('.caozuo').addClass('hide')
            $('.share').addClass('hide')
            $('.tip').addClass('hide')
            $('#hbimg').remove()
        })
        let _this=this;
        $('.share').click(function(){
            ers.alpha=1;
            $('.loader').addClass('loader-black').removeClass('hide');
            setTimeout(function() {
                let imgSrc = document.getElementById("canvas").toDataURL("image/png");  
                let img=new Image();
                img.src=imgSrc;
                img.id='hbimg';
                $('#createCanvas').append(img);
                $('.loader').addClass('hide').removeClass('loader-black');
                toast('生成成功！长按保存或分享！');
            }, 200);
        })
    }
    changeColor(e){
        let colorArray=colorConfig.colorArray;
        this.dc+=1;
        setTimeout(()=>{
            this.dc=0;
        }, 300);
        if(this.dc>=2){
            let rand=Math.floor(Math.random()*colorArray.length)
            e.target.color=colorArray[rand];
        }
       
    }
    changeType(tag){
        let isUp,nx,ny;
        tag.addEventListener('mousedown',(e)=>{
            isUp=true;
            nx=e.stageX;
            ny=e.stageY;
            // console.log(nx)
            e.target.addEventListener('pressmove',(e)=>{
                if(isUp){
                    let tx=e.stageX-nx;//当前
                    let ty=e.stageY-ny;
                    e.target.x+=tx;
                    e.target.y+=ty;
                    nx=e.stageX;
                    ny=e.stageY;
                    // console.log(image.x)
                }
              
            }) 
            e.target.addEventListener('pressup',(e)=>{
                isUp=false;
                // console.log(3); 
            }) 
        })

       
    }
}