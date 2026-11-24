interface Link {
  href: string;
  label: string;
}

interface IPoint {
  id: string;
  author: {
    name: string;
    city: string;
    image: string;
  };
  message: string;
  links?: Link[];
}

export const points: IPoint[] = [
  {
    id: "route-marker-01",
    author: {
      name: "Савелий Давыдов, бэкенд-инженер, разработка ВКонтакте",
      city: "Пермь",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
      Отличный вариант, чтобы начать знакомство <a href="#">с Уралом</a>
    </p>
    `,
    links: [
      { href: "#", label: "Выставки" },
      { href: "#", label: "Творчество" },
      { href: "#", label: "Искусство" },
    ],
  },
  {
    id: "route-marker-02",
    author: {
      name: "Алина Морозова, фронтенд-разработчик, VK Музыка",
      city: "Казань",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Начните день с прогулки по центру, загляните в маленькую кофейню
        и оставьте вечер для <a href="#">набережной</a>.
      </p>
    `,
    links: [
      { href: "#", label: "Прогулки" },
      { href: "#", label: "Кофе" },
      { href: "#", label: "Архитектура" },
    ],
  },
  {
    id: "route-marker-03",
    author: {
      name: "Артём Волков, продуктовый дизайнер, VK Видео",
      city: "Санкт-Петербург",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Мой маршрут на выходной — тихие дворы, книжные магазины
        и <a href="#">небольшие галереи</a>. Лучше никуда не торопиться.
      </p>
    `,
    links: [
      { href: "#", label: "Галереи" },
      { href: "#", label: "Книги" },
      { href: "#", label: "Дворы" },
    ],
  },
  {
    id: "route-marker-04",
    author: {
      name: "Мария Соколова, аналитик данных, ВКонтакте",
      city: "Екатеринбург",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Соберите свою коллекцию городских деталей: вывески, необычные фасады
        и <a href="#">уличное искусство</a>. Фотоаппарат точно пригодится.
      </p>
    `,
    links: [
      { href: "#", label: "Стрит-арт" },
      { href: "#", label: "Фотография" },
      { href: "#", label: "Город" },
    ],
  },
  {
    id: "route-marker-05",
    author: {
      name: "Даниил Орлов, бэкенд-разработчик, VK Cloud",
      city: "Москва",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Иногда лучший план — выбрать незнакомый район,
        найти <a href="#">уютный парк</a> и устроить пикник с друзьями.
      </p>
    `,
    links: [
      { href: "#", label: "Парки" },
      { href: "#", label: "Пикники" },
      { href: "#", label: "С друзьями" },
    ],
  },
  {
    id: "route-marker-06",
    author: {
      name: "Полина Белова, менеджер продукта, VK Звонки",
      city: "Нижний Новгород",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Люблю гулять по старым улицам и искать лучшие виды на реку.
        На <a href="#">закат</a> всегда оставляю побольше времени.
      </p>
    `,
    links: [
      { href: "#", label: "Виды" },
      { href: "#", label: "Закаты" },
      { href: "#", label: "История" },
    ],
  },
  {
    id: "route-marker-07",
    author: {
      name: "Никита Лебедев, инженер по тестированию, VK Видео",
      city: "Владивосток",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Берите удобную обувь и отправляйтесь искать
        <a href="#">видовые площадки</a>. После прогулки приятно зайти
        в кафе и поделиться впечатлениями.
      </p>
    `,
    links: [
      { href: "#", label: "Море" },
      { href: "#", label: "Панорамы" },
      { href: "#", label: "Кафе" },
    ],
  },
  {
    id: "route-marker-08",
    author: {
      name: "Варвара Кузнецова, UX-исследователь, VK Музыка",
      city: "Калининград",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Для спокойного выходного выбираю прогулку среди старых домов,
        <a href="#">музей</a> и долгий обед без спешки.
      </p>
    `,
    links: [
      { href: "#", label: "Музеи" },
      { href: "#", label: "Архитектура" },
      { href: "#", label: "Еда" },
    ],
  },
  {
    id: "route-marker-09",
    author: {
      name: "Илья Фомин, DevOps-инженер, VK Cloud",
      city: "Новосибирск",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        После рабочей недели хочется сменить ритм: погулять у воды,
        а вечером сходить на <a href="#">живой концерт</a>.
      </p>
    `,
    links: [
      { href: "#", label: "Музыка" },
      { href: "#", label: "Набережные" },
      { href: "#", label: "Вечер" },
    ],
  },
  {
    id: "route-marker-10",
    author: {
      name: "Ева Миронова, редактор, ВКонтакте",
      city: "Сочи",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Утром приятно пройтись вдоль моря, а затем выбрать
        <a href="#">зелёный маршрут</a> подальше от шумных улиц.
        Остановки на чай обязательны.
      </p>
    `,
    links: [
      { href: "#", label: "Природа" },
      { href: "#", label: "Море" },
      { href: "#", label: "Отдых" },
    ],
  },
  {
    id: "route-marker-11",
    author: {
      name: "Матвей Егоров, мобильный разработчик, VK Звонки",
      city: "Ярославль",
      image: "/routes/author-1.webp",
    },
    message: `
      <p>
        Любимый способ познакомиться с городом — пройтись по центру,
        свернуть к реке и заглянуть в <a href="#">мастерскую</a>
        за небольшим сувениром.
      </p>
    `,
    links: [
      { href: "#", label: "Ремёсла" },
      { href: "#", label: "Сувениры" },
      { href: "#", label: "Прогулки" },
    ],
  },
];
