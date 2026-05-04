if (!localStorage.getItem('starsCollected')) {
    localStorage.setItem('starsCollected', 0)
}

if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'RUS');
}

const languageButton = document.querySelector('.nav_button');
const LS_language = localStorage.getItem('language');

languageButton.addEventListener('click', () => {
    if (LS_language == 'BEL') {
        languageButton.textContent = 'BEL';
        languageButton.setAttribute('aria-label', 'Переключение языка на белорусский');
        localStorage.setItem('language', 'RUS');
    } else {
        languageButton.textContent = 'RUS';
        languageButton.setAttribute('aria-label', 'Пераключэнне мовы на рускую');
        localStorage.setItem('language', 'BEL');
    }
    location.reload();
})

if (LS_language == 'RUS') {

    // Проверяем, на какой странице пользователь
    if (window.location.pathname.includes('booking.html')) {
        document.addEventListener('DOMContentLoaded', () => {

            // Получаем параметры из URL
            const urlParams = new URLSearchParams(window.location.search);
            const excursionName = urlParams.get('excursion');

            // Если параметр есть, заполняем поле темы
            if (excursionName) {
                const excursionInput = document.querySelector('[name="excursion"]');
                excursionInput.value = `Запись на экскурсию "${excursionName}"`;
                excursionInput.readOnly = true;
            }


        });
    }

    // #region Star

    if (!localStorage.getItem('starsCollected')) {
        localStorage.setItem('starsCollected', 0)
    }

    const star = document.querySelector('.secret_star');

    if (localStorage.getItem('cheat')) {
        alert('Соберите все звёзды, прежде чем играть в секретную мини-игру.');
        localStorage.removeItem('cheat');
    }

    if (localStorage.getItem('cleared')) {
        alert('Звёзды обнулены, собирайте их заново!');
        localStorage.removeItem('cleared');
    }

    if (star) {

        if (localStorage.getItem(`${star.dataset.page}`) === 'true') {
            star.classList.add('secret_star-collected');
        }

        console.log(localStorage);

        if (localStorage.getItem('starsCollected') === '5' && !document.querySelector('[href="minigame.html"]')) {
            const li = document.createElement('li');
            li.classList.add('nav_item');
            const a = document.createElement('a');
            a.textContent = 'Мини-игра';
            a.href = 'minigame.html';
            a.classList.add('nav_link');
            li.appendChild(a);
            document.querySelector('.main_nav').appendChild(li);
        }

        star.addEventListener('click', () => {
            if (star.classList.contains('secret_star-clicked')) { return; }
            star.classList.add('secret_star-clicked');
            localStorage.setItem(`${star.dataset.page}`, 'true');
            localStorage.setItem('starsCollected', Number(localStorage.getItem('starsCollected')) + 1);
            if (localStorage.getItem('starsCollected') === '5' && !document.querySelector('[href="minigame.html"]')) {
                const li = document.createElement('li');
                li.classList.add('nav_item');
                const a = document.createElement('a');
                a.textContent = 'Мини-игра';
                a.href = 'minigame.html';
                a.classList.add('nav_link');
                li.appendChild(a);
                document.querySelector('.main_nav').appendChild(li);
            }
        })
    }
    // #endregion


    // #region Audio
    const audio = document.querySelector('.audio');

    // Функция для запуска / выключения аудио
    function audioPlay(bool) {
        if (bool) {
            audio.play().catch(e => {
                console.error(`Произошла ошибка при запуске или паузы аудио. Лог ошибки: ${e}`);
                document.querySelector(".play_audio span").textContent = "▶";
                document.querySelector(".play_audio").ariaLabel = "Воспроизвести музыку";
            });
            document.querySelector(".play_audio span").textContent = "⏸";
            document.querySelector(".play_audio").ariaLabel = "Поставить музыку на паузу";
        } else {
            audio.pause();
            document.querySelector(".play_audio span").textContent = "▶";
            document.querySelector(".play_audio").ariaLabel = "Воспроизвести музыку";
        }
    }

    /* // Автозапуск аудио при первом клике пользователя
     document.addEventListener('click', () => {
            audioPlay(audio.paused);
    }, { once: true }); // выполнится один раз
     */
    // Управление кастомным аудиоплеером (пуск/пауза)
    document.querySelector(".play_audio").addEventListener("click", () => {
        if (audio.paused) {
            audioPlay(true);
        } else {
            audioPlay(false);
        }
    });

    // Автоповтор аудио после завершения
    document.querySelector(".audio").addEventListener("ended", () => {
        audio.currentTime = 0;
        audioPlay(true);
    });
    // #endregion


    // #region Telegram
    // #region Functions
    // Функция для валидации полей
    function validate(name, email, subject, message, people, payingMethod) {
        // Проверка ФИО
        const fioParts = name.split(/\s+/);
        if (fioParts.length !== 3 || fioParts.some(word => word.length < 2)) {
            return "Введите корректное ФИО.";
        }

        // Проверка Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Введите корректный email.";
        }

        // Проверка заголовка
        if (subject.length < 5) {
            return "Заголовок должен быть не короче 5 символов.";
        }

        // Проверка и сообщения
        if (message && message.length < 15) {
            return "Сообщение должно быть не короче 15 символов.";
        }

        if (people && people <= 0) {
            return "Количество людей должно превышать 0.";
        }

        if (payingMethod === "") {
            return "Выберите способ оплаты.";
        }

        return false;
    }

    // Функция отправки сообщения в Telegram-бот
    function sendMessage(text, nameOfPage) {
        fetch(`https://api.telegram.org/bot8233373413:AAFXJFUEJuabD4IuGcuvyz4SPRFp0_uIapY/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: "7478877616",
                text: text
            })
        })
            .then(() => {
                alert("Сообщение отправлено! Мы скоро свяжемся с вами.");

                // Очистка полей формы
                document.querySelector(`.${nameOfPage}_content`).reset();
                document.querySelector('.fn').focus();
            })
            .catch(() => {
                alert("Ошибка отправки. Попробуйте позже.");
                document.querySelector('#submit').focus();
            });
    }

    // #endregion

    if (window.location.pathname.includes('feedback.html')) {
        document.querySelector(".feedback_input_submit").addEventListener("click", function (e) {
            e.preventDefault();

            const name = document.querySelector("#f_fn").value.trim();
            const email = document.querySelector("#f_email").value.trim();
            const subject = document.querySelector("#topic").value.trim();
            const message = document.querySelector("#mess").value.trim();
            const validationResult = validate(name, email, subject, message, undefined, undefined);

            if ([name, subject, email, message].some(x => x === '')) {
                alert('Все поля должны быть заполнены.');
                return;
            } else if (validationResult) {
                alert(validationResult);
                return;
            }
            // Формирование текста для Telegram
            const text =
                "Обратная связь!\n" +
                "\nИмя: " + name +
                "\nEmail: " + email +
                "\nЗаголовок: " + subject +
                "\nСообщение:\n" + message;

            sendMessage(text, 'feedback');
        })
    } else if (window.location.pathname.includes('booking.html')) {
        document.querySelector(".booking_input_submit").addEventListener("click", function (e) {
            e.preventDefault();

            const name = document.querySelector("#b_fn").value.trim();
            const email = document.querySelector("#b_email").value.trim();
            const excursion = document.querySelector("#excursion").value.trim();
            const notes = document.querySelector("#notes").value.trim();
            const people = document.querySelector("#people").value.trim();
            const payingMethod = document.querySelector("#paying_method").value.trim();
            const validationResult = validate(name, email, excursion, undefined, people, payingMethod);

            if ([name, excursion, email, people, payingMethod].some(x => x === '')) {
                alert('Все поля кроме примечаний должны быть заполнены.');
                return;
            } else if (validationResult) {
                alert(validationResult);
                return;
            }


            // Формирование текста для Telegram
            const text =
                "Запись на экскурсию!\n" +
                "\nИмя: " + name +
                "\nEmail: " + email +
                "\nНазвание экскурсии: " + excursion +
                "\nКол-во людей: " + people +
                "\nСпособ оплаты: " + payingMethod +
                (notes ? "\nПримечания: " + notes : "\nПримечаний нет");


            sendMessage(text, 'booking');
        })
    }
    // #endregion
} else {

    document.title = 'Архітэктурныя жамчужыны Віцебска';
    document.querySelector('.nav_button').textContent = 'RUS';
    document.querySelectorAll('.nav_link').forEach(link => {
        switch (link.getAttribute('href')) {
            case 'index.html':
                link.textContent = 'Галоўная';
                break;
            case 'excursion.html':
                link.textContent = 'Экскурсіі';
                break;
            case 'quiz.html':
                link.textContent = 'Віктарына';
                break;
            case 'about.html':
                link.textContent = 'Пра нас';
                break;
            case 'feedback.html':
                link.textContent = 'Зваротная сувязь';
                break;
            case 'minigame.html':
                link.textContent = 'Міні-гульня';
                break;
        }
    });
    document.querySelector('.play_audio').setAttribute('aria-label', 'Прайграць музыку');
    document.querySelector('.footer_social_reserved').textContent = 'Усе правы абаронены';
    document.querySelector('.name').textContent = 'Майстэрня';


    const page = window.location.pathname.split('/').pop();

    if (page != 'index.html') {
        document.querySelector('.breadcrumbs_link').textContent = 'Галоўная';
        const breadcrumbsCurrent = document.querySelector('.breadcrumbs_current');
        switch (breadcrumbsCurrent.textContent) {
            case 'Экскурсии':
                breadcrumbsCurrent.textContent = 'Экскурсіі';
                break;
            case 'Запись на экскурсию':
                breadcrumbsCurrent.textContent = 'Запіс на экскурсію';
                break;
            case 'Викторина':
                breadcrumbsCurrent.textContent = 'Віктарына';
                break;
            case 'О нас':
                breadcrumbsCurrent.textContent = 'Пра нас';
                break;
            case 'Обратная связь':
                breadcrumbsCurrent.textContent = 'Зваротная сувязь';
                break;
            case 'Мини-игра':
                breadcrumbsCurrent.textContent = 'Міні-гульня';
                break;
        }
    }

    switch (page) {
        case 'index.html':
            document.querySelector('.main_img').alt = 'Панарама архітэктурных жамчужын Віцебска';
            document.querySelector('.main_heading').textContent = 'Архітэктурныя жамчужыны Віцебска';
            document.querySelector('.main_subtitle').textContent = 'Папулярная архітэктура Віцебска. Помнікі, будынкі, унікальны стыль.';
            document.querySelector('.main_button').textContent = 'Усё пра Віцебск';
            break;
        case 'excursion.html':
            document.querySelector('.excursion_text').textContent = 'Экскурсіі';
            document.querySelector('[data-id="oldcity"]').textContent = 'Стары горад';
            document.querySelector('[data-id="oldcity"]').setAttribute('aria-label', 'Экскурсіі ў Старым горадзе');
            document.querySelector('[data-id="zadvine"]').textContent = 'Задзвінне';
            document.querySelector('[data-id="zadvine"]').setAttribute('aria-label', 'Экскурсіі ў Задзвінне');
            document.querySelector('[data-id="newcity"]').textContent = 'Сёння';
            document.querySelector('[data-id="newcity"]').setAttribute('aria-label', 'Экскурсіі ў сучаснай частцы горада');
            document.querySelectorAll('.excursion_btn').forEach(btn => btn.textContent = 'Запісацца');
            const translationsBel = {
                cards: {
                    "Золотая рыбка с ключиком": "Залатая рыбка з ключыкам",
                    "Главная улица старого города": "Галоўная вуліца старога горада",
                    "Свято-Успенский кафедральный собор": "Свята-Успенскі кафедральны сабор",
                    "Витебский краеведческий музей": "Віцебскі краязнаўчы музей",
                    "Пушкинский пешеходный мост": "Пушкінскі пешаходны мост",
                    "Храм пресвятой богородицы": "Храм Прасвятой Багародзіцы",
                    "Дом-музей Марка Шагала": "Дом-музей Марка Шагала",
                    "Любавичская синагога": "Любавіцкая сінагога",
                    "Золотое кольцо города «Двина»": "Залатое колца горада «Дзвіна»",
                    "Французская скрипка в Витебске": "Французская скрыпка ў Віцебску",
                    "Железнодорожный вокзал Витебска": "Чыгуначны вакзал Віцебска",
                    "Ликёро-водочный завод «Придвинье»": "Лікёра-гаралчаны завод «Прыдзвінне»",
                    "Открытый летний амфитеатр": "Адкрыты летні амфітэатр",
                    "Мемориал «Площадь Победы»": "Мемарыял «Плошча Перамогі»",
                    "Бизнес-центр «Марко-Сити»": "Бізнес-цэнтр «Марка-Сіці»",
                    "Жилой комплекс «Панорама»": "Жылы комплекс «Панарама»",
                    "Памятник «Витебский великан»": "Помнік «Віцебскі волат»",
                    "Технологический университет": "Тэхналагічны ўніверсітэт"
                },

                addresses: {
                    "Золотая рыбка с ключиком": "Вуліца Талстога, 2",
                    "Главная улица старого города": "Вуліца Суворава, 1",
                    "Свято-Успенский кафедральный собор": "Вуліца Крылова, 9",
                    "Витебский краеведческий музей": "Вуліца Леніна, 36",
                    "Пушкинский пешеходный мост": "Вуліца Пушкіна, 1",
                    "Храм пресвятой богородицы": "Вуліца Замкавая, 1",
                    "Дом-музей Марка Шагала": "Вуліца Пакроўская, 11",
                    "Любавичская синагога": "Вуліца Рэвалюцыйная, 10",
                    "Золотое кольцо города «Двина»": "Вуліца Чайкоўскага, 3",
                    "Французская скрипка в Витебске": "Вуліца Пакроўская, 9",
                    "Железнодорожный вокзал Витебска": "Вуліца Касманаўтаў, 10",
                    "Ликёро-водочный завод «Придвинье»": "Вуліца Рэвалюцыйная, 45",
                    "Открытый летний амфитеатр": "Праспект Фрунзэ, 13а",
                    "Мемориал «Площадь Победы»": "Вуліца Леніна",
                    "Бизнес-центр «Марко-Сити»": "Вуліца Леніна, 26А",
                    "Жилой комплекс «Панорама»": "Праспект Чарняхоўскага, 44",
                    "Памятник «Витебский великан»": "Вуліца Суворава, 3",
                    "Технологический университет": "Маскоўскі праспект, 72"
                }
            };
            document.querySelectorAll('.excursion_card').forEach(card => {
                const cardName = card.querySelector('.excursion_name').textContent.trim();
                card.querySelector('.excursion_name').textContent = translationsBel.cards[cardName];
                card.querySelector('.excursion_address').textContent = translationsBel.addresses[cardName];
                card.querySelector('img').alt = translationsBel.cards[cardName];
            })
            document.querySelector('.map_text').textContent = 'Інтэрактыўная карта';
            document.querySelector('iframe').title = 'Карта славутасцяў Віцебска';
            document.querySelector('iframe').src = 'https://www.google.com/maps/d/u/2/embed?mid=1_GloOgGYM23ymJaR7-gwCuvPLn0Poic&hl=be&ehbc=2E312F';
            break;
        case 'booking.html':
            document.querySelector('.booking_title').textContent = 'Запіс на экскурсію';
            document.querySelector('[for="b_fn"]').textContent = 'Поўнае ПІБ';
            document.querySelector('#b_fn').placeholder = 'Поўнае ПІБ, напрыклад: Іваноў Іван Іванавіч';
            document.querySelector('#b_email').placeholder = 'Email, напрыклад: example@gmail.com';
            document.querySelector('[for="excursion"]').textContent = 'Экскурсія';
            document.querySelector('#excursion').placeholder = 'Экскурсія';
            document.querySelector('[for="people"]').textContent = 'Колькасць людзей';
            document.querySelector('#people').placeholder = 'Колькасць людзей';
            document.querySelector('[for="paying_method"]').textContent = 'Спосаб аплаты';
            document.querySelector('#paying_method').placeholder = 'Спосаб аплаты';
            document.querySelector('#paying_method').title = 'Абярыце адзін з пунктаў спісу.';
            document.querySelector('[value="Наличные в BYN"]').textContent = 'Наяўныя грошы (BYN)';
            document.querySelector('[value="Иностранные наличные"]').textContent = 'Наяўныя грошы (замежная валюта)';
            document.querySelector('[value="Карта"]').textContent = 'Банкаўская карта';
            document.querySelector('[value="Онлайн перевод"]').textContent = 'Анлайн пераклад';
            document.querySelector('[value=""]').textContent = 'Спосаб аплаты';
            document.querySelector('[for="notes"]').textContent = 'Нататкі';
            document.querySelector('#notes').placeholder = 'Нататкі, напрыклад: "З намі будзе дзіця"';
            document.querySelector('#submit').value = 'Адправіць';
            break;
        case 'quiz.html':
            document.querySelector('.quiz_text').textContent = 'Віктарына па архітэктуры Віцебска';
            document.querySelector('.quiz_verdict').textContent = 'Адкажыце на ўсе пытанні, каб даведацца хто вы.';
            document.querySelector('.quiz_correct_answers_count').textContent = 'Правільна адказаных пытанняў: 0';
            document.querySelector('.quiz_wrong_answers_count').textContent = 'Няправільна адказаных пытанняў: 0';
            document.querySelector('.quiz_answered_questions_count').textContent = 'Адказных пытанняў: 0';
            document.querySelector('.quiz_not_answered_questions_count').textContent = 'Неадказных пытанняў: 10';
            document.querySelector('.quiz_restart').textContent = 'Пачаць нанова';
            break;
        case 'about.html':
            document.querySelector('.team_title').textContent = 'Наша каманда';
            document.querySelector('.team_subtitle').textContent = 'Мы — каманда прафесіяналаў, закаханых у эстэтыку роднага горада. Як майстры мінулага па цэглінцы узводзілі Ратушу і Успенскі сабор, так і мы ствараем нашы праекты з увагай да кожнай дэталі. Нас аб\'ядноўвае імкненне спалучаць класічныя традыцыі Віцебска з інавацыямі будучыні. Мы не проста працуем — мы будуем гісторыю разам з вамі.';
            document.querySelector('.team_img').alt = 'Архітэктурная дэталь старажытнага будынка ў Віцебску';
            document.querySelector('[alt="Трубкина Дарья Сергеевна"]').alt = 'Трубкіна Дар\'я Сяргееўна';
            document.querySelector('[alt="Селицкий Максим Александрович"]').alt = 'Сяліцкі Максім Аляксандравіч';
            document.querySelector('[alt="Кучеров Михаил Алексеевич"]').alt = 'Кучараў Міхаіл Аляксеевіч';
            document.querySelector('.vit_title').textContent = 'Віцебск - гармонія гісторыі, культуры і святла';
            document.querySelector('.vit_subtitle').textContent = 'Віцебск — горад, дзе гісторыя і сучаснасць пераплятаюцца ў адзіным рытме, ствараючы непаўторны архітэктурны воблік: велічны Успенскі сабор узвышаецца над Дзвіной як светлы сімвал горада, Ратуша захоўвае дух старажытнага Віцебска і нагадвае аб магдебургскім праве, утульны дом-музей Марка Шагала беражліва ўтрымлівае памяць пра дзяцінства вялікага мастака, неагатычны касцёл Святой Варвары дадае еўрапейскай вытанчанасці, амфітэатр «Славянскага базару» задае сучасны культурны тон, а губернатарскі палац у класічным стылі завяршае гэты гарманічны ансамбль, ператвараючы Віцебск у горад, які хочацца адкрываць зноў.';
            document.querySelector('.vit_link').textContent = 'Азнаёміцца';
            break;
        case 'feedback.html':
            document.querySelector('.feedback_title').textContent = 'Зваротная сувязь';
            document.querySelector('[for="f_fn"]').textContent = 'Поўнае ПІБ';
            document.querySelector('#f_fn').placeholder = 'Поўнае ПІБ, напрыклад: Іваноў Іван Іванавіч';
            document.querySelector('#f_email').placeholder = 'Email, напрыклад: example@gmail.com';
            document.querySelector('[for="topic"]').textContent = 'Тэма';
            document.querySelector('#topic').placeholder = 'Тэма, напрыклад: "Знойдзена памылка"';
            document.querySelector('[for="mess"]').textContent = 'Паведамленне';
            document.querySelector('#mess').placeholder = 'Паведамленне';
            document.querySelector('#submit').value = 'Адправіць';
            break;
        case 'minigame.html':
            document.querySelector('.game_text').textContent = 'Гульня на памяць';
            document.querySelector('.game_rules').textContent = 'Праверце сваю памяць! Перад вамі 8 картак - 4 пары знакамітых будынкаў Віцебска. Адкрывайце па дзве карткі і знаходзіце аднолькавыя. Калі адкрыеце ўсе пары - вы перамаглі!';
            document.querySelector('.game_restart').textContent = 'Гуляць нанава';
            document.querySelector('.game_clear').textContent = 'Абнуліць зоркі';
            break;
    }

    // #region Script.js
    // Проверяем, на какой странице пользователь
    if (window.location.pathname.includes('booking.html')) {
        document.addEventListener('DOMContentLoaded', () => {

            // Получаем параметры из URL
            const urlParams = new URLSearchParams(window.location.search);
            const excursionName = urlParams.get('excursion');

            // Если параметр есть, заполняем поле темы
            if (excursionName) {
                const excursionInput = document.querySelector('[name="excursion"]');
                excursionInput.value = `Запіс на экскурсію "${excursionName}"`;
                excursionInput.readOnly = true;
            }
        });
    }

    // #region Star

    if (!localStorage.getItem('starsCollected')) {
        localStorage.setItem('starsCollected', 0)
    }

    const star = document.querySelector('.secret_star');

    if (localStorage.getItem('cheat')) {
        alert('Збярыце ўсе зоркі, перш чым гуляць у сакрэтную міні-гульню.');
        localStorage.removeItem('cheat');
    }

    if (localStorage.getItem('cleared')) {
        alert('Зоркі абнулены, збірайце іх нанова!');
        localStorage.removeItem('cleared');
    }

    if (star) {

        if (localStorage.getItem(`${star.dataset.page}`) === 'true') {
            star.classList.add('secret_star-collected');
        }

        console.log(localStorage);

        if (localStorage.getItem('starsCollected') === '5' && !document.querySelector('[href="minigame.html"]')) {
            const li = document.createElement('li');
            li.classList.add('nav_item');
            const a = document.createElement('a');
            a.textContent = 'Міні-гульня';
            a.href = 'minigame.html';
            a.classList.add('nav_link');
            li.appendChild(a);
            document.querySelector('.main_nav').appendChild(li);
        }

        star.addEventListener('click', () => {
            if (star.classList.contains('secret_star-clicked')) { return; }
            star.classList.add('secret_star-clicked');
            localStorage.setItem(`${star.dataset.page}`, 'true');
            localStorage.setItem('starsCollected', Number(localStorage.getItem('starsCollected')) + 1);
            if (localStorage.getItem('starsCollected') === '5' && !document.querySelector('[href="minigame.html"]')) {
                const li = document.createElement('li');
                li.classList.add('nav_item');
                const a = document.createElement('a');
                a.textContent = 'Міні-гульня';
                a.href = 'minigame.html';
                a.classList.add('nav_link');
                li.appendChild(a);
                document.querySelector('.main_nav').appendChild(li);
            }
        })
    }
    // #endregion


    // #region Audio
    const audio = document.querySelector('.audio');

    // Функция для запуска / выключения аудио
    function audioPlay(bool) {
        if (bool) {
            audio.play().catch(e => {
                console.error(`Адбылася памылка пры запуску ці паўзы аўдыё. Лог памылкі: ${e}`);
                document.querySelector(".play_audio span").textContent = "▶";
                document.querySelector(".play_audio").ariaLabel = "Прайграць музыку";
            });
            document.querySelector(".play_audio span").textContent = "⏸";
            document.querySelector(".play_audio").ariaLabel = "Паставіць музыку на паўзу";
        } else {
            audio.pause();
            document.querySelector(".play_audio span").textContent = "▶";
            document.querySelector(".play_audio").ariaLabel = "Прайграць музыку";
        }
    }

    /* // Автозапуск аудио при первом клике пользователя
     document.addEventListener('click', () => {
            audioPlay(audio.paused);
    }, { once: true });
     */
    // Управление кастомным аудиоплеером (пуск/пауза)
    document.querySelector(".play_audio").addEventListener("click", () => {
        if (audio.paused) {
            audioPlay(true);
        } else {
            audioPlay(false);
        }
    });

    // Автоповтор аудио после завершения
    document.querySelector(".audio").addEventListener("ended", () => {
        audio.currentTime = 0;
        audioPlay(true);
    });
    // #endregion


    // #region Telegram
    // #region Functions
    // Функция для валидации полей
    function validate(name, email, subject, message, people, payingMethod) {
        // Проверка ФИО
        const fioParts = name.split(/\s+/);
        if (fioParts.length !== 3 || fioParts.some(word => word.length < 2)) {
            return "Увядзіце карэктнае ПІБ.";
        }

        // Проверка Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Увядзіце карэктны email.";
        }

        // Проверка заголовка
        if (subject.length < 5) {
            return "Загаловак павінен быць не карацейшы за 5 сімвалаў.";
        }

        // Проверка и сообщения
        if (message && message.length < 15) {
            return "Паведамленне павінна быць не карацей 15 сімвалаў.";
        }

        if (people && people <= 0) {
            return "Колькасць людзей мусіць перавышаць 0.";
        }

        if (payingMethod === "") {
            return "Абярыце спосаб аплаты.";
        }

        return false;
    }

    // Функция отправки сообщения в Telegram-бот
    function sendMessage(text, nameOfPage) {
        fetch(`https://api.telegram.org/bot8233373413:AAFXJFUEJuabD4IuGcuvyz4SPRFp0_uIapY/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: "7478877616",
                text: text
            })
        })
            .then(() => {
                alert("Паведамленне адпраўлена! Мы хутка звяжамся з вамі.");

                // Очистка полей формы
                document.querySelector(`.${nameOfPage}_content`).reset();
                document.querySelector('.fn').focus();
            })
            .catch(() => {
                alert("Памылка адпраўкі. Паспрабуйце пазней.");
                document.querySelector('#submit').focus();
            });
    }

    // #endregion

    if (window.location.pathname.includes('feedback.html')) {
        document.querySelector(".feedback_input_submit").addEventListener("click", function (e) {
            e.preventDefault();

            const name = document.querySelector("#f_fn").value.trim();
            const email = document.querySelector("#f_email").value.trim();
            const subject = document.querySelector("#topic").value.trim();
            const message = document.querySelector("#mess").value.trim();
            const validationResult = validate(name, email, subject, message, undefined, undefined);

            if ([name, subject, email, message].some(x => x === '')) {
                alert('Усе палі павінны быць запоўненыя.');
                return;
            } else if (validationResult) {
                alert(validationResult);
                return;
            }
            // Формирование текста для Telegram
            const text =
                "Обратная связь (BEL)!\n" +
                "\nИмя: " + name +
                "\nEmail: " + email +
                "\nЗаголовок: " + subject +
                "\nСообщение:\n" + message;

            sendMessage(text, 'feedback');
        })
    } else if (window.location.pathname.includes('booking.html')) {
        document.querySelector(".booking_input_submit").addEventListener("click", function (e) {
            e.preventDefault();

            const name = document.querySelector("#b_fn").value.trim();
            const email = document.querySelector("#b_email").value.trim();
            const excursion = document.querySelector("#excursion").value.trim();
            const notes = document.querySelector("#notes").value.trim();
            const people = document.querySelector("#people").value.trim();
            const payingMethod = document.querySelector("#paying_method").value.trim();
            const validationResult = validate(name, email, excursion, undefined, people, payingMethod);

            if ([name, excursion, email, people, payingMethod].some(x => x === '')) {
                alert('Усе палі акрамя нататак павінны быць запоўненыя.');
                return;
            } else if (validationResult) {
                alert(validationResult);
                return;
            }


            // Формирование текста для Telegram
            const text =
                "Запись на экскурсию (BEL)!\n" +
                "\nИмя: " + name +
                "\nEmail: " + email +
                "\nНазвание экскурсии: " + excursion +
                "\nКол-во людей: " + people +
                "\nСпособ оплаты: " + payingMethod +
                (notes ? "\nПримечания: " + notes : "\nПримечаний нет");


            sendMessage(text, 'booking');
        })
    }
    // #endregion

    // #endregion
}

