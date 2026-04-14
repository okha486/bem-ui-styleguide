// 가이드 보기위한 스트립트
$(function () {
    $('main > .component-doc').each(function (i) {
        // 아이디값 넣기
        $('main > .component-doc').eq(i).attr('id', 'component-doc' + i);

        // 메뉴 생성
        $('header nav').append('<a href="#section' + i + '">' + $(this).find(' > h2').text() + '</a>');

        // 마크업 한 번 넣어도 소스 저절로 생성되게
        $('main > .component-doc').eq(i).find('> .component-doc__group').each(function (j) {
            $(this).find('> pre').text($(this).find('> .item').html());

            // 소스 복사 버튼 생성
            $(this).find('> .item').after('<textarea></textarea>');
            $(this).find('> textarea').text($(this).find('> .item').html());
            $(this).find('> .item').after('<button>소스 복사하기</button>');

        });
    });

    // 소스 복사
    $('main > .component-doc > .component-doc__group').find('> button').on('click', function () {
        $(this).siblings('textarea').select();

        document.execCommand('Copy');

        alert('소스가 복사되었어여');
    });
    
    // 메뉴 눌렀을 때
    $('header nav a').on('click', function () {
        $(this).siblings('a').removeClass('active');
        $(this).addClass('active');

        $('html, body').animate({ scrollTop: ($(this.hash).offset().top - 100) });

        return false;
    });

    // 소스 넣기
    SyntaxHighlighter.highlight();


    
    /* *******************************
    * 컨텐츠 구동 함수
    ********************************** */
    //fnNavScrollY();  // 스크롤 시 상단 고정
    fnZooms(); // 축소,확대 - zoom_container 영역지정
});

// 스크롤 시 상단 고정
function fnNavScrollY() {
    var $nav = $('.sticky-nav');
    // nav의 초기 위치값 계산
    var navOffsetTop = $nav.offset().top;

    $(window).on('scroll', function() {
        // 현재 스크롤 위치 확인
        if ($(window).scrollTop() >= navOffsetTop) {
            $nav.addClass('is-fixed');
        } else {
            $nav.removeClass('is-fixed');
        }
    });
}

// 축소, 확대 영역지정
function fnZooms() {
    var now_zoom = 100;
    var min_zoom = 70;
    var max_zoom = 200;
    var step_zoom = 10;

    var $zoom_container = $('.zoom_container');
    var $zoom_wrap = $('.zoom_wrap');
    var $zoom_value = $('.zoom_value');

    var $btn_zoom_out = $('#btn_zoom_out');
    var $btn_zoom_reset = $('#btn_zoom_reset');
    var $btn_zoom_in = $('#btn_zoom_in');

    function set_zoom(value) {
        if (value < min_zoom) value = min_zoom;
        if (value > max_zoom) value = max_zoom;

        now_zoom = value;
        apply_zoom();
    }

    function zoom_out() {
        set_zoom(now_zoom - step_zoom);
    }

    function zoom_in() {
        set_zoom(now_zoom + step_zoom);
    }

    function zoom_reset() {
        set_zoom(100);
    }

    function apply_zoom() {
        var scale = now_zoom / 100;

        var wrap_height = $zoom_wrap.outerHeight();

        $zoom_wrap.css({
            transform: 'scale(' + scale + ')',
            width: (100 / scale) + '%'
        });

        $zoom_container.css({
            height: wrap_height * scale
        });

        $zoom_value.text(now_zoom + '%');

        update_button_state();
    }

    function update_button_state() {
        var is_min = now_zoom <= min_zoom;
        var is_max = now_zoom >= max_zoom;
        var is_default = now_zoom === 100;

        $btn_zoom_out.prop('disabled', is_min);
        $btn_zoom_in.prop('disabled', is_max);
        $btn_zoom_reset.prop('disabled', is_default);
    }

    /* 이벤트 (중복 방지) */
    $btn_zoom_out.off('click').on('click', zoom_out);
    $btn_zoom_in.off('click').on('click', zoom_in);
    $btn_zoom_reset.off('click').on('click', zoom_reset);

    /* 키보드 (네임스페이스) */
    $(document)
        .off('keydown.zoom')
        .on('keydown.zoom', function (e) {
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                zoom_out();
            }

            if (e.altKey && (e.key === '=' || e.key === '+')) {
                e.preventDefault();
                zoom_in();
            }

            if (e.altKey && e.key === '0') {
                e.preventDefault();
                zoom_reset();
            }
        });

    apply_zoom();

}

// 축소, 확대 body 영역
var bodyZoom = 100; // 현재 비율
function zoomOutBody() {
    bodyZoom = bodyZoom - 10;
    
    // 화면크기 최대 축소율 70%
    if(bodyZoom <= 70){
        bodyZoom = 70;
    }
    zoomsBody();
}

// 화면크기 확대
function zoomInBody() {
    bodyZoom = bodyZoom + 20;
    
    // 화면크기 최대 확대율 200%
    if(bodyZoom >= 200){
        bodyZoom = 200;
    }
    zoomsBody();
}

// 원래 화면크기도 되돌아가기
function zoomResetBody() {
    bodyZoom = 100;
    zoomsBody();
}

function zoomsBody() {
    document.body.style.zoom = bodyZoom + "%";
    if(bodyZoom == 70) {
        alert("더 이상 축소할 수 없습니다."); // 화면 축소율이 70% 이하일 경우 
    }
    if(bodyZoom == 200) {
        alert("더 이상 확대할 수 없습니다."); // 화면 확대율이 200% 이상일 경우 
    }
}