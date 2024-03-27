function Copy(obj, visited = new WeakMap()) {
  // Проверка на примитивные типы
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Проверка на циклические ссылки
  if (visited.has(obj)) {
    return visited.get(obj);
  }

  let copy;

  // Обработка специфических типов данных
  if (obj instanceof Date) {
    copy = new Date(obj);
  } else if (obj instanceof Map) {
    copy = new Map();
    obj.forEach((value, key) => {
      copy.set(key, Copy(value, visited));
    });
  } else if (obj instanceof Set) {
    copy = new Set();
    obj.forEach((value) => {
      copy.add(Copy(value, visited));
    });
  } else {
    // Обработка обычных объектов и массивов
    copy = Array.isArray(obj) ? [] : {};

    // Запоминаем объект для обработки циклических ссылок
    visited.set(obj, copy);

    // Рекурсивное копирование вложенных свойств
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = Copy(obj[key], visited);
      }
    }
  }

  return copy;
}

// Пример использования
const obj = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4],
  },
};

const copy = Copy(obj);
console.log(copy);
