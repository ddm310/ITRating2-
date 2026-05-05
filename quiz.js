function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const languageIsRus = localStorage.getItem('language') == 'RUS';

const landmarks = languageIsRus ? [
    {
        name: "Золотая рыбка с ключиком",
        address: "Улица Толстого, 2",
        year: "2014 год",
        autor: "Иван Казак",
        style: "Малая городская скульптура",
        height: "1,5 м"
    },
    {
        name: "Французская скрипка в Витебске",
        address: "Улица Покровская, 9",
        year: "1997 год",
        autor: "Валерий Могучий",
        style: "Авангардная скульптура",
        height: "2,5 м"
    },
    {
        name: "Золотое кольцо города «Двина»",
        address: "Улица Чайковского, 3",
        year: "1995 год",
        autor: "Студия «АрхГрад»",
        style: "Классицизм",
        height: "8 м"
    },
    {
        name: "Открытый летний амфитеатр",
        address: "Проспект Фрунзе, 13а",
        year: "1988 год",
        autor: "Александр Завистновский",
        style: "Советский модернизм",
        height: "25 м"
    },
    {
        name: "Памятник «Витебский великан»",
        address: "Улица Суворова, 3",
        year: "2018 год",
        autor: "Иван Казак",
        style: "Монументальная скульптура",
        height: "3,12 м"
    },
    {
        name: "Ликёро-водочный завод «Придвинье»",
        address: "Улица Революционная, 9",
        year: "1898 год",
        autor: "Игнатий Лешневский",
        style: "Кирпичный стиль",
        height: "15 м"
    },
    {
        name: "Свято-Успенский кафедральный собор",
        address: "Улица Крылова, 9",
        year: "1777 год",
        autor: "Иосиф Фонтана",
        style: "Барокко, необарокко",
        height: "52 м"
    },
    {
        name: "Витебский краеведческий музей",
        address: "Улица Ленина, 36",
        year: "1911 год",
        autor: "Иван Фомин",
        style: "Классицизм с элементами модерна",
        height: "38 м"
    },
    {
        name: "Дом-музей Марка Шагала",
        address: "Улица Покровская, 11",
        year: "1997 год",
        autor: "Городская застройка XIX века",
        style: "Кирпичная архитектура",
        height: "6 м"
    },
    {
        name: "Храм пресвятой богородицы",
        address: "Улица Замковая, 1",
        year: "1998 год",
        autor: "Игорь Комаров",
        style: "Древнерусское зодчество",
        height: "24 м"
    },
    {
        name: "Железнодорожный вокзал Витебска",
        address: "Улица Космонавтов, 10",
        year: "1952 год",
        autor: "Борис Мезенцев",
        style: "Сталинский неоклассицизм",
        height: "38 м"
    },
    {
        name: "Бизнес-центр «Марко-Сити»",
        address: "Улица Ленина, 26А",
        year: "2012 год",
        autor: "Архитектурная мастерская Ляхович",
        style: "Хай-тек",
        height: "26 м"
    }
] : [
    {
        "name": "Залатая рыбка з ключыкам",
        "address": "Вуліца Талстога, 2",
        "year": "2014 год",
        "autor": "Іван Казак",
        "style": "Малая гарадская скульптура",
        "height": "1,5 м"
    },
    {
        "name": "Французская скрыпка ў Віцебску",
        "address": "Вуліца Пакроўская, 9",
        "year": "1997 год",
        "autor": "Валерый Магутні",
        "style": "Авангардная скульптура",
        "height": "2,5 м"
    },
    {
        "name": "Залатое колца горада «Дзвіна»",
        "address": "Вуліца Чайкоўскага, 3",
        "year": "1995 год",
        "autor": "Студыя «АрхГрад»",
        "style": "Класіцызм",
        "height": "8 м"
    },
    {
        "name": "Адкрыты летні амфітэатр",
        "address": "Праспект Фрунзэ, 13а",
        "year": "1988 год",
        "autor": "Аляксандр Завістоўскі",
        "style": "Савецкі мадэрнізм",
        "height": "25 м"
    },
    {
        "name": "Помнік «Віцебскі волат»",
        "address": "Вуліца Суворава, 3",
        "year": "2018 год",
        "autor": "Іван Казак",
        "style": "Манументальная скульптура",
        "height": "3,12 м"
    },
    {
        "name": "Лікёра-гаралчаны завод «Прыдзвінне»",
        "address": "Вуліца Рэвалюцыйная, 9",
        "year": "1898 год",
        "autor": "Ігнацій Лешнеўскі",
        "style": "Цагляны стыль",
        "height": "15 м"
    },
    {
        "name": "Свята-Успенскі кафедральны сабор",
        "address": "Вуліца Крылова, 9",
        "year": "1777 год",
        "autor": "Іосіф Фантана",
        "style": "Барока, неабарока",
        "height": "52 м"
    },
    {
        "name": "Віцебскі краязнаўчы музей",
        "address": "Вуліца Леніна, 36",
        "year": "1911 год",
        "autor": "Іван Фамін",
        "style": "Класіцызм з элементамі мадэрну",
        "height": "38 м"
    },
    {
        "name": "Дом-музей Марка Шагала",
        "address": "Вуліца Пакроўская, 11",
        "year": "1997 год",
        "autor": "Гарадская забудова XIX стагоддзя",
        "style": "Цагляная архітэктура",
        "height": "6 м"
    },
    {
        "name": "Храм Прасвятой Багародзіцы",
        "address": "Вуліца Замкавая, 1",
        "year": "1998 год",
        "autor": "Ігар Камароў",
        "style": "Старажытнарускае дойлідства",
        "height": "24 м"
    },
    {
        "name": "Чыгуначны вакзал Віцебска",
        "address": "Вуліца Касманаўтаў, 10",
        "year": "1952 год",
        "autor": "Барыс Мезенцаў",
        "style": "Сталінскі неакласіцызм",
        "height": "38 м"
    },
    {
        "name": "Бізнес-цэнтр «Марка-Сіці»",
        "address": "Вуліца Леніна, 26А",
        "year": "2012 год",
        "autor": "Архітэктурная майстэрня Ляховіч",
        "style": "Хай-тэк",
        "height": "26 м"
    }
];

