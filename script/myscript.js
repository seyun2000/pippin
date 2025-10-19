// PC와 모바일 구분하여 호버 주기 js
const isTouchDevice = ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);

if (!isTouchDevice) { // 모바일 디바이스가 아니면
    document.body.classList.add('can-hover'); // 상위에 클래스를 추가한다.
}


// header 스크롤 숨기기
let lastScrollTop = 0;
const header = document.getElementById("header_wrap");
let mobileNotScroll;

// 화면 크기 변경 시 기능 on/off 갱신
window.addEventListener("resize", function () {
    mobileNotScroll = window.innerWidth > 1023; // 현재 크기가 1023px 초과일 경우
    if (!mobileNotScroll) { // ! == true,false 반전으로 조건이 거짓일 경우 / 즉 1023 이하일 경우
        header.style.top = "0";
    }
    // 크기가 커졌을 때 헤더를 다시 보이게 초기화
});

window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    // 1023px 이하에서는 기능 비활성화
    if (!mobileNotScroll) return;

    if (currentScroll > lastScrollTop) {
        // 아래로 스크롤 → 헤더 숨기기
        header.style.top = "-80px";
    } else {
        // 위로 스크롤 → 헤더 보이기
        header.style.top = "0";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // 모바일 bounce 방지
});


//   <!-- visual js -->
// pagination 커스텀
let visual_gamename = ['펭귄의 섬', '로얄 킹덤', '블록 블라스트'];
let visual_duration = ['05/19 ~ 05/29', '05/17', '05/25'];
let visual_headline = ['디저트 파티 이벤트 개최', '최고의 퍼즐 게임 어워드 수상', '새로운 챌린지 모드 업데이트'];

let visual = new Swiper(".visual", {
    effect: "fade",
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, // 스와이프 후 자동재생 비활성화 X
    },
    pagination: { //페이저 버튼 커스텀
        el: ".swiper-pagination", // 페이저 버튼을 담을 태그 설정
        clickable: true, // 클릭여부
        renderBullet: function (index, className) { // className이 기본값이 들어가게 필수 설정
            return '<div class="' + className + '"><div><h4>' + (visual_gamename[index]) + '</h4><p>' + (visual_duration[index]) + '</p><h3>' + (visual_headline[index]) + '</h3></div></div>';
        },
    },
});


//   <!-- our games - recogames js -->
// 추천게임 스와이퍼
// breakpoints 사용 (초기화 한 번)
const recogm = new Swiper(".recogm", {  // 1023px 이하일 때
    slidesPerView: 1,
    spaceBetween: 10,
    slidesOffsetBefore: 5,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // 화면폭에 따른 설정
    breakpoints: {
        768: {                      // 768px 이상일 때 적용
            slidesPerView: 2
        },
        1024: {                     // 1024px 이상일 때 적용
            slidesPerView: 4
        }
    }
});


//   <!-- allgame js -->
// 버튼 클릭하면 길이 늘어났다가 줄어드는 js

function setAllgmMenu(height) {
    // 기존 이벤트 제거 (중복 방지)
    $(".viewall a").off("click");
    $(".viewall_X a").off("click");

    $(".viewall a").on("click", function () {
        $(".allgmbox").animate({
            height: `+=${height}px`
        });
        $(".viewall").css('zIndex', '-10');
        $(".viewall a").hide();
        $(".viewall_X a").css("display", "inline-block");
    });

    $(".viewall_X a").on("click", function () {
        $(".allgmbox").animate({
            height: `-=${height}px`
        });
        $(".viewall").css('zIndex', '10');
        $(".viewall a").css("display", "inline-block");
        $(".viewall_X a").hide();
    });
}

function handleResizeGm(updown) {
    const allgmWidth = window.innerWidth;

    // 높이 초기화 (인라인 스타일 제거)
    $(".allgmbox").css("height", "");
    $(".viewall").css('zIndex', '10');
    $(".viewall_X a").hide();
    $(".viewall a").css("display", "inline-block");

    if (allgmWidth >= 1024) {
        // 1024px 이상
        setAllgmMenu(275);
    } else if (allgmWidth >= 768 && allgmWidth < 1024) {
        // 1024px 미만
        setAllgmMenu(525);
    } else {
        // 768px 미만
        setAllgmMenu(1050);
    }
}

