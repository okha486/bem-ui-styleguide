// 가이드 보기위한 스트립트
$(function () {

    // 위로가기
    $('.btn_top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 });
    });
    
    /* *******************************
    * 컨텐츠 구동 함수
    ********************************** */
    fnTab();    // 탭
    fnShowBtn(); // 화살표 위_아래 토글 버튼
    fnAccordion();  // 아코디언 메뉴
    fnModal();  // 팝업 (레이어)
    fnBannerPop(); // 배너 클릭 팝업
    fnZooms(); // 축소,확대 - zoom_container 영역지정
    fnZoomBody(); // 축속,확대 - body
    fnSwiper(); // 슬라이드
});


// 탭
function fnTab() {
    document.querySelectorAll('.tabs').forEach(function (tabs) {
        var tabButtons = tabs.querySelectorAll('.tabs__tab');
        var tabPanels = tabs.querySelectorAll('.tabs__panel');

        function activateTab(index, setFocus) {
            tabButtons.forEach(function (button, i) {
                var isSelected = i === index;

                button.classList.toggle('is-active', isSelected);
                button.setAttribute('aria-selected', String(isSelected));
                button.setAttribute('tabindex', isSelected ? '0' : '-1');

                if (tabPanels[i]) {
                    tabPanels[i].hidden = !isSelected;
                }
            });

            if (setFocus) {
                tabButtons[index].focus();
            }
        }

        tabButtons.forEach(function (button, index) {
            button.addEventListener('click', function () {
                activateTab(index, true);
            });

            button.addEventListener('keydown', function (event) {
                var nextIndex = index;

                if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    nextIndex = (index + 1) % tabButtons.length;
                    activateTab(nextIndex, true);
                }

                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    activateTab(nextIndex, true);
                }

                if (event.key === 'Home') {
                    event.preventDefault();
                    activateTab(0, true);
                }

                if (event.key === 'End') {
                    event.preventDefault();
                    activateTab(tabButtons.length - 1, true);
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activateTab(index, true);
                }
            });
        });

        var initialIndex = Array.from(tabButtons).findIndex(function (button) {
            return button.classList.contains('is-active') || button.getAttribute('aria-selected') === 'true';
        });

        activateTab(initialIndex > -1 ? initialIndex : 0, false);
    });
}

// 버튼 아이콘 확인
function fnShowBtn() {
    $('.js-toggle').on('click', function () {
        $(this).toggleClass('active');

        var targetDivId = $(this).data('target');
        var display = $("#" + targetDivId).css("display");
        if (display === 'none') {
            $('#' + targetDivId).slideDown(300);
        } else {
            $("#" + targetDivId).slideUp(300);
        }
    });
}

// 아코디언 메뉴
function fnAccordion() {
    var accordionButton = $('.accordion__list .accordion__item > .accordion__trigger');
    accordionButton.on('click', function(e){
        e.preventDefault();
        var $this = $(this);
        var target = $this.parent();
        var description = $this.siblings('.accordion__panel');
        var other = target.siblings('.accordion__item');
        var otherDescription = other.find('.accordion__panel');
        accordionToggle(target, description, other, otherDescription);
    });

    // 파라미터 정리
    // target = 아이템 활성화 버튼
    // description = 활성화 콘텐츠
    // other = 활성화 시킬때 다른 형제 아이템 활성화 버튼
    // otherDescription = 활성화 시킬때 다른 형제 아이템 활성화 콘텐츠
    function accordionToggle(target, description, other, otherDescription){
        if (target.hasClass('active')) {
        target.removeClass('active');
        description.stop().slideUp(300);
        } else {
        target.addClass('active');
        description.stop().slideDown(300);
        }

        // other, otherDescription 파라미터는 아코디언을 활성화 시킬때 다른 활성화된 아이템을 접기 위한 파라미터 입니다. 만약 다른 아이템들은 접히지 않아도 된다면 해당 파라미터를 비워두면 됩니다.
        if (other && otherDescription) {
        other.removeClass('active');
        otherDescription.stop().slideUp(300);
        }
    };
}