let questions = shuffle(languageIsRus ? [
    {
        text: 'В каком году был построен (восстановлен) объект "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "year"
    },
    {
        text: 'По какому адресу находится "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "address"
    },
    {
        text: 'Кто архитектор объекта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "autor"
    },
    {
        text: 'Какой стиль у объекта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "style"
    },
    {
        text: 'Какая высота у объекта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "height"
    },
    {
        text: 'Год постройки (востановления) какого объекта – object?',
        typeOfQuestion: "year",
        typeOfAnswers: "name"
    },
    {
        text: 'object – адрес какого объекта?',
        typeOfQuestion: "address",
        typeOfAnswers: "name"
    },
    {
        text: 'Архитектором какого объекта является object?',
        typeOfQuestion: "autor",
        typeOfAnswers: "name"
    },
    {
        text: 'У какого объекта использовался стиль "object"?',
        typeOfQuestion: "style",
        typeOfAnswers: "name"
    },
    {
        text: 'У какого объекта высота равна object?',
        typeOfQuestion: "height",
        typeOfAnswers: "name"
    }
] : [
    {
        text: 'У якім годзе быў пабудаваны (адноўлены) аб\'ект "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "year"
    },
    {
        text: 'Па якім адрасе знаходзіцца "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "address"
    },
    {
        text: 'Хто архітэктар аб\'екта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "autor"
    },
    {
        text: 'Які стыль у аб\'екта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "style"
    },
    {
        text: 'Якая вышыня ў аб\'екта "object"?',
        typeOfQuestion: "name",
        typeOfAnswers: "height"
    },
    {
        text: 'Год пабудовы (аднаўлення) якога аб\'екта – object?',
        typeOfQuestion: "year",
        typeOfAnswers: "name"
    },
    {
        text: 'object – адрас якога аб\'екта?',
        typeOfQuestion: "address",
        typeOfAnswers: "name"
    },
    {
        text: 'Архітэктарам якога аб\'екта з\'яўляецца object?',
        typeOfQuestion: "autor",
        typeOfAnswers: "name"
    },
    {
        text: 'У якога аб\'екта выкарыстоўваўся стыль "object"?',
        typeOfQuestion: "style",
        typeOfAnswers: "name"
    },
    {
        text: 'У якога аб\'екта вышыня роўная object?',
        typeOfQuestion: "height",
        typeOfAnswers: "name"
    }
]);

const answersMap = {
    name: shuffle([...new Set(landmarks.map(item => item.name))]),
    address: shuffle([...new Set(landmarks.map(item => item.address))]),
    year: shuffle([...new Set(landmarks.map(item => item.year))]),
    autor: shuffle([...new Set(landmarks.map(item => item.autor))]),
    style: shuffle([...new Set(landmarks.map(item => item.style))]),
    height: shuffle([...new Set(landmarks.map(item => item.height))])
};

let rLandmarks = shuffle(landmarks);

let answeredQuestionsCount = 0;
let wrongAnswersCount = 0;

const quizCorrectAnswersCount = document.querySelector('.quiz_correct_answers_count');
const quizWrongAnswersCount = document.querySelector('.quiz_wrong_answers_count');
const quizAnsweredQuestionsCount = document.querySelector('.quiz_answered_questions_count');
const quizNotAnsweredQuestionsCount = document.querySelector('.quiz_not_answered_questions_count');
const exceptions = languageIsRus ? {
    "1997 год": ["Французская скрипка в Витебске", "Дом-музей Марка Шагала"],
    "38 м": ["Железнодорожный вокзал Витебска", "Витебский краеведческий музей"],
    "Иван Казак": ["Золотая рыбка с ключиком", "Памятник «Витебский великан»"]
} : {
    "1997 год": ["Французская скрыпка ў Віцебску", "Дом-музей Марка Шагала"],
    "38 м": ["Чыгуначны вакзал Віцебска", "Віцебскі краязнаўчы музей"],
    "Іван Казак": ["Залатая рыбка з ключыкам", "Помнік «Віцебскі волат»"]
};