$(function () {
    handleResizeGm(); // 초기 실행
    window.addEventListener("resize", handleResizeGm); // 창 크기 변경 감지
});


//   <!-- pippin play js -->
// 버튼 슬라이드 하나만 누르면 나머지 슬라이드도 따라서 움직이는 js
// pippin play js
let pippinPlaySlider = null; // 현재 상태 저장(null -> 값 지정 x)

function rePippinSlider() {
    let pippinPlaySliderView = window.innerWidth > 1023;

    // 1023px 기준으로 바뀌지 않았을 경우
    if (pippinPlaySliderView === pippinPlaySlider) return; // 완전히 같으면 true로 함수 종료함, 다르면 false로 함수 종료 안함

    // 1023px 기준으로 바뀌면 slick 새로 설정
    pippinPlaySlider = pippinPlaySliderView;

    //초기화 전 모든 슬라이드 보이게
    $('.slider-for').show();
    $('.slider-for2').show();
    $('.slider-nav').show();

    // 기존 슬라이더 제거 (중복 초기화 방지)
    if ($('.slider-for').hasClass('slick-initialized')) $('.slider-for').slick('unslick');
    if ($('.slider-for2').hasClass('slick-initialized')) $('.slider-for2').slick('unslick');
    if ($('.slider-nav').hasClass('slick-initialized')) $('.slider-nav').slick('unslick');

    if (pippinPlaySlider) {
        // PC 버전
        // 휴대폰 화면
        $('.slider-for').slick({
            asNavFor: '.slider-nav',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: false
        });
        // 바로가기 설명창
        $('.slider-for2').slick({
            asNavFor: '.slider-nav',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: false
        });
        // 버튼 슬라이드
        $('.slider-nav').slick({
            asNavFor: '.slider-for2, .slider-for',
            vertical: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: 100,
            focusOnSelect: true,
            arrows: true,
        });
    } else {
        // 모바일 버전
        $('.slider-for').slick({
            asNavFor: '.slider-for2',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: true,
        });

        $('.slider-for2').slick({
            asNavFor: '.slider-for',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: false,
        });

        // slider-nav는 모바일에서 필요 없으면 display:none 처리
        $('.slider-nav').hide();
    }
}

// resize 할 경우 현재 화면 크기에 맞게 하기 위해 최초 실행 
rePippinSlider();

// 브라우저 크기 바뀔 때마다 다시 적용
window.addEventListener('resize', function () {
    rePippinSlider();
});


//   <!-- community js -->
// news, event, story를 누를 때마다 해당 창이 뜨는 js
$(function () {
    $('ul.community_lnb li').click(function () {
        let communityTab = $(this).attr('data-tab');
        $('ul.community_lnb li').removeClass('cm_on');
        $('.cm_cont').removeClass('cm_on');
        $(this).addClass('cm_on');
        $('#' + communityTab).addClass('cm_on');
    });
});

let cm_news = new Swiper(".cm_news", {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // 화면폭에 따른 설정
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 15,
        },
        1024: {                     // 1024px 이상일 때 적용
            slidesPerView: 3,
            spaceBetween: 20,
        }
    }
});


/* // event, story 버튼 클릭하면 길이 늘어났다가 줄어드는 js */

function setEventMenu(height) {
    // 기존 이벤트 제거 (중복 방지)
    $(".event_btn a").off("click");
    $(".event_btnup a").off("click");

    $(".event_btn a").on("click", function () {
        $(".event_menu").animate({
            height: `+=${height}px`
        });
        $(".event_btn").css('zIndex', '-10');
        $(".event_btn a").hide();
        $(".event_btnup a").show();
    });

    $(".event_btnup a").on("click", function () {
        $(".event_menu").animate({
            height: `-=${height}px`
        });
        $(".event_btn").css('zIndex', '10');
        $(".event_btn a").show();
        $(".event_btnup a").hide();
    });
}

function setStoryMenu(height) {
    // 기존 이벤트 제거 (중복 방지)
    $(".story_btn a").off("click");
    $(".story_btnup a").off("click");

    $(".story_btn a").on("click", function () {
        $(".story_menu").animate({
            height: `+=${height}px`
        });
        $(".story_btn").css('zIndex', '-10');
        $(".story_btn a").hide();
        $(".story_btnup a").show();
    });

    $(".story_btnup a").on("click", function () {
        $(".story_menu").animate({
            height: `-=${height}px`
        });
        $(".story_btn").css('zIndex', '10');
        $(".story_btn a").show();
        $(".story_btnup a").hide();
    });
}

