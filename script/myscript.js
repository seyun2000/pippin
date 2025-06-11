//   <!-- visual js -->
var visual_gamename = ['펭귄의 섬', '로얄 킹덤', '블록 블라스트'];
var visual_duration = ['05/19 ~ 05/29', '05/17', '05/25'];
var visual_headline = ['디저트 파티 이벤트 개최', '최고의 퍼즐 게임 어워드 수상', '새로운 챌린지 모드 업데이트'];

var visual = new Swiper(".visual", {
    effect: "fade",
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<div class="' + className + '"><div><h4>' + (visual_gamename[index]) + '</h4><p>' + (visual_duration[index]) + '</p><h3>' + (visual_headline[index]) + '</h3></div></div>';
        },
    },
});

//   <!-- our games - recogames js -->
var recogm = new Swiper(".recogm", {
    slidesPerView: "auto",
    spaceBetween: 35,
    // cssMode: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    touchRatio: 0.5,//드래그 금지
    // mousewheel: true,
    // keyboard: true,
});

//   <!-- allgame js -->
// 버튼 클릭하면 길이 늘어났다가 줄어드는 제이쿼리

$(function () {
    $(".viewall a").click(function () {
        $(".allgmbox").animate({
            height: "+=275px"
        });
        $(".viewall").css('zIndex', '-10');
        $(".viewall a").css('display', 'none');
        $(".viewall_X a").css('display', 'inline-block');
    });
    $(".viewall_X a").click(function () {
        $(".allgmbox").animate({
            height: "-=275px"
        });
        $(".viewall").css('zIndex', '10');
        $(".viewall a").css('display', 'inline-block');
        $(".viewall_X a").css('display', 'none');
    });
});

//   <!-- pippin play js -->

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    // fade: true,
    asNavFor: '.slider-nav',
});
$('.slider-for2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    // fade: true,
    asNavFor: '.slider-nav',
});
$('.slider-nav').slick({
    vertical: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.slider-for2, .slider-for',
    centerMode: true,
    centerPadding: 100,
    focusOnSelect: true,
    arrows: true,
});

//   <!-- community js -->
$(function () {
    $('ul.community_lnb li').click(function () {
        var communityTab = $(this).attr('data-tab');
        $('ul.community_lnb li').removeClass('cm_on');
        $('.cm_cont').removeClass('cm_on');
        $(this).addClass('cm_on');
        $('#' + communityTab).addClass('cm_on');
    })
});

var cm_news = new Swiper(".cm_news", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

{/* // 버튼 클릭하면 길이 늘어났다가 줄어드는 제이쿼리 */ }

$(function () {
    $(".event_btn a").click(function () {
        $(".event_menu").animate({
            height: "+=430px"
        });
        $(".event_btn").css('zIndex', '-10');
        $(".event_btn a").css('display', 'none');
        $(".event_btnup a").css('display', 'block');
    });
    $(".event_btnup a").click(function () {
        $(".event_menu").animate({
            height: "-=430px"
        });
        $(".event_btn").css('zIndex', '10');
        $(".event_btn a").css('display', 'block');
        $(".event_btnup a").css('display', 'none');
    });
});

//   <!-- best goods js -->
$(function () {
    $("#best_goods a").hover(
        function () {
            $("#best_goods").css("animation-play-state", "paused")
        },
        function () {
            $("#best_goods").css("animation-play-state", "running")
        }
    );
});

//   <!-- notice js -->
$(function () {
    $(".filter button").click(function () {
        $(".filter .filter_option").fadeToggle(400);
        // $(".filter .filter_option").css("display", "block");
        $(".filter .filter_icon").toggleClass("icon_button_on");
    });
});

//   <!-- FAQ & SEC js -->
AOS.init({
    duration: 1000,
    offset: 150,
    easing: 'ease-out-back',
});

//   <!-- language js -->
$(function () {
    $(".language h4 a").click(function () {
        $("#language_list").slideToggle(400);
    })
});