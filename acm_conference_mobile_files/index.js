var cookieName_jb = "gair2018yr_jb";
var cookieName_zc = "gair2018yr_zc";

$(function() {
    init();
 //   initData();
    initSwiper();

    initAction();
});


function init() {
    $(".navspy").find("a").each(function() {
        $(this).click(function() {
            var dataNav = $(this).data('nav');

            if (!dataNav) {
                return false;
            }

            $("html,body").animate({
                scrollTop: $("#" + dataNav).offset().top
            }, 600);
        })
    });

    $('.to-buy-ticket').click(function() {
        var dataNav = $(this).data('nav');

        if (!dataNav) {
            return false;
        }

        $("html,body").animate({
            scrollTop: $("#" + dataNav).offset().top-20
        }, 600);
    })

    $("#loadMore").on("click", function(){
        $(this).toggleClass("active");
        $("#navQa").find(".list").toggleClass("active");
    });

  
    
    // 议程数据导入
    $.ajax({
        url:'./agendaDetail.json',
        type:'GET',
        async:false,
        success:function(res){
            var html = [];
            for (var lv1 = 0; lv1 < res.length; lv1++) {
                html=html.concat([
                    '<div class="card-item card-day'+(lv1+1)+' '+(lv1==0?"act":"")+'">',
                        '<div class="agenda-level2">',
                        ])
                        var nav=0;
                        for (var lv2 = 0; lv2 < res[lv1].length; lv2++) {
                            if (res[lv1][lv2].hasOwnProperty('sessionData')) {
                                for (var lv3 = 0; lv3 < res[lv1][lv2].sessionData.length; lv3++) {
                                    
                                        nav++
                                        html=html.concat([
                                            '<div class="level2-item" data-lv2="'+(nav)+'">'+res[lv1][lv2].sessionData[lv3].name+'</div>',
                                        ]) 
                                                          
                                }
                            }                 
                        }
                        html=html.concat([
                        '</div>',
                        '<div class="agenda-content-wrap bottom-shadow">',
                            '<div class="fa-position">',
                                '<div class="agenda-content">',
                                ])
                                for (var lv2 = 0; lv2 < res[lv1].length; lv2++) {
                                    if (res[lv1][lv2].hasOwnProperty('sessionData')) {
                                        for (var lv3 = 0; lv3 < res[lv1][lv2].sessionData.length; lv3++) {
                                                html=html.concat([
                                                '<div class="agenda-tit">'+res[lv1][lv2].sessionData[lv3].name+'</div>',
                                                ])
                                                if (res[lv1][lv2].sessionData[lv3].guestData!=='') {
                                                    html=html.concat([                
                                                    '<div class="agenda-tit-list-warp"><div class="agenda-tit-list clr">'
                                                    ])
                                                    for (var i = 0; i < res[lv1][lv2].sessionData[lv3].guestData.length; i++) {
                                                        html=html.concat([
                                                        '<div class="list-item">'+res[lv1][lv2].sessionData[lv3].guestData[i].guest_name+'，'+res[lv1][lv2].sessionData[lv3].guestData[i].title+'</div>',
                                                        ])
                                                        
                                                    }
                                                    html=html.concat([                
                                                    '</div></div>',
                                                    ])                                                   
                                                }
                                                
                                                html=html.concat([                                                
                                                '<ul class="agenda-list">',                                            
                                                ])
                                                if (res[lv1][lv2].sessionData[lv3].hasOwnProperty('speechData')) {
                                                    for (var lv4 = 0; lv4 < res[lv1][lv2].sessionData[lv3].speechData.length; lv4++) {                                                
                                                        html=html.concat([
                                                            '<li class="agenda-item clearfix">',
                                                                '<div class="ag-cir"><i></i></div>',
                                                                '<div class="ag-time">'+res[lv1][lv2].sessionData[lv3].speechData[lv4].start_time+" - "+res[lv1][lv2].sessionData[lv3].speechData[lv4].end_time+'</div>',
                                                                '<div class="ag-name">'+res[lv1][lv2].sessionData[lv3].speechData[lv4].speech_type+'</div>',
                                                                '<div class="ag-intro">',
                                                                    '<div class="ag-tit">'+res[lv1][lv2].sessionData[lv3].speechData[lv4].speech_title+'</div>'
                                                                ])                                                
                                                                for (var lv5 = 0; lv5 < res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData.length; lv5++) {
                                                                    if (res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData[lv5].guest_name=="无嘉宾") {
                                                                            
                                                                    }else if(res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData[lv5].guest_name=="嘉宾确认中"){
                                                                        html=html.concat([
                                                                            '<div class="intro-line line-1">'+res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData[lv5].guest_name+'</div>'                                                                
                                                                        ])
                                                                    }else{
                                                                        html=html.concat([
                                                                            '<div class="intro-line">'+res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData[lv5].guest_name+res[lv1][lv2].sessionData[lv3].speechData[lv4].guestData[lv5].title+'</div>'                                                                
                                                                        ])
                                                                    }
                                                                }                                                                                                                    
                                                                html=html.concat([
                                                                '</div>',
                                                            '</li>',
                                                        ])
                                                    }
                                                
                                                
                                                html=html.concat([
                                                '</ul>',
                                                ])
                                            }                    
                                        }
                                    }                 
                                }                                
                                if (lv1==0) {
                                    html=html.concat([
                                        '<li class="agenda-item agenda-item-sp clearfix"><div class="ag-cir"><i></i></div><div class="ag-time">18:15 - 19:30</div><div class="ag-name">大咖饭局</div><div class="ag-intro"><div class="intro-line">仅限大会嘉宾及受邀人士，VIP观众可联系客服提前报名</div></div></li>',
                                        '<li class="agenda-item agenda-item-sp agenda-item-sp-last clearfix"><div class="ag-cir"><i></i></div><div class="ag-time">19:00 - 20:30</div><div class="ag-name">专场闭门会</div><div class="ag-intro"><div class="intro-line"></div></div></li>',
                                        '<div class="next-agenda" data-day="1">6月30日议程 <i></i></div>',
                                    ])
                                }else if(lv1==1){
                                    html=html.concat([
                                        '<div class="next-agenda" data-day="2">7月01日议程 <i></i></div>',
                                    ])
                                }
                                html=html.concat([
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>'
                ])
            }
            $('.agenda-card').html(html.join(''));

        },
        error:function(xhr, status, errorThrown){
            console.log(errorThrown);
        }
        })
}

