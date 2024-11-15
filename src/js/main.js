//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/jquery/dist/jquery.slim.min.js
//= ../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js
//= ../../node_modules/owl.carousel/dist/owl.carousel.min.js
//= ../../node_modules/cloudinary-video-player/dist/cld-video-player.min.js

//= https://www.google.com/recaptcha/api.js


$(function() {
    initSelectPicker();
    initFormValidation();
    addScrolledClassToNavbarOnScroll();
    carouselsSetup(document.documentElement.getAttribute("dir") == 'rtl');
    initRecaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', ".grecaptcha");
    initScrollToTopBtnHandler();
    initDropZone();
});

function initSelectPicker() {
    $('.selectpicker').selectpicker();
    const selectPickers = document.querySelectorAll('.selectpicker')
    selectPickers.forEach(function(picker) {
        picker.addEventListener('invalid', (e) => {
            console.log("e", picker.value);
            const parentControl = picker.closest('.dropdown.bootstrap-select');
            if (parentControl) {
                parentControl.classList.add('is-invalid')
                picker.addEventListener("change", (e) => {
                    parentControl.classList.remove('is-invalid')
                }, { once: true });
            }
        })
    });
}

function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => genericFormsValidation(event, form));
    })
}

function validateFormWithDismissibleAlerts(event, form) {
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity()) {
        // TODO: send request to server

        // cleanup the data
        form.reset();
        form.classList.remove('was-validated');

        const confirmationModal = new bootstrap.Modal(document.getElementById('requestAcceptedModal'));
        if (confirmationModal) {
            confirmationModal.show();
        }
    } else {
        form.classList.add('was-validated');
    }
}


function genericFormsValidation(event, form) {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
}

function carouselsSetup(userRtl) {
    const rtl = !!userRtl;
    console.log(rtl)
    /**
     * carousel setup
     */
    $(function() {
        if ($('.creative-mode .owl-carousel').length > 0) {
            $('.creative-mode .owl-carousel').owlCarousel({
                loop: true,
                rtl: rtl,
                margin: 10,
                responsiveClass: true,
                autoplay: false,
                autoplayTimeout: 3000,
                nav: false,
                dots: false,

                responsive: {
                    0: {
                        items: 2,
                        stagePadding: 5
                    },
                    576: {
                        items: 4,
                        stagePadding: 10
                    },
                    768: {
                        items: 4,
                        stagePadding: 10
                    },
                    1200: {
                        items: 5,
                        stagePadding: 46
                    },
                    1400: {
                        items: 5
                    }
                }
            })
        }
    });

    $(function() {
        if ($('.style-picture .owl-carousel').length > 0) {
            $('.style-picture .owl-carousel').owlCarousel({
                loop: false,
                rtl: rtl,
                margin: 10,
                responsiveClass: true,
                autoplay: false,
                autoplayTimeout: 3000,
                nav: false,
                dots: false,
                center: false,
                stagePadding: 40,

                responsive: {
                    0: {
                        items: 2,
                    },
                    576: {
                        items: 3,
                    },
                    768: {
                        items: 4,
                    },
                    1200: {
                        items: 5,
                    },
                    1400: {
                        items: 8
                    }
                }
            })
        }
    });

    $(function() {
        if ($('.btn-groups .owl-carousel').length > 0) {
            $('.btn-groups .owl-carousel').owlCarousel({
                loop: true,
                rtl: rtl,
                margin: 5,
                responsiveClass: true,
                autoplay: false,
                autoplayTimeout: 3000,
                nav: false,
                dots: false,

                responsive: {
                    0: {
                        items: 3,
                        stagePadding: 5
                    },
                    576: {
                        items: 3,
                        stagePadding: 5
                    },
                    768: {
                        items: 4,
                        stagePadding: 10
                    },
                    1200: {
                        items: 5,
                        stagePadding: 46
                    },
                    1400: {
                        items: 6
                    }
                }
            })
        }
    });
}

/**
 * navbar scrolled
 */
function addScrolledClassToNavbarOnScroll() {
    const navbar = document.querySelector('.top-navbar')
    if (!navbar) return;

    const updateScrolledState = () => {
        navbar.classList.toggle('scrolled', window.scrollY != 0);
    }

    window.addEventListener('scroll', (e) => {
        updateScrolledState();
    })

    updateScrolledState();
}

/**
 * navbar scrolled
 */