// 슬라이드
function fnSwiper() { 
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,       // 슬라이드 사이 여백
        slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
        centeredSlides: true,   //센터모드 
        autoplay: {             //자동슬라이드 (false-비활성화)
            delay: 2500,        // 시간 설정 
            disableOnInteraction: false, // false-스와이프 후 자동 재생
        },
        loop : false,               // 슬라이드 반복 여부
        loopAdditionalSlides : 1,   // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
        pagination: {               // 호출(pager) 여부
            el: ".swiper-pagination",   //버튼을 담을 태그 설정
            clickable: true,            // 버튼 클릭 여부
            renderBullet: function (index, className) { // 번호 표기
              return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        navigation: {   // 버튼
            nextEl: ".swiper-button-next", 
            prevEl: ".swiper-button-prev", 
        },
        a11y: {
            prevSlideMessage: '이전 슬라이드',
            nextSlideMessage: '다음 슬라이드',
            slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
        },
    });

    // 재생,정지 버튼
    // const btnStart = document.querySelector('.carouse_start');
    // const btnStop = document.querySelector('.carouse_stop');
    // btnStop.addEventListener('click', () => {
    //     swiper.autoplay.stop();
    //     btnStop.setAttribute('aria-pressed', 'true');
    //     btnStart.setAttribute('aria-pressed', 'false');
    // });
    // btnStart.addEventListener('click', () => {
    //     swiper.autoplay.start();
    //     btnStart.setAttribute('aria-pressed', 'true');
    //     btnStop.setAttribute('aria-pressed', 'false');
    // });

    // 재생,정지 토글 버튼
    var btnToggle = $('.carousel__toggle');
    btnToggle.on('click', function () {
        if (swiper.autoplay.running) {
        swiper.autoplay.stop();

        $(this)
            .text('재생')
            .attr('aria-label', '자동재생 시작');

        } else {
        swiper.autoplay.start();

        $(this)
            .text('정지')
            .attr('aria-label', '자동재생 정지');
        }
    });
}

// 모달(레이어) 팝업
function fnModal() {
    var openButton = document.getElementById('openModal'); // id 찾아서 모달 열기
    var modal = document.getElementById('modalSample'); // modalSample 모달 요소 찾기

    // 필요한 요소가 없으면 함수 종료
    if (!openButton || !modal) {
        return;
    }

    var modalDialog = modal.querySelector('.modal__dialog');    // 실제 모달 콘텐츠 영역
    var closeButtons = modal.querySelectorAll('[data-modal-close]');    // 모달 닫기 버튼 

    // 다이얼로그가 없으면 종료
    if (!modalDialog) {
        return;
    }

    // 모달이 열리기 전, 마지막으로 포커스가 있던 요소를 저장할 변수
    let lastFocusedElement = null;

    /**
     * 모달 안에서 포커스 가능한 요소들을 찾는 함수
     * 
     * 대상:
     * - 링크(a)
     * - 버튼(button)
     * - textarea
     * - input
     * - select
     * - tabindex가 -1이 아닌 요소
     * 
     * 접근성에서 필요한 이유:
     * 모달이 열려 있을 때 Tab 키로 이동 가능한 요소를 제한하기 위해 사용
     */
    function getFocusableElements(container) {
        return container.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
    }

    // 모달 열기 함수
    function openModal() {
        lastFocusedElement = document.activeElement;    // 현재 포커스된 요소 저장
        modal.classList.add('is-open');     // 모달 열기 클래스
        modal.setAttribute('aria-hidden', 'false');     // 스크린리더에 모달이 현재 열려 있음을 전달 - aria-hidden 값을 false로 변경
        document.body.style.overflow = 'hidden';    // 모달이 열리면 body 스크롤 막기
        modalDialog.focus();    // 모달 다이얼로그 영역으로 포커스 이동
        document.addEventListener('keydown', handleKeydown);    // ESC / Tab 제어를 위한 keydown 이벤트 
    }

    // 모달 닫기 함수
    function closeModal() {
        modal.classList.remove('is-open');  // 모달 닫기 클래스
        modal.setAttribute('aria-hidden', 'true');  // 스크린리더에 모달이 닫혔음을 전달
        document.body.style.overflow = '';  // body 스크롤 원상복구
        document.removeEventListener('keydown', handleKeydown); // 모달이 닫혔으므로 키보드 이벤트 해제
        
        // 모달 열기 전 포커스가 있던 요소로 복귀
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // 키보드 제어 함수
    function handleKeydown(e) {

        // ESC 키를 누르면 모달 닫기
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        // Tab 키를 누를 때만 포커스 순환 처리
        if (e.key === 'Tab') {
            const focusableElements = getFocusableElements(modalDialog);    // 모달 안에서 포커스 가능한 요소들 찾기
            const firstElement = focusableElements[0];  // 첫 번째 포커스 요소
            const lastElement = focusableElements[focusableElements.length - 1];    // 마지막 포커스 요소

            // 포커스 가능한 요소가 하나도 없으면
            // Tab 이동이 바깥으로 빠지지 않도록 기본 동작 막음
            if (!focusableElements.length) {
                e.preventDefault();
                return;
            }

            // Shift + Tab 인데 현재 첫 번째 요소에 포커스가 있으면
            // 마지막 요소로 이동시켜 순환 처리
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();

            // 일반 Tab 인데 현재 마지막 요소에 포커스가 있으면
            // 첫 번째 요소로 이동시켜 순환 처리
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    // 열기 버튼 클릭 시 모달 열기
    openButton.addEventListener('click', openModal);

    // 닫기 버튼이 여러 개일 수 있으므로 각각 클릭 이벤트 연결
    closeButtons.forEach(function (button) {
        button.addEventListener('click', closeModal);
    });
}

// 배너 클릭 팝업
function fnBannerPop() {
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const modals = document.querySelectorAll('.banner-list__modal');

    let activeModal = null;
    let activeTrigger = null;

    function getFocusableElements(container) {
        return container.querySelectorAll(
            'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex="-1"])'
        );
    }

    function openModal(modal, trigger) {
        if (!modal) return;

        activeModal = modal;
        activeTrigger = trigger;

        modal.hidden = false;
        document.body.style.overflow = 'hidden';

        if (trigger) {
            trigger.setAttribute('aria-expanded', 'true');
        }

        const dialog = modal.querySelector('.modal__dialog');
        if (dialog) {
            dialog.focus();
        }
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.hidden = true;
        document.body.style.overflow = '';

        if (activeTrigger) {
            activeTrigger.setAttribute('aria-expanded', 'false');
            activeTrigger.focus();
        }

        activeModal = null;
        activeTrigger = null;
    }

    openButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-open');
            const targetModal = document.getElementById(modalId);

            openModal(targetModal, this);
        });
    });

    modals.forEach(function(modal) {
        const closeTargets = modal.querySelectorAll('[data-modal-close]');
        const dialog = modal.querySelector('.modal__dialog');

        closeTargets.forEach(function(closeTarget) {
            closeTarget.addEventListener('click', function(event) {
                if (event.target === dialog) return;
                closeModal(modal);
            });
        });

        if (dialog) {
            dialog.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }

        modal.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal(modal);
                return;
            }

            if (event.key === 'Tab') {
                const focusableElements = getFocusableElements(modal);
                const focusableArray = Array.prototype.slice.call(focusableElements);

                if (focusableArray.length === 0) {
                    event.preventDefault();
                    return;
                }

                const firstElement = focusableArray[0];
                const lastElement = focusableArray[focusableArray.length - 1];

                if (event.shiftKey) {
                    if (document.activeElement === firstElement || document.activeElement === dialog) {
                        event.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    });
}

// 축소, 확대 영역지정
function fnZooms() {
    var now_zoom = 100;
    var min_zoom = 70;
    var max_zoom = 200;
    var step_zoom = 10;

    var $zoom_container = $('.zoom__container');
    var $zoom_wrap = $('.zoom__content');
    var $zoom_value = $('.zoom__value');

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

// 축속,확대 - body
function fnZoomBody() {
    document.body.style.zoom = bodyZoom + "%";
    if(bodyZoom == 70) {
        alert("더 이상 축소할 수 없습니다."); // 화면 축소율이 70% 이하일 경우 
    }
    if(bodyZoom == 200) {
        alert("더 이상 확대할 수 없습니다."); // 화면 확대율이 200% 이상일 경우 
    }
}