function initData() {
    var guest = [];

    if (!guestData) {
        return false;
    }
    // function randomsort(a, b) {
    //    return Math.random()>.5 ? -1 : 1; //通过随机产生0到1的数，然后判断是否大于0.5从而影响排序，产生随机性的效果。
    // }
    // guestData.sort(randomsort);

    var temp_a = -1,
        temp_b = 0;

    var jb = getLocal(cookieName_jb);

    for (var i = 0; i < guestData.length; i++) {
        temp_a = i % 6;
        if (temp_a == 0) {
            guest[temp_b] = [];
        }
        if (temp_a > -1 && temp_a < 6) {            
            guestData[i].name = guestData[i].name.replace(/\ +/g,"");
            guestData[i].name = guestData[i].name.replace(/[\r\n]/g,"");
            if (jb && jb.length > 0) {
                guestData[i]['islike'] = 0;
                for (var j = 0; j < jb.length; j++) {
                    if (jb[j].name == guestData[i].name) {
                        guestData[i]['islike'] = 1;
                        break;
                    } 
                }
            } else {
                guestData[i]['islike'] = 0;
            }
            guest[temp_b].push(guestData[i]);

        }
        if (temp_a == 5) {
            temp_b++;
        }
    }

    var person = Gair.templates.guest(guest);
    $("#wrapperGuest").html(person);

    var forum = [];
    
    if (!zc) {
        return false;
    }
    // zc.sort(randomsort);
    initZcLocal(zc);

    var temp_a2 = -1,
        temp_b2 = 0;

    for (var i = 0; i < zc.length; i++) {
        temp_a2 = i % 6;
        if (temp_a2 == 0) {
            forum[temp_b2] = [];
        }
        if (temp_a2 > -1 && temp_a2 < 6) {
            zc[i]['assetsUrl'] = assetsUrl;
            forum[temp_b2].push(zc[i]);
        }
        if (temp_a2 == 5) {
            temp_b2++;
        }
    }

    var person2 = Gair.templates.forum(forum);
    $("#forumWrapper").html(person2);


}

