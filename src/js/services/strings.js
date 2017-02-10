angular.module('app')

.service('strings', function(Language) {
  var languages = {
    en: {
      "owerview": "Overview",
      "summary": "_____________________\n ________________________\n  Summary\n _____________________\n ________________________\n ",
      "features-title": "Features",
      "features": [
        "Animated Weather gadget changes with weather conditions,Up to date weather forecast",
        "Date/Time",
        "Hourly/Weekly forecast",
        "Weather tracking",
        "Atmospheric pressure",
        "Add your location",
        "Search weather if different locations"],
      "user-state-placeholder": "State",
      "user-country-placeholder": "Country",
      "user-city-placeholder": "City",
      "needsUserInfo": "Some userinfo is required",
      "isRequired": " is required",
      "username": "Username",

      "name": "Name",
      "email": "email",
      "confirm-password": "Confirm password",
      "password": "Password",
      "location": "Location",
      "submit": "Submit",
      "edit": "Edit",
      "preview": "Preview",
      ".overview": "Touch screen to start using",
      ".login-data": "Enter data to presentation",
      "#preview-button": "Touch to preview",
      "#login-button": "Register this data",
      "#edit-button": "You can change this data",
      "#menu-button": "To get more options go to menu",
      ".linear-hourly-forecast": "Houry forecast",
      "hello": "Hello",
      "wellcome": "Wellcome",
      "menu": "Menu",
      "search": "Search",
      "weekly forecast": "Weekly forecast",
      "hourly forecast": "Hourly forecast",
      "map": "Map",
      "background": "Background",
      "search location": "Search location",
      "Monday": "Monday",
      "Tuesday": "Tuesday",
      "Wednesday": "Wednesday",
      "Thursday": "Thursday",
      "Friday": "Friday",
      "Saturday": "Saturday",
      "Sunday": "Sunday",
      "upload background": "Upload your background"

    },
    ru: {
      "owerview": "Обзор",
      "summary": "_____________________\n ________________________\n  Сводка\n _____________________\n ________________________\n ",
      "features-title": "Особенности",
      "features": [
        "Анимировенное приложение, отслеживающее изменение погоды",
        "Дата/Время",
        "Понедельный/почасовой прогноз",
        "Отслеживание погоды",
        "Атмосферное давление",
        "Добавление вашей локации",
        "Поиск погоды в другой локации"],
      "user-state-placeholder": "Штат",
      "user-country-placeholder": "Страна",
      "user-city-placeholder": "Город",
      "needsUserInfo": "Неабходимо больше информации",
      "isRequired": " требуется",
      "username": "Имя пользователя",
      "name": "Имя",
      "confirm-password": "Подтвердите пароль",
      "password": "Пароль",
      "submit": "Подтвердить",
      "edit": "Редактировать",
      "preview": "Предпросмотр",
      ".overview": "Нажмите экран чтобы начать использование приложения",
      ".login-data": "Введите данные, которые будут представлены на главной странице",
      "#preview-button": "Нажмите для предпросмотра",
      "#login-button": "Зарегестрировать эти данные",
      "#edit-button": "Изменить эти данные",
      "#menu-button": "Перейдите в меню для получения дополнительных возможностей",
      ".linear-hourly-forecast": "Почасовой прогноз",
      "hello": "Привет",
      "wellcome": "Добро пожаловать",
      "menu": "Меню",
      "search": "Поиск",
      "weekly forecast": "Недельный прогноз",
      "hourly forecast": "Почасовой прогноз",
      "map": "Карта",
      "background": "Фон",
      "search location": "Поиск в локации",
      "Monday": "Понедельник",
      "Tuesday": "Вторник",
      "Wednesday": "Среда",
      "Thursday": "Четверг",
      "Friday": "Пятница",
      "Saturday": "Суббота",
      "Sunday": "Воскресенье",
      "upload background": "Загрузите фон с Вашего устройства"

    }
  }
  return function(string) {
    if(string) {
      var strings = languages[Language()];
      return strings[string];
    } else {
      return languages;
    }
  }
});
