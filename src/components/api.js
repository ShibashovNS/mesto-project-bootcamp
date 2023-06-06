/*в модули api функция отвечает только за отправку/получения данных, данные тут не обробатываю*/
export function getCards() {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-9/cards", {
    headers: {
      authorization: "00c811f0-a3fd-468f-9de6-38d341f2ac7c",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    /*при ошибке отклоняю промис*/
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

/*запрос на добавление карточек*/
export function setCard(url, name) {
  return fetch("https://nomoreparties.co/v1/wbf-cohort-9/cards", {
    headers: {
      authorization: "00c811f0-a3fd-468f-9de6-38d341f2ac7c",
    },
    method: "POST",
    body: JSON.stringify({
      link: url,
      name: name,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    /*при ошибке отклоняю промис*/
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