function rQuestion(index) {
    const lm = rLandmarks[index];
    const qt = questions[index];
    const question = qt.text.replace('object', lm[qt.typeOfQuestion]);
    const correctAnswer = lm[qt.typeOfAnswers];
    let wrongAnswers = shuffle(answersMap[qt.typeOfAnswers].filter(answer => exceptions.hasOwnProperty(lm[qt.typeOfQuestion]) ? !exceptions[lm[qt.typeOfQuestion]].includes(answer) : answer !== correctAnswer).slice(0, 3));
    const visualAnswers = shuffle([correctAnswer, ...wrongAnswers]);

    let answered = false;

    let quizBlock = document.createElement('div');
    quizBlock.classList.add('quiz_block');

    let questionDiv = document.createElement('div');
    questionDiv.classList.add('quiz_question');
    questionDiv.textContent = question;
    quizBlock.appendChild(questionDiv);

    visualAnswers.forEach(answer => {
        let btn = document.createElement('button');
        btn.classList.add('quiz_answer');
        btn.setAttribute('aria-label', languageIsRus ? 'Выбрать вариант ответа: ' : 'Выбраць варыянт адказу: ' + answer);
        btn.textContent = answer;
        quizBlock.appendChild(btn);
        btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;
            quizAnsweredQuestionsCount.textContent = (languageIsRus ? 'Отвеченных вопросов: ' : 'Адказных пытанняў: ') + (++answeredQuestionsCount);
            quizNotAnsweredQuestionsCount.textContent = (languageIsRus ? 'Неотвеченных вопросов: ' : 'Неадказных пытанняў: ') + (10 - answeredQuestionsCount);
            const allBtns = quizBlock.querySelectorAll('.quiz_answer');
            allBtns.forEach(b => {
                b.classList.add('quiz_answer-answered')
                if (b.textContent === correctAnswer) {
                    b.classList.add('quiz_answer-correct')
                }
                b.disabled = true;
            });
            if (btn.textContent !== correctAnswer) {
                btn.classList.add('quiz_answer-wrong');
                quizWrongAnswersCount.textContent = (languageIsRus ? 'Неправильно отвеченных вопросов: ' : 'Няправільна адказаных пытанняў: ') + (++wrongAnswersCount);
            }
            quizCorrectAnswersCount.textContent = (languageIsRus ? 'Правильно отвеченных вопросов: ' : 'Правільна адказаных пытанняў: ') + (answeredQuestionsCount - wrongAnswersCount);
            if (answeredQuestionsCount === 10) {
                const quizVerdict = document.querySelector('.quiz_verdict');
                if (languageIsRus) {
                    quizVerdict.textContent =
                        wrongAnswersCount === 0 ? 'Вы – Знаток достопримечательностей Витебска!'
                            : wrongAnswersCount <= 3 ? 'Вы очень хорошо знаете Витебск!'
                                : wrongAnswersCount <= 6 ? 'Вы хорошо справились!'
                                    : 'Вы мало знаете про достопримечательности Витебска, но никогда не поздно узнавать новое!';
                } else {
                    quizVerdict.textContent =
                        wrongAnswersCount === 0 ? 'Вы – Знаўца славутасцяў Віцебска!'
                            : wrongAnswersCount <= 3 ? 'Вы вельмі добра ведаеце Віцебск!'
                                : wrongAnswersCount <= 6 ? 'Вы добра справіліся!'
                                    : 'Вы мала ведаеце пра славутасці Віцебска, але ніколі не позна даведвацца новае!';
                }
            }
        })
    });
    return quizBlock;
}

const quizBase = document.querySelector('.quiz_base');
quizBase.innerHTML = '';

for (let i = 0; i < 10; i++) {
    quizBase.appendChild(rQuestion(i));
}

document.querySelector('.quiz_restart').addEventListener('click', () => {

    answeredQuestionsCount = 0;
    wrongAnswersCount = 0;
    quizAnsweredQuestionsCount.textContent = 'Отвеченных вопросов: 0';
    quizCorrectAnswersCount.textContent = 'Правильно отвеченных вопросов: 0';
    quizNotAnsweredQuestionsCount.textContent = 'Неотвеченных вопросов: 10';
    quizWrongAnswersCount.textContent = 'Неправильно отвеченных вопросов: 0';

    document.querySelector('.quiz_verdict').textContent = "Ответьте на все вопросы, чтобы узнать кто вы.";

    questions = shuffle(questions);
    rLandmarks = shuffle(rLandmarks);

    const quizBase = document.querySelector('.quiz_base');
    quizBase.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        quizBase.appendChild(rQuestion(i));
    }
})
