export default function tos(date) {
    var html='<div class="to" style="position: absolute;width: 100%;top: 70%;"><div class="tost" style="width: 80%;padding:5px;border-radius: 4px;background: #444;text-align: center;color: #fff;margin: 0 auto;position: relative;display: none;z-index: 9999999;font-size:14px"><div style="width: 20px;height: 20px;background: #444;position: absolute;top: -10px;left:10%;transform:rotate(45deg)"></div></div></div>';
    if($('.tost').length==0){
        $('body').append(html);
        var tost=$('.tost');
        tost.fadeIn();
    }else {
        $('.tost').remove();
    }

    if($('.tost').length!=0){
        tost.html(date);
    }
    setTimeout(function () {
        $('.tost').fadeOut();
        $('.to').remove();
    },1500)
}