function initSwiper() {
    var swiper_guest = new Swiper('.swiperGuest', {
        pagination: '.page_guest',
        nextButton: '#p_guest_next',
        prevButton: '#p_guest_prev',
        //autoHeight: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        watchSlidesVisibility: true,
        slidesPerView: 1.1,
    });
    var swiper_guest2 = new Swiper('.swiperGuest2', {
       pagination: '.page_guest2',
        nextButton: '#p_guest_next2',
        prevButton: '#p_guest_prev2',
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        watchSlidesVisibility: true,
        slidesPerView: 3,
        slidesPerColumn : 3,
        slidesPerGroup : 2,
        slidesPerColumnFill : 'column',
        paginationClickable: true,
        spaceBetween:10
    });
    var swiper_forum = new Swiper('.swiperForum', {
        pagination: '.page_forum',
        nextButton: '#p_forum_next',
        prevButton: '#p_forum_prev',
        slidesPerView: 1.1,
    });
    var swiper_summit = new Swiper('.swiperSummit', {
        slidesPerView: 2.2,
        spaceBetween: 0
    });
}

function initAction() {
    $("#wrapperGuest").on("click", ".action", function() {
        var name = $(this).data("name");
        var _this = $(this);
        if($(this).closest('.img').hasClass("active")){
            // postUnLike('1', name, function(data) {
            //     $(_this).closest('.img').removeClass("active");
            // });
            $(_this).closest('.img').removeClass("active");
            cancelToLocal(cookieName_jb, name);
        }
        else{
            postLike('1', name, function(data) {
                setToLocal(cookieName_jb, name);
                $(_this).closest('.img').addClass("active");
            });
        }
        
    });

    $("#forumWrapper").on("click", ".action", function() {
        var name = $(this).data("name");
        var _this = $(this);
        if($(this).closest(".item").hasClass("active")){
 
            var cur = $(_this).find(".num").text();
            $(_this).find(".num").text(cur * 1 - 1);
            $(_this).closest(".item ").removeClass("active");
            cancelToLocal(cookieName_zc, name);
        }
        else{
            postLike('2', name, function(data) {
                setToLocal(cookieName_zc, name);
                var cur = $(_this).find(".num").text();
                $(_this).find(".num").text(cur*1+1);
                $(_this).closest(".item").addClass("active");
            });
        }
        
    });

    $("input.commentInput").focus(function(){
        $(this).closest(".inputBox").addClass("active");
    });
    $("input.commentInput").blur(function(){
        if(!$(this).val()){
            $(this).closest(".inputBox").removeClass("active");
        }        
    });
    $("button.btn-submit").each(function(){
        var _this = this;
        $(this).on("click", function(){
            var id = $(_this).data("id");
            var val = $("#"+id).val();
            if(!val){
                return false;
            }
            var m = $("#"+id).data("type");
            var _input = $("#"+id);
            postComment(m, val, function(data){
                //alert('提交成功');
                showTip('提交成功');
                $(_input).val('');
                $(_input).blur();
                $(_this).closest(".inputBox").removeClass("active");
            });
        });
    });

    $('.guide-exhi').click(function(){
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
        }else{
            $(this).addClass('open');
        }
    })

    $(document).on('click','.g-item',function(){
        var _index=$(this).index();
        var _detail=$(this).parents('.g-item-wrap').siblings('.g-intro');
        if (_detail.find('.intro-item').eq(_index).text()=="") {return;}
        $('.g-item').removeClass('act');
        $(this).addClass('act');
        $('.g-intro').hide();
        $('.intro-item').hide();
        _detail.find('.intro-item').eq(_index).show();
        _detail.removeClass('g-intro1 g-intro2 g-intro3').addClass('g-intro'+(_index+1)).slideDown();
    })

    $(document).on('click','.gg-btn1',function(){
        if ($(this).hasClass('act')) {
            $('#navGuest2 .gg-type1').find('.g-group').eq(5).nextAll().slideUp();
            $(this).removeClass('act').find('span').text('显示更多...');
            setTimeout(function(){
                $("html,body").animate({
                    scrollTop: $(".gg-type2").offset().top-50
                }, 300)
            },500)
        }else{
            $('#navGuest2 .gg-type1').find('.g-group').eq(5).nextAll().slideDown();
            $(this).addClass('act').find('span').text('隐藏更多');     
            
        }
    })

    $(document).on('click','.gg-btn2',function(){
        if ($(this).hasClass('act')) {
            $('#navGuest2 .gg-type2').find('.g-group').eq(4).nextAll().slideUp();
            $(this).removeClass('act').find('span').text('显示更多...');
            setTimeout(function(){
                $("html,body").animate({
                    scrollTop: $(".gg-type3").offset().top-50
                }, 300);
            },500)
        }else{
            $('#navGuest2 .gg-type2').find('.g-group').eq(4).nextAll().slideDown();
            $(this).addClass('act').find('span').text('隐藏更多');
            
        }
    })
    $(document).on('click','.gg-btn3',function(){
        if ($(this).hasClass('act')) {
            $('#navGuest2 .gg-type3').find('.g-group').eq(1).nextAll().slideUp();
            $(this).removeClass('act').find('span').text('显示更多...');
            setTimeout(function(){
                $("html,body").animate({
                    scrollTop: $("#navForum2").offset().top-50
                }, 300);
            },500)
        }else{
            $('#navGuest2 .gg-type3').find('.g-group').eq(1).nextAll().slideDown();
            $(this).addClass('act').find('span').text('隐藏更多');
            
        }
    })

    // 议程切换
    $(document).on('click','.tab-item',function(){
        var _index=$(this).index();
        $('.tab-item').removeClass('act');
        $(this).addClass('act');
        $('.card-item').removeClass('act');
        $('.card-day'+(_index+1)).addClass('act');
        $('.card-day'+(_index+1)).find('.fa-position').on('scroll',function(){
            var agTop=0;
            var navOb2={};
            var secDom2=$(this).find('.ag-wrap');
            for (var i = 0; i < secDom2.length; i++) {
                var nav="nav"+i;
                navOb2[nav]=$(secDom2[i]).position().top;
            }
            agTop=$(this).scrollTop();       
            for (var i = 0; i < secDom2.length; i++) {
                if (agTop>navOb2['nav'+i]-100&&agTop<(navOb2['nav'+(i+1)]?navOb2['nav'+(i+1)]:navOb2['nav'+(i)]+100)) {
                    $(this).parents('.card-item').find('.level2-item').removeClass('act');
                    $($(this).find('.level2-item')[i]).addClass('act');                    
                }
            }
        })
    })

    $(document).on('click','.next-agenda',function(){
        var day=$(this).data('day');
        $($('.tab-item')[day]).trigger('click');
    })



        
    $('.fa-position').on('scroll',function(){
        var agTop=0;
        var navOb2={};
        var secDom2=$(this).find('.ag-wrap');
        for (var i = 0; i < secDom2.length; i++) {
            var nav="nav"+i;
            navOb2[nav]=$(secDom2[i]).position().top;
        }
        agTop=$(this).scrollTop();
        for (var i = 0; i < secDom2.length; i++) {
            if (agTop>navOb2['nav'+i]-100&&agTop<(navOb2['nav'+(i+1)]?navOb2['nav'+(i+1)]:navOb2['nav'+(i)]+100)) {
                $(this).parents('.card-item').find('.level2-item').removeClass('act');
                $($(this).find('.level2-item')[i]).addClass('act');
            }
        }
    })

    for (var i = 0; i < $('.agenda-content').length; i++) {
        $($($('.agenda-content')[i]).find('.level2-item')[0]).addClass('act');
    }

    var wT=0;
    var aT=0;
    $(document).scroll(function(){
        wT=$(window).scrollTop();
        aT=$('.agenda-wrap').offset().top;
        if (wT>aT) {
            $('.agenda-tab').css({
                'position':'fixed',
                'top':0,
                'left':0,
                'z-index':10
            });                
            if (wT>(aT+$('.agenda-wrap').height())) {
                $('.agenda-tab').css({'position':'static'});
            }
        }else{
              $('.agenda-tab').css({'position':'static'});
        }
    })



}

