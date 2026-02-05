window.onload = function () {
    setTimeout(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 10);
};

document.querySelector(".play_audio").addEventListener("click", () => {
    if (document.querySelector(".audio").paused) {
        document.querySelector(".audio").play();
        document.querySelector(".play_audio").textContent = "⏸";
    } else {
        document.querySelector(".audio").pause();
        document.querySelector(".play_audio").textContent = "▶";
    }
});

document.querySelector(".audio").addEventListener("ended", () => { 
    document.querySelector(".audio").currentTime = 0; 
    document.querySelector(".audio").play(); 
    document.querySelector(".play_audio").textContent = "⏸"; 
});


document.querySelectorAll('.reproduct_block_full').forEach(block => {
    const img = block.querySelector('.reproduct_img');
    const name = block.querySelector('.reproduct_name');
    const btn = block.querySelector('.reproduct_btn')
    img.alt = name.textContent.trim();
    btn.ariaLabel = name.textContent.trim();
    btn.type = "button";
    btn.addEventListener('click', () => {
        document.querySelector('[name="topic"]').value = 'Запись на экскурсию "' + name.textContent.trim() + '"';
        document.querySelector('#feedBack').scrollIntoView({ behavior: 'smooth' });
    })
});

document.querySelectorAll('.reproduct_button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.reproduct_button').forEach(btn => btn.classList.remove('reproduct_button-active'));
        button.classList.add('reproduct_button-active');

        const targetId = button.dataset.id + '-block';

        document.querySelectorAll('.reproduct_block').forEach(block => {
            if (block.id === targetId) {
                block.classList.add('reproduct_block-active');
            } else {
                block.classList.remove('reproduct_block-active');
            }
        });
    });
});

document.querySelector(".feedback_input_submit").addEventListener("click", function (e) {
    const name = document.querySelector("[name='fn']").value.trim();
    const email = document.querySelector("[name='email']").value.trim();
    const subject = document.querySelector("[name='topic']").value.trim();
    const message = document.querySelector("[name='mess']").value.trim();

    const fioParts = name.split(/\s+/);
    if (fioParts.length !== 3 || fioParts.some(word => word.length < 2)) {
        alert("Введите корректное ФИО.");
        e.preventDefault();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Введите корректный email.");
        e.preventDefault();
        return;
    }

    if (message.length < 15 || subject.length < 5) {
        alert("Тема должна быть не короче 5 символов. Сообщение должно быть не короче 15 символов.");
        e.preventDefault();
        return;
    }

    const text =
        "Новая заявка с сайта\n\n" +
        "\nИмя: " + name +
        "\nEmail: " + email +
        "\nЗаголовок: " + subject +
        "\nСообщение:\n" + message;

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
            document.querySelectorAll('.feedback_input:not(.feedback_input_submit)').forEach(inp => { inp.value = '' });
        })
        .catch(() => {
            alert("Ошибка отправки. Попробуйте позже.");
        });
});