function setupArrowUpLogic() {

    /**
     * marker is an element on a page. When it becomes not visible, the arrow up icon appears on the page
     */
    const marker = document.querySelector('.scroll-to-top-marker');
    const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');
    if (!marker || !scrollToTopBtn) return;

    const updateScrolledState = () => {
        navbar.classList.toggle('scrolled', window.scrollY != 0);
    }

    window.addEventListener('scroll', (e) => {
        updateScrolledState();
    })

    updateScrolledState();
}

/**
 * File picker
 */
$(function() {
    $('#attachment-file-input').on('change', function(e) {
        $('.attachment-file-name').text(this.files[0].name)
    });

    $('.chose-attachment-file-btn').on('click', function(e) {
        e.preventDefault();
        $("#attachment-file-input").click();
    })
})

/**
 * Navbar toggler
 */
$(function() {
    var menuToggler = document.querySelector('.navbar .navbar-collapse');
    var navbar = document.querySelector('.navbar');
    if (!navbar || !menuToggler) return;

    menuToggler.addEventListener('shown.bs.collapse', function() {
        console.log("test ")
        navbar.classList.add('menu-visible')
    });

    menuToggler.addEventListener('hidden.bs.collapse', function() {
        console.log("test 2")
        navbar.classList.remove('menu-visible')
    });
});

/**
 * Recaptcha
 */
function initRecaptcha(sitekey, containerSelector) {
    const recaptchaContainers = document.querySelectorAll(containerSelector);
    recaptchaContainers.forEach(recaptchaContainer => {
        // If reCAPTCHA is still loading, grecaptcha will be undefined.
        recaptchaContainer.setAttribute("data-theme", "dark");
        grecaptcha.ready(function() {
            grecaptcha.render(recaptchaContainer, {
                sitekey: sitekey,
            });

        });
    })
}

/**
 * Initializes the scroll to top button logic. 
 * The scroll to top button appears on the page when the element with the class scroll-to-top-marker is not visible (page scrolled)
 */
function initScrollToTopBtnHandler() {
    var scrollToTopButtons = document.querySelectorAll('.scroll-to-top-btn');
    const scrollToTopMarker = document.querySelector('.scroll-to-top-marker');
    if (!scrollToTopButtons.length || !scrollToTopMarker) return;
    
    scrollToTopButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            scrollToTop(100);
        });
    });

    function scrollToTop(durationMs) {
        // cancel if already on top
        if (document.scrollingElement.scrollTop === 0) return;

        const cosParameter = document.scrollingElement.scrollTop / 2;
        let scrollCount = 0,
            oldTimestamp = null;

        function step(newTimestamp) {
            if (oldTimestamp !== null) {
                // if duration is 0 scrollCount will be Infinity
                scrollCount += Math.PI * (newTimestamp - oldTimestamp) / durationMs;
                if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
                document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    const updateScrollToTopMarkerState = () => {
        var rect = scrollToTopMarker.getBoundingClientRect();
        if ((rect.top >= 0) && (rect.bottom <= window.innerHeight)) {
            
        }
        scrollToTopButtons.forEach(btn => {
            btn.classList.toggle('d-none', (rect.top >= 0) && (rect.bottom <= window.innerHeight));
        })
    }

    window.addEventListener('scroll', (e) => {
        updateScrollToTopMarkerState();
    })

    updateScrollToTopMarkerState();
}


function initDropZone() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(dropZone => {
        const dropInstructionsBlock = dropZone.querySelector('.drop-instructions-block');
        const previewBlock = dropZone.querySelector('.preview-block');
        const loadingBlock = dropZone.querySelector('.loading-block');
        const btnResetSelection = dropZone.querySelector('.btn-reset-selection');

        const fileInput =  dropZone.querySelector('.file-input');
        if (!fileInput) {
            console.error("drop zone has no file input")
            return;
        }

        dropInstructionsBlock.addEventListener('click', e => {
            console.log('click')
            fileInput.click();
        });


        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            dropInstructionsBlock.classList.toggle('d-none', !!file);
            loadingBlock.classList.toggle('d-none', !file);
            previewBlock.classList.add('d-none');

            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    loadingBlock.classList.add('d-none');
                    previewBlock.classList.remove('d-none')

                    previewBlock.querySelector('img').src = e.target.result;

                };
                reader.readAsDataURL(file);
            }
        })

        btnResetSelection.addEventListener('click', () => {
            console.log("rest!")
            fileInput.value = "";
            fileInput.dispatchEvent(new Event("change"));
        })
    });
}