function postLike(m, name, ck) {
    var url = hostUrl+"/gair/ajaxYrLike/type/{m}/type1/1/name/{name}";
    url = url.replace(/{m}/gi, m);
    url = url.replace(/{name}/gi, name);

    $.ajax({
        url: url,
        type: "post",
        success: function(data) {
            if (data && data.code == 200) {
                ck && ck(data);
            }
            else{
                alert('请求出错，请稍后重试');
            }
        },
        error: function(err) {
            console.log(err);
            alert('请求出错，请稍后重试');
        }
    })
}

function postUnLike(m, name, ck) {
    var url = hostUrl+"/gair/ajaxUnYrLike/type/{m}/type1/1/name/{name}";
    url = url.replace(/{m}/gi, m);
    url = url.replace(/{name}/gi, name);

    $.ajax({
        url: url,
        type: "post",
        success: function(data) {
            if (data && data.code == 200) {
                ck && ck(data);
            }
            else{
                alert('请求出错，请稍后重试');
            }
        },
        error: function(err) {
            console.log(err);
            alert('请求出错，请稍后重试');
        }
    })
}


function postComment(m, name, ck) {
    var url = hostUrl+"/gair/ajaxYrLike/type/{m}/type1/2/name/{name}";
    url = url.replace(/{m}/gi, m);
    url = url.replace(/{name}/gi, name);

    $.ajax({
        url: url,
        type: "post",
        success: function(data) {
            if (data && data.code == 200) {
                ck && ck(data);
            }
            else{
                alert('请求出错，请稍后重试');
            }
        },
        error: function(err) {
            console.log(err);
            alert('请求出错，请稍后重试');
        }
    })
}

