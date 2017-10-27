import './css/reset.css';
import './js/rem.js';
import toast from './js/modal.js';
import CreateCanvas from './js/createCanvas.js';
const imgFiles=["icon01.png","icon02.png","icon03.png","icon04.png","pic1.png","er.png","pic2.png","share.png","t1.png","text.png","upload.png"]
let count=0;
let con=$('.page-01');
let divImg=[
    {
        ele:`
        <div class="icon icon01 animate scale"><img src="img/icon01.png" alt=""></div>`,
        animate:"scale"
    },
    {
        ele:`<div class='icon icon02 animate Indown'><img src="img/icon02.png" alt=""></div>`,
        animate:"Indown"
    },
    {
        ele:`<div class='icon icon03 animate Inleft'><img src="img/icon03.png" alt=""></div>`,
        animate:"Inleft"
    },
    {
        ele:`<div class='icon icon04 animate Inup'><img src="img/icon04.png" alt=""></div>`,
        animate:"Inup"
    }
];
imgFiles.forEach((name)=>{
    require(`./img/${name}`);
    let img=new Image();
    img.src="./img/"+name;
    img.onload=function(){
        count+=1;
     
        if(count==imgFiles.length){
            $('.loader').addClass('hide');
            document.getElementById('audio').play();
           gameInt();
        }
    }
})

 

   
function gameInt(){
    console.log("Images is load!")
    con.append(divImg[0].ele);
    setTimeout(()=>{
       changeColor("yellow")
    },200)
    /**
 * 场景1
 */
$('.icon01').on("animationend webkitAnimationEnd",function(){
    $(this).addClass('hide');
    changeColor("green");
    con.append(divImg[1].ele);
    $('.icon02').on("animationend webkitAnimationEnd",function(){
        changeColor("yellow")
        setTimeout(()=>{$(this).hide();},250)
        con.append(divImg[2].ele);
        $('.icon03').on("animationend webkitAnimationEnd",function(){
            changeColor("lightgreen")
            setTimeout(()=>{$(this).hide();},250)
            con.append(divImg[3].ele);
            $('.icon04').on("animationend webkitAnimationEnd",function(){
                changeColor("purple")
                setTimeout(()=>{con.addClass('hide');$('.page-02').removeClass('hide');
                $('.shing').addClass('colorChange01')
            },200)
            })
        })
    })
});
/**
* 场景2文字闪烁动画
*/
$('.shing').on("animationend webkitAnimationEnd",function(){
    changeColor("green");
    $('.content01').addClass('hide');
    $('.content02').removeClass('hide');
    $('.shing02').addClass('colorChange02')
})
$('.shing02').on("animationend webkitAnimationEnd",function(){
    changeColor("yellow");
    $('.content02').addClass('hide');
    $('.content03').removeClass('hide');
    $('.shing03').addClass('colorChange02')
})
$('.shing03').on("animationend webkitAnimationEnd",function(){
    changeColor("lightgreen");
    $('.content03').addClass('hide');
    $('.content04').removeClass('hide');
    $('.shing04').addClass('colorChange02')
})
$('.shing04').on("animationend webkitAnimationEnd",function(){
    changeColor("purple");
    $('.content04').addClass('hide');
    $('.page-03').removeClass('hide');
})

function changeColor(color){
 let className=$('.container').attr('class').replace('container', "").replace(/\s/g,"");  
 $('.container').removeClass(className).addClass(color);
}

$('.subMit').click(function(){
   let text=$('#text').val();
   if(text==""){
    toast('请输入歌词哦！')
       return;
   }
   toast('点击相机上传图片哦！')
   $('.page-03').addClass('hide');
   $('.page-04').removeClass('hide');
   let canvas=new CreateCanvas("#createCanvas",text);
})
}
  



