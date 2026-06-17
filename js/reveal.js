/* ===================================================================
   reveal.js — простой эффект плавного появления блоков при прокрутке
   Работает одинаково на всех устройствах (desktop + mobile).
   Использует IntersectionObserver, без зависимостей.
=================================================================== */

(function () {
    "use strict";

    var prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    var SELECTORS = [
        "section",
        ".card",
        "article",
        ".stat",
        ".contact-info",
        ".contact-form",
        "table"
    ];

    document.addEventListener("DOMContentLoaded", function () {
        var targets = document.querySelectorAll(SELECTORS.join(","));
        if (!targets.length) return;

        targets.forEach(function (el) {
            el.classList.add("reveal");
        });

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            // показываем всё сразу, без анимации
            targets.forEach(function (el) {
                el.classList.add("is-visible");
            });
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        targets.forEach(function (el) {
            observer.observe(el);
        });
    });
})();