// За переключением языков, ведь тут нету текста, который надо менять
// #region Excursion
// Подготовка карточек экскурсий: aria-label, обработчик кнопки
document.querySelectorAll('.excursion_card').forEach(block => {
    const name = block.querySelector('.excursion_name').textContent.trim();
    const btn = block.querySelector('.excursion_btn');

    btn.ariaLabel = name;

    // Переход к форме записи с подстановкой названия экскурсии
    btn.addEventListener('click', () => {
        window.location.href = `booking.html?excursion=${encodeURIComponent(name)}`
    })
});

// Переключение категорий экскурсий
document.querySelectorAll('.excursion_button').forEach(button => {
    button.addEventListener('click', () => {

        // Сбрасываем активную кнопку
        document.querySelectorAll('.excursion_button').forEach(btn => btn.classList.remove('excursion_button-active'));
        document.querySelectorAll('.excursion_button[data-id="' + button.dataset.id + '"]').forEach(div => { div.classList.add('excursion_button-active') });

        // Определяем нужный блок по data-id
        const targetId = button.dataset.id + '-block';

        // Показываем нужный блок, скрываем остальные
        document.querySelectorAll('.excursion_block').forEach(block => {
            if (block.id === targetId) {
                block.classList.add('excursion_block-active');
            } else {
                block.classList.remove('excursion_block-active');
            }
        });
    });
});
// #endregion