function handleResizeCm() {
    const CmWidth = window.innerWidth;

    // 높이 초기화 (인라인 스타일 제거)
    $(".event_menu, .story_menu").stop(true, true).css("height", "");
    $(".event_btn, .story_btn").css('zIndex', '10');
    $(".event_btnup a, .story_btnup a").hide();
    $(".event_btn a, .story_btn a").show();

    if (CmWidth >= 1350) {
        // 1350px 이상
        setEventMenu(430);
        setStoryMenu(670);
    } else if (CmWidth >= 1024 && CmWidth < 1350) {
        // 1350px 미만, 1024px 이상
        setEventMenu(310);
        setStoryMenu(560);
    }
    else if (CmWidth >= 768 && CmWidth < 1024) {
        // 1024px 미만
        setEventMenu(1080);
        // setStoryMenu(400);
    } else {
        // 768px 미만
        setEventMenu(3140);
    }
}

$(function () {
    handleResizeCm(); // 초기 실행
    window.addEventListener("resize", handleResizeCm); // 창 크기 변경 감지
});


//   <!-- best goods js -->
// 호버하면 슬라이드가 멈추고 떼면 다시 움직이는 js
$(function () {
    $("#best_goods a").hover(
        function () {
            $("#best_goods").css("animation-play-state", "paused");
        },
        function () {
            $("#best_goods").css("animation-play-state", "running");
        }
    );
});


//   <!-- notice js -->
// 조회순 버튼을 누르면 조회순과 날짜순이 보이는 js
$(function () {
    $(".filter button").click(function () {
        $(".filter .filter_option").fadeToggle(300);
        // $(".filter .filter_option").css("display", "block");
        $(".filter .filter_icon").toggleClass("icon_button_on");
    });
});


// 클릭하면 다른 번호로 이동하는 js
$(function () {
    $('ul.notice_number li').click(function () {
        $('ul.notice_number li').removeClass('notice_on');
        $(this).addClass('notice_on');
    });
});


//   <!-- FAQ & SEC js -->
// 자주 묻는 질문이 하나씩 뜨는 js
AOS.init({
    duration: 1000,
    offset: 200,
    easing: 'ease-out-back',
});


//   <!-- language js -->
// 언어 메뉴가 슬라이드 되는 js
$(function () {
    $(".language h4 a").click(function () {
        $("#language_list").slideToggle(400);
    });
});


// top 버튼이 sns에 가리지 않게 해주는 js

$(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop(); //지금까지 스크롤한 길이
    const docHeight = $(document).height(); //문서 길이
    const winHeight = $(window).height(); // 보이는 창 길이
    const bottomGap = docHeight - winHeight - scrollTop; //문서 길이 - (보이는 창 길이 + 지금까지 스크롤한 길이) = 남은 스크롤 길이

    // 맨 아래로 갈수록 bottom 값을 늘리기
    if (bottomGap < 100) {
        // 화면 맨 아래 근처일 때
        $(".top a").css("bottom", "150px");
    } else {
        // 기본 위치
        $(".top a").css("bottom", "50px");
    }
});


// 햄버거 버튼, 모바일 메뉴 js
$(function () {
    $(".hamburger_btn").on("click", function (hm_event) {
        hm_event.stopPropagation(); // 이벤트 전파 방지 (body 클릭 이벤트로 전달되지 않게)
        $(this).toggleClass("hm_on");
        $(".m_header_menu").toggleClass("hm_on2");
        $(".m_header_bg").toggleClass("m_header_bgon");
    });

    $(".m_header_menu").on("click", function (hm_event) {
        hm_event.stopPropagation();
    });

    // 메뉴 외부 클릭 시 메뉴 닫기
    $(document).on("click", function () {
        if ($(".m_header_menu").hasClass("hm_on2")) {
            $(".hamburger_btn").removeClass("hm_on");
            $(".m_header_menu").removeClass("hm_on2");
            $(".m_header_bg").removeClass("m_header_bgon");
        }
    });
});