function showTip(text){
    $(".modal-tip").find("p").text(text);
    $(".modal-tip").fadeIn(function(){
        setTimeout(function(){
            $(".modal-tip").fadeOut(function(){
                $(".modal-tip").find("p").text('');
            });            
        },800);
    });
    
}

/**/
function initZcLocal(arr) {
    var local = getLocal(cookieName_zc);
    if (!local) {
        setLocal(cookieName_zc, arr);
        return false;
    }
    var temp;
    for (var i = 0; i < arr.length; i++) {
        temp = local.filter(function(item) {
            if (item.name == arr[i].name) {
                return item.bool;
            }
        });
        if (temp && temp.length == 1) {
            arr[i]["bool"] = temp[0].bool;
        }
    }
    setLocal(cookieName_zc, arr);
}

function setToLocal(name, val) {
    var local = getLocal(name);
    if (name == cookieName_jb) {
        if (!local) {
            var arr = [];
            arr.push({ name: val });
            setLocal(name, arr);
        } else {
            if (!arrFindOne(local, val)) {
                local.push({ name: val });
                setLocal(name, local);
            }
        }

    } else if (name == cookieName_zc) {
        if (!local) {
            var arr = [];
            arr.push({
                name: val,
                count: 1,
                "bool": 1
            });
            setLocal(name, arr);
        } else {
            if (!arrFindOne(local, val)) {
                local.push({
                    name: val,
                    count: 1,
                    "bool": 1
                });
                setLocal(name, local);
            } else {
                var a = local.map(function(cur, index) {
                    var temp_arr = {};
                    if (cur.name == val) {
                        temp_arr["count"] = cur.count * 1 + 1;
                        temp_arr["bool"] = 1;
                    } else {
                        temp_arr["bool"] = cur.bool;
                        temp_arr["count"] = cur.count;
                    }
                    temp_arr["name"] = cur.name;

                    return temp_arr;
                });
                setLocal(name, a);
            }
        }
    }
}

function cancelToLocal(name, val){
    var local = getLocal(name);
    if (name == cookieName_jb) {
        if (arrFindOne(local, val)) {
            var temp_a = [];

            for(var i=0; i<local.length; i++){
                if(local[i].name != val){
                    temp_a.push(local[i]);
                }
            }
            
            setLocal(name, temp_a);
        }

    } else if (name == cookieName_zc) {

        if (!arrFindOne(local, val)) {
            return false;
        } else {
            var a = local.map(function(cur, index) {
                var temp_arr = {};
                if (cur.name == val) {
                    temp_arr["count"] = cur.count * 1 - 1;
                    temp_arr["bool"] = 0;
                } else {
                    temp_arr["bool"] = cur.bool;
                    temp_arr["count"] = cur.count;
                }
                temp_arr["name"] = cur.name;

                return temp_arr;
            });
            setLocal(name, a);
        }
    }
}


function getLocal(name) {
    if (typeof(Storage) !== "undefined") {
        return localStorage[name] ? JSON.parse(localStorage[name]) : null;
    } else {
        return $.cookie(name) ? JSON.parse($.cookie(name)) : null;
    }
}

function setLocal(name, val) {
    if (!val) {
        return false;
    }
    if (typeof val == "object") {
        val = JSON.stringify(val);
    } else {
        val = val.toString();
    }
    if (typeof(Storage) !== "undefined") {
        localStorage[name] = val;
    } else {
        $.cookie(name, val);
    }
}

function arrFindOne(arr, item) {
    return arr.some(function(o) {
        return o.name == item;
    });
}
