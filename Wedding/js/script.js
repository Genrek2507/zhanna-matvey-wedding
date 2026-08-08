document.addEventListener("DOMContentLoaded", () => {


    /* ========================================
       ПЕРСОНАЛЬНЫЙ ГОСТЬ
    ======================================== */

    const params = new URLSearchParams(window.location.search);
    const guestId = params.get("guest");


    /*
       Адрес сайта.

       Пока мы работаем через Live Server,
       поэтому используем текущий адрес страницы.
    */

    const siteUrl =
        window.location.origin + window.location.pathname;


    const guestGreeting = document.getElementById("guestGreeting");
    const personalTitle = document.getElementById("personalTitle");
    const personalText = document.getElementById("personalText");


    /*
       Находим все элементы персонального имени.
       Это позволит использовать data-guest-name
       в разных местах сайта.
    */

    const guestNameElements =
        document.querySelectorAll("[data-guest-name]");


    /*
       Находим QR-код.
    */

    const guestQr =
        document.querySelector("[data-guest-qr]");


    /* ========================================
       ДАННЫЕ ГОСТЯ
    ======================================== */

    if (
        guestId &&
        typeof guests !== "undefined" &&
        guests[guestId]
    ) {

        const guest = guests[guestId];


        /* Имя */

        if (guestGreeting) {
            guestGreeting.textContent = guest.name;
        }


        if (personalTitle) {
            personalTitle.textContent = guest.name;
        }


        /* Персональный текст */

        if (personalText && guest.text) {
            personalText.textContent = guest.text;
        }


        /*
           Меняем все элементы с data-guest-name
           на имя конкретного гостя.
        */

        guestNameElements.forEach(element => {

            element.textContent = guest.name;

        });

     } else {

    /* ========================================
       ГОСТЬ НЕ УКАЗАН
    ======================================== */

    if (guestGreeting) {

        guestGreeting.textContent =
            "Жанна & Матвей";

    }

}

    /* ========================================
       ЗАСТАВКА
    ======================================== */

    const loader =
        document.getElementById("loader");


    setTimeout(() => {

        if (loader) {
            loader.classList.add("loader-hidden");
        }

    }, 2500);



    /* ========================================
       ПЛАВНОЕ ПОЯВЛЕНИЕ СЕКЦИЙ
    ======================================== */

    const animatedElements =
        document.querySelectorAll(
            "section, .photo-frame, .gallery img, " +
            ".timeline-item, .location-card, " +
            ".qr-card"
        );


    animatedElements.forEach(element => {

        element.classList.add("fade-in");

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });



    /* ========================================
       ПЛАВНАЯ ПРОКРУТКА
    ======================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");


                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });



   /* ========================================
   RSVP
======================================== */

const rsvpForm = document.getElementById("rsvpForm");
const formSuccess = document.getElementById("formSuccess");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwT-VJ9pyZExx5Nheth1zi9MCM1BfhJfSZ7F2n8HM52vss7kETttXP3BbcYxwiOQwwE/exec";


if (rsvpForm) {

    rsvpForm.addEventListener("submit", async event => {

        event.preventDefault();


        const submitButton =
            rsvpForm.querySelector(".rsvp-submit");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Отправляем...";
        }


        const guestName =
            document.getElementById("guestName")?.value.trim() || "";

        const attendance =
            document.querySelector(
                'input[name="attendance"]:checked'
            )?.value || "";

        const comment =
            document.getElementById("comment")?.value.trim() || "";


        const data = {
            guestName: guestName,
            attendance: attendance,
            comment: comment
        };


        try {

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(data)
                }
            );


            rsvpForm.style.display = "none";

            if (formSuccess) {
                formSuccess.classList.add("show");
            }


        } catch (error) {

            console.error(
                "Ошибка отправки RSVP:",
                error
            );


            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                    "Подтвердить присутствие";
            }

            alert(
                "Не удалось отправить ответ. " +
                "Пожалуйста, попробуйте ещё раз."
            );

        }

    });

}


    /* ========================================
       ТАЙМЕР ДО СВАДЬБЫ
    ======================================== */

    const weddingDate =
        new Date("2026-09-05T17:00:00+03:00");


    function updateCountdown() {

        const now =
            new Date();


        const difference =
            weddingDate - now;


        const days =
            document.getElementById("days");

        const hours =
            document.getElementById("hours");

        const minutes =
            document.getElementById("minutes");

        const seconds =
            document.getElementById("seconds");


        if (difference <= 0) {

            if (days) {
                days.textContent = "00";
            }

            if (hours) {
                hours.textContent = "00";
            }

            if (minutes) {
                minutes.textContent = "00";
            }

            if (seconds) {
                seconds.textContent = "00";
            }

            return;

        }


        const totalSeconds =
            Math.floor(difference / 1000);


        const d =
            Math.floor(
                totalSeconds / 86400
            );


        const h =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const m =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const s =
            totalSeconds % 60;


        if (days) {

            days.textContent =
                String(d).padStart(2, "0");

        }


        if (hours) {

            hours.textContent =
                String(h).padStart(2, "0");

        }


        if (minutes) {

            minutes.textContent =
                String(m).padStart(2, "0");

        }


        if (seconds) {

            seconds.textContent =
                String(s).padStart(2, "0");

        }

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

});