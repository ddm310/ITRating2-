// Прокрутка страницы вверх после загрузки
window.onload = function () {
    setTimeout(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 10);
};

// Управление кастомным аудиоплеером (пуск/пауза)
document.querySelector(".play_audio").addEventListener("click", () => {
    if (document.querySelector(".audio").paused) {
        document.querySelector(".audio").play();
        document.querySelector(".play_audio").textContent = "⏸";
    } else {
        document.querySelector(".audio").pause();
        document.querySelector(".play_audio").textContent = "▶";
    }
});

// Автоповтор аудио после завершения
document.querySelector(".audio").addEventListener("ended", () => { 
    document.querySelector(".audio").currentTime = 0; 
    document.querySelector(".audio").play(); 
    document.querySelector(".play_audio").textContent = "⏸"; 
});

// Подготовка карточек экскурсий: alt, aria-label, обработчик кнопки
document.querySelectorAll('.excursion_block_full').forEach(block => {
    const img = block.querySelector('.excursion_img');
    const name = block.querySelector('.excursion_name');
    const btn = block.querySelector('.excursion_btn')

    img.alt = name.textContent.trim();
    btn.ariaLabel = name.textContent.trim();
    btn.type = "button";

    // Переход к форме записи с подстановкой названия экскурсии
    btn.addEventListener('click', () => {
        document.querySelector('[name="topic"]').value = 'Запись на экскурсию "' + name.textContent.trim() + '"';
        document.querySelector('#feedBack').scrollIntoView({ behavior: 'smooth' });
    })
});

// Переключение категорий экскурсий (Франция, Германия, Англия)
document.querySelectorAll('.excursion_button').forEach(button => {
    button.addEventListener('click', () => {

        // Сбрасываем активную кнопку
        document.querySelectorAll('.excursion_button').forEach(btn => btn.classList.remove('excursion_button-active'));
        button.classList.add('excursion_button-active');

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

// Валидация формы и отправка сообщения в Telegram
document.querySelector(".feedback_input_submit").addEventListener("click", function (e) {

    const name = document.querySelector("[name='fn']").value.trim();
    const email = document.querySelector("[name='email']").value.trim();
    const subject = document.querySelector("[name='topic']").value.trim();
    const message = document.querySelector("[name='mess']").value.trim();

    // Проверка ФИО (3 слова, каждое минимум 2 буквы)
    const fioParts = name.split(/\s+/);
    if (fioParts.length !== 3 || fioParts.some(word => word.length < 2)) {
        alert("Введите корректное ФИО.");
        e.preventDefault();
        return;
    }

    // Проверка email по регулярному выражению
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Введите корректный email.");
        e.preventDefault();
        return;
    }

    // Проверка длины темы и сообщения
    if (message.length < 15 || subject.length < 5) {
        alert("Тема должна быть не короче 5 символов. Сообщение должно быть не короче 15 символов.");
        e.preventDefault();
        return;
    }

    // Формирование текста сообщения для Telegram
    const text =
        "Новая заявка с сайта\n\n" +
        "\nИмя: " + name +
        "\nEmail: " + email +
        "\nЗаголовок: " + subject +
        "\nСообщение:\n" + message;

    // Отправка сообщения через Telegram Bot API
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
            document.querySelectorAll('.feedback_input:not(.feedback_input_submit)').forEach(inp => { inp.value = '' });
        })
        .catch(() => {
            alert("Ошибка отправки. Попробуйте позже.");
        });
});
