// массив студентов
let studentsInfo = [
    // 1 group
    {"id": 35350007, "shortName": "Бабицкий Д.В.", "group": 1},
    {"id": 35350008, "shortName": "Баскин Д.В.", "group": 1},
    {"id": 35350014, "shortName": "Богуцкин Т.С.", "group": 1},
    {"id": 35350026, "shortName": "Гирилюк В.А.", "group": 1},
    {"id": 35350032, "shortName": "Городецкая Д.А.", "group": 1},
    {"id": 35350034, "shortName": "Груганов К.А.", "group": 1},
    {"id": 35350038, "shortName": "Дворниченко Т.А.", "group": 1},
    {"id": 35350048, "shortName": "Загрещенко А.С.", "group": 1},
    {"id": 35350051, "shortName": "Иваненко К.С.", "group": 1},
    {"id": 35350055, "shortName": "Кимстач В.Р.", "group": 1},
    {"id": 35350080, "shortName": "Лукьянчик М.Е.", "group": 1},
    {"id": 35350083, "shortName": "Малиновская Е.А.", "group": 1},
    {"id": 35350089, "shortName": "Маслаков С.А.", "group": 1},
    {"id": 35350091, "shortName": "Миронович Р.В.", "group": 1},
    {"id": 35350097, "shortName": "Петрожицкая А.В.", "group": 1},
    {"id": 35350099, "shortName": "Петухов М.Д.", "group": 1},
    {"id": 35350101, "shortName": "Пешкур И.А.", "group": 1},
    {"id": 35350102, "shortName": "Пищало Е.М.", "group": 1},
    {"id": 35350103, "shortName": "Подгайский А.А.", "group": 1},
    {"id": 35350105, "shortName": "Полянский М.А.", "group": 1},
    {"id": 35350106, "shortName": "Пранюк Е.Д.", "group": 1},
    {"id": 35350107, "shortName": "Романовский М.Д.", "group": 1},
    {"id": 35350118, "shortName": "Слюсарь С.Ю.", "group": 1},
    {"id": 35350119, "shortName": "Снесарь Д.О.", "group": 1},
    {"id": 35350120, "shortName": "Сорока Е.В.", "group": 1},
    {"id": 35350122, "shortName": "Станкевич А.Н.", "group": 1},
    {"id": 35350129, "shortName": "Тараниченко А.В.", "group": 1},
    {"id": 35350130, "shortName": "Тишкевич Е.Е.", "group": 1},
    {"id": 35350132, "shortName": "Федотов В.А.", "group": 1},
    {"id": 35350145, "shortName": "Шарафанович К.А.", "group": 1},
    // 4 group
    {"id": 35350095, "shortName": "Новак К.А.", "group": 4},
    // 5 group
    {"id": 35350006, "shortName": "Ануфриев Д. И.", "group": 5},
    {"id": 35350015, "shortName": "Боровиков Е. С.", "group": 5},
    {"id": 35350017, "shortName": "Брикун Д. С.", "group": 5},
    {"id": 35350036, "shortName": "Данилов Д. И.", "group": 5},
    {"id": 35350044, "shortName": "Есис Е. С.", "group": 5},
    {"id": 35350050, "shortName": "Здор П. Ю.", "group": 5},
    {"id": 35350052, "shortName": "Камышев С. В.", "group": 5},
    {"id": 35350053, "shortName": "Караичева А. И.", "group": 5},
    {"id": 35350069, "shortName": "Крисюк Е. С.", "group": 5},
    {"id": 35350072, "shortName": "Лаптанович А. А.", "group": 5},
    {"id": 35350094, "shortName": "Могилевец Д. Э.", "group": 5},
    {"id": 35350100, "shortName": "Петушок А. С.", "group": 5},
    {"id": 35350104, "shortName": "Поддерегин И. Е.", "group": 5},
    {"id": 35350125, "shortName": "Стасюк Д. В.", "group": 5},
    {"id": 35350128, "shortName": "Суровцев А. И.", "group": 5},
    {"id": 35350134, "shortName": "Хорошко К. Н.", "group": 5},
    // 3 group
    {"id": 35350001, "shortName": "Абдулов А.А.", "group": 3},
    {"id": 35350002, "shortName": "Акулин Е.Р.", "group": 3},
    {"id": 35350003, "shortName": "Александрович А.Д.", "group": 3},
    {"id": 35350009, "shortName": "Бахмат А.М.", "group": 3},
    {"id": 35350012, "shortName": "Богданов Е.Д.", "group": 3},
    {"id": 35350016, "shortName": "Бочков А.А.", "group": 3},
    {"id": 35350019, "shortName": "Бусалов К.А.", "group": 3},
    {"id": 35350020, "shortName": "Бутакова К.А.", "group": 3},
    {"id": 35350039, "shortName": "Дергун Н.О.", "group": 3},
    {"id": 25350048, "shortName": "Еленский А.А.", "group": 3},
    {"id": 35350045, "shortName": "Желудович Ю.Г.", "group": 3},
    {"id": 35350063, "shortName": "Кокош А.П.", "group": 3
    },
    {
        "id": 35350067,
        "shortName": "Кохан А.И.",
        "group": 3
    },
    {
        "id": 35350075,
        "shortName": "Леуто В.А.",
        "group": 3
    },
    {
        "id": 35350077,
        "shortName": "Логовой А.А.",
        "group": 3
    },
    {
        "id": 35350085,
        "shortName": "Мартинович А.А.",
        "group": 3
    },
    {
        "id": 35350087,
        "shortName": "Мартынкевич Е.Д.",
        "group": 3
    },
    {
        "id": 35350088,
        "shortName": "Марченко МВ.",
        "group": 3
    },
    {
        "id": 35350089,
        "shortName": "Марьин Д.С.",
        "group": 3
    },
    {
        "id": 35350090,
        "shortName": "Мельник Д.И.",
        "group": 3
    },
    {
        "id": 35350111,
        "shortName": "Рязанцев А.В.",
        "group": 3
    },
    {
        "id": 35350112,
        "shortName": "Расов В.О.",
        "group": 3
    },
    {
        "id": 35350114,
        "shortName": "Себелев Д.Ю.",
        "group": 3
    },
    {
        "id": 35350116,
        "shortName": "Цурик В.Р.",
        "group": 3
    },
    {
        "id": 35350138,
        "shortName": "Черепухо С.В.",
        "group": 3
    },
    {
        "id": 35350139,
        "shortName": "Черков М.А.",
        "group": 3
    },
    {
        "id": 35350140,
        "shortName": "Черняк М.С.",
        "group": 3
    },
    {
        "id": 35350148,
        "shortName": "Шеметков Я.И.",
        "group": 3
    },
    {
        "id": 35350149,
        "shortName": "Шершнева Д.А.",
        "group": 3
    },
    {
        "id": 35350153,
        "shortName": "Шусть Е.А.",
        "group": 3
    }

  ];
  
