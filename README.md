# Проект по ИБТ
Уеб мазгазин

## Възможности:
- Създаване на акаунт
- Вход с акаунт
- Поръчка на продукт.
- Създаване на ревю (оценка и коментар).
Admin панел:
- Одобряване/Отказване/Завършване на поръчка.
- Добавяне/Редакция/Премахване на продукт.

## Технологии:

- [Node.js](https://nodejs.org/) - evented I/O for the backend
- [Express](https://expressjs.com/) - node.js network app framework
- [PassportJS](https://www.passportjs.org/) - Authentication
- [EJS](https://ejs.co/) - Frontend
- [MySQL](https://www.mysql.com/) - база данни

## Инсталация

Необходим е [Node.js](https://nodejs.org/) и [MySQL](https://www.mysql.com/).

```sh
cd ibt-project
npm install
```

Изпълнете скрипта за създаване на базата данни [database/create.sql](https://github.com/Sa6oZnaka/ibt-project/blob/main/database/create.sql).
Променете [config/db.js](https://github.com/Sa6oZnaka/ibt-project/blob/main/config/db.js) с вашите данни за MySQL.

Стартирайте приложението:
```sh
node .
```

## роля Admin
За да си дадете роля админ, след регистрация, изпълене следната заявка в MySQL
```sh
INSERT into admins (userId) VALUES (1);
```
Където 1 е id-то на user-а, който искате да направите admin.
