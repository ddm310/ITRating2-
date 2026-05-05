if (localStorage.getItem('starsCollected') !== '5') {
    localStorage.setItem('cheat', 'true');
    window.location.replace('index.html');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const languageIsRus = localStorage.getItem('language') == 'RUS';

const excursionsDict = languageIsRus ? {
    "ex_oldcity/01.webp": "Золотая рыбка с ключиком",
    "ex_oldcity/02.webp": "Главная улица старого города",
    "ex_oldcity/03.webp": "Свято-Успенский кафедральный собор",
    "ex_oldcity/04.webp": "Витебский краеведческий музей",
    "ex_oldcity/05.webp": "Пушкинский пешеходный мост",
    "ex_oldcity/06.webp": "Храм пресвятой богородицы",
    "ex_zadvine/01.webp": "Дом-музей Марка Шагала",
    "ex_zadvine/02.webp": "Любавичская синагога",
    "ex_zadvine/03.webp": "Золотое кольцо города «Двина»",
    "ex_zadvine/04.webp": "Французская скрипка в Витебске",
    "ex_zadvine/05.webp": "Железнодорожный вокзал Витебска",
    "ex_zadvine/06.webp": "Ликёро-водочный завод «Придвинье»",
    "ex_newcity/01.webp": "Открытый летний амфитеатр",
    "ex_newcity/02.webp": "Мемориал «Площадь Победы»",
    "ex_newcity/03.webp": "Бизнес-центр «Марко-Сити»",
    "ex_newcity/04.webp": "Жилой комплекс «Панорама»",
    "ex_newcity/05.webp": "Памятник «Витебский великан»",
    "ex_newcity/06.webp": "Технологический университет"
} : {
    "ex_oldcity/01.webp": "Залатая рыбка з ключыкам",
    "ex_oldcity/02.webp": "Галоўная вуліца старога горада",
    "ex_oldcity/03.webp": "Свята-Успенскі кафедральны сабор",
    "ex_oldcity/04.webp": "Віцебскі краязнаўчы музей",
    "ex_oldcity/05.webp": "Пушкінскі пешаходны мост",
    "ex_oldcity/06.webp": "Храм Прасвятой Багародзіцы",
    "ex_zadvine/01.webp": "Дом-музей Марка Шагала",
    "ex_zadvine/02.webp": "Любавіцкая сінагога",
    "ex_zadvine/03.webp": "Залатое колца горада «Дзвіна»",
    "ex_zadvine/04.webp": "Французская скрыпка ў Віцебску",
    "ex_zadvine/05.webp": "Чыгуначны вакзал Віцебска",
    "ex_zadvine/06.webp": "Лікёра-гаралчаны завод «Прыдзвінне»",
    "ex_newcity/01.webp": "Адкрыты летні амфітэатр",
    "ex_newcity/02.webp": "Мемарыял «Плошча Перамогі»",
    "ex_newcity/03.webp": "Бізнес-цэнтр «Марка-Сіці»",
    "ex_newcity/04.webp": "Жылы комплекс «Панарама»",
    "ex_newcity/05.webp": "Помнік «Віцебскі волат»",
    "ex_newcity/06.webp": "Тэхналагічны ўніверсітэт"
};

let imgsOpen = 0;
let attempts = 0;
let showedImg;
let randomImages = [];

function gameCard(index) {
    const imagePath = randomImages[index];
    const image = document.createElement('div');
    image.dataset.path = imagePath;
    image.style.backgroundImage = `url("img/excursions/${imagePath}")`;
    image.classList.add('game_img');
    image.classList.add('game_img-hidden');
    const hiddenLabel = document.createElement('span');
    hiddenLabel.classList.add('visually-hidden');
    hiddenLabel.textContent = excursionsDict[imagePath];
    image.appendChild(hiddenLabel);
    image.setAttribute('aria-label', excursionsDict[imagePath] + (languageIsRus ? ' (открыть карточку)' : ' (адкрыць картку)'));
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    return image;
}

function clicked(img) {
    if (imgsOpen == 2 || !img.classList.contains('game_img-hidden')) { return; }
    imgsOpen++;
    if (imgsOpen == 2) {
        img.classList.remove('game_img-hidden');
        img.setAttribute('aria-label', excursionsDict[img.dataset.path] + (languageIsRus ? ' (открыта)' : ' (адкрыта)'));
        if (img.dataset.path === showedImg.dataset.path) {
            imgsOpen = 0;
            if (document.querySelectorAll('.game_img-hidden').length === 0) {
                document.querySelector('.game_win').classList.remove('game_win-hidden');
            }
        } else {
            setTimeout(() => {
                img.setAttribute('aria-label', excursionsDict[img.dataset.path] + (languageIsRus ? ' (закрыта)' : ' (зачынена)'));
                img.classList.add('game_img-hidden');
                showedImg.classList.add('game_img-hidden');
                showedImg.setAttribute('aria-label', excursionsDict[showedImg.dataset.path] + (languageIsRus ? ' (закрыта)' : ' (зачынена)'));
                imgsOpen = 0;
            }, 1500);
        }
        document.querySelector('.game_attempts').textContent = (languageIsRus ? 'Попыток: ': 'Спроб: ') + ++attempts;
    } else if (imgsOpen == 1) {
        img.classList.remove('game_img-hidden');
        img.setAttribute('aria-label', excursionsDict[img.dataset.path] + (languageIsRus ? ' (открыта)' : ' (адкрыта)'));
        showedImg = img;
    }
}

function initialization() {
    imgsOpen = 0;
    document.querySelectorAll('.game_img:not(.game_img-hidden)').forEach(img => {
        img.classList.add('game_img-hidden');
    })

    randomImages = [];
    for (let i = 0; i < 6; i++) {
        let path = '';
        while (!path || randomImages.includes(path)) {
            const folder = random(1, 3);
            const image = `0${random(1, 6)}.webp`
            path = `${(folder == 1 ? 'ex_newcity' : folder == 2 ? 'ex_oldcity' : 'ex_zadvine')}/${image}`;
        }
        randomImages.push(path);
    }
    randomImages = [...shuffle(randomImages), ...shuffle(randomImages)];

    attempts = 0;
    document.querySelector('.game_attempts').textContent = languageIsRus ? 'Попыток: 0' : 'Спроб: 0';

    document.querySelector('.game_content').innerHTML = '';
    for (let i = 0; i < 12; i++) {
        document.querySelector('.game_content').appendChild(gameCard(i));
    }
    document.querySelectorAll('.game_img').forEach(img => {
        img.addEventListener('click', () => clicked(img));
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                clicked(img);
            }
        })
    })
}

initialization();

document.querySelector('.game_restart').addEventListener('click', () => {
    initialization();
})

document.querySelector('.game_clear').addEventListener('click', () => {
    const clear = ['starsCollected', 'index', 'quiz', 'excursion', 'feedback', 'about'];
    for (let item of clear) {
        localStorage.removeItem(item);
    }
    localStorage.setItem('cleared', 'true');
    window.location.replace('index.html');
})
