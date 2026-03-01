# Roadmap: Инструмент для синтетической генерации и анонимизации табличных данных (MVP)

**Длительность:** 14 недель  
**Команда:** 4 студента  
**Стек:** Python + FastAPI + React  
**Milestone:** 4 показа

---

## 📊 Обзор спринтов

| Спринт | Недели | Фокус | Milestone |
|--------|--------|-------|-----------|
| **Спринт 1** | 1-3 | Концепция и архитектура | 🎯 Показ 1 (неделя 3) |
| **Спринт 2** | 4-6 | Core функционал + веб | 🎯 Показ 2 (неделя 6) |
| **Спринт 3** | 7-9 | Полный MVP | 🎯 Показ 3 (неделя 9) |
| **Спринт 4** | 10-12 | Устойчивость + фичи | 🎯 Показ 4 (неделя 12) |
| **Спринт 5** | 13-14 | Стабилизация + защита | 🎓 Финальная защита |

---

## СПРИНТ 1: Концепция и проектирование (Недели 1-3)

### 📋 Неделя 1: Kickoff & Research

**Результаты недели:**
- Организация команды: распределение ролей (Lead, Backend, Web, QA/Doc)
- Изучение требований и кейса, разбор MVP-scope vs optional
- Исследование: Faker, методы анонимизации (masking/redaction/pseudonymization)
- Создание Git-репозитория, структура проекта (src-layout)
- Установка базового стека: Python 3.11+, FastAPI, pytest

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Организация встреч, создание доски задач, настройка Git
- ⚙️ **Core Backend:** Исследование Faker, прототип генерации
- 🎨 **API/Web:** Исследование FastAPI templates, mockup UI
- ✅ **QA/Doc/ML:** Создание тест-плана, настройка pytest

---

### 📋 Неделя 2: Проектирование архитектуры

**Результаты недели:**
- Архитектура: core (generation, anonymization) + io (csv) + interfaces/web
- Спецификация CSV-форматов для 2 шаблонов (users.csv, orders.csv)
- Детальное описание 3 методов анонимизации с примерами
- Wireframe веб-интерфейса: страницы Generate и Anonymize
- API спецификация (endpoints, request/response schemas)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Финализация архитектуры, ревью дизайна
- ⚙️ **Core Backend:** Дизайн core модулей, API contracts
- 🎨 **API/Web:** Wireframes в Figma/Excalidraw, UI flow
- ✅ **QA/Doc/ML:** Тест-кейсы для методов

---

### 🎯 Неделя 3: ПОКАЗ 1 - Концепция

**Обязательные артефакты:**

📄 **Документация:**
- `architecture.md`: диаграмма модулей (core/io/interfaces), описание компонентов
- `csv_formats.md`: спецификация users.csv и orders.csv с примерами данных
- `anonymization_methods.md`: детальное описание masking/redaction/pseudonymization
- `api_spec.yaml`: OpenAPI спецификация endpoints

📁 **Файлы:**
- `wireframes/`: скриншоты или ссылки на Figma/Excalidraw
- `examples/users_sample.csv`: пример users.csv (10 строк)
- `examples/orders_sample.csv`: пример orders.csv (20 строк)
- `examples/users_anonymized.csv`: before/after пример анонимизации

💻 **Код:**
- `project_structure.txt`: дерево папок src/sda/...
- `requirements.txt`: базовые зависимости (faker, fastapi, pytest)
- `README.md`: описание проекта, цели MVP

**Сценарий демонстрации (10 мин):**
Презентация слайдов: проблематика → архитектура → примеры CSV → методы → UI mockups → план спринта 2

**Критерии успеха:**
✅ Понятная архитектура с разделением ответственности  
✅ Конкретные примеры CSV с корректными типами данных  
✅ Описание 3+ методов анонимизации с before/after  
✅ Wireframes двух страниц (Generate/Anonymize)  
✅ Доска задач на спринт 2 заполнена с оценками

---

## СПРИНТ 2: Core функционал (Недели 4-6)

### 📋 Неделя 4: Core - Генерация данных

**Результаты недели:**
- Модуль core/generation: класс DataGenerator с Faker
- Реализация 2 шаблонов: UsersTemplate и OrdersTemplate
- CSV writer в io/csv_write.py с поддержкой UTF-8
- Unit-тесты для генерации (pytest)
- CLI-прототип для тестирования (опционально)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Ревью кода, PR management
- ⚙️ **Core Backend:** DataGenerator, Templates, CSV writer
- 🎨 **API/Web:** Начало FastAPI skeleton
- ✅ **QA/Doc/ML:** Unit tests, test data validation

---

### 📋 Неделя 5: Core - Анонимизация (базовая)

**Результаты недели:**
- Модуль core/anonymization: базовые классы Anonymizer
- Реализация masking для email и phone
- Реализация redaction (замена на ***)
- CSV reader в io/csv_read.py
- Unit-тесты для методов анонимизации

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Code reviews
- ⚙️ **Core Backend:** Anonymizer classes, Masking/Redaction
- 🎨 **API/Web:** FastAPI routes skeleton
- ✅ **QA/Doc/ML:** Tests для анонимизации

---

### 🎯 Неделя 6: ПОКАЗ 2 - Сквозной сценарий

**Обязательные артефакты:**

💻 **Код:**
- `src/sda/core/generation.py`: класс DataGenerator
- `src/sda/core/anonymization.py`: базовый Anonymizer
- `src/sda/io/csv_*.py`: reader и writer
- `src/sda/interfaces/web/routes.py`: endpoints /generate и /anonymize
- `tests/`: минимум 5 unit-тестов

🎬 **Демо:**
- Локально запущенный FastAPI сервер (http://localhost:8000)
- HTML форма для генерации (любой шаблон)
- HTML форма для анонимизации (masking или redaction)
- Возможность скачать результат в CSV

📁 **Файлы:**
- `generated_users.csv`: результат генерации
- `anonymized_sample.csv`: результат анонимизации
- `test_report.txt`: результаты pytest

**Сценарий демонстрации (5-7 мин):**
Live demo: запуск сервера → открыть /generate → выбрать шаблон → скачать CSV → показать содержимое → загрузить файл в /anonymize → выбрать метод → скачать результат → показать изменения

**Критерии успеха:**
✅ Сервер запускается без ошибок  
✅ Генерация создаёт валидный CSV  
✅ Анонимизация корректно применяет хотя бы 1 метод  
✅ Обработка базовых ошибок (400/500)  
✅ Скачивание файлов работает  
✅ Минимум 5 passing тестов

---

## СПРИНТ 3: Полный MVP (Недели 7-9)

### 📋 Неделя 7: Полная реализация генерации

**Результаты недели:**
- Финализация 2 шаблонов с foreign key (orders.user_id)
- Параметры генерации: num_rows, seed для воспроизводимости
- Веб-страница Generate с формой выбора
- Валидация параметров (Pydantic schemas)
- Preview первых 10 строк (опциональная фича)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Feature planning
- ⚙️ **Core Backend:** FK relationships, Seed handling
- 🎨 **API/Web:** Generate page UI, Preview component
- ✅ **QA/Doc/ML:** Validation tests

---

### 📋 Неделя 8: Полная реализация анонимизации

**Результаты недели:**
- Реализация pseudonymization (consistent hashing с salt)
- Drop column метод
- Модуль domain/rules.py: RuleSet, ColumnRule
- Применение правил по колонкам с default behavior: если правила нет → keep (не менять)
- Фиксация в отчёте для колонки без правила: `column_x: kept (no rule provided)`
- Обработка ошибок: несуществующие колонки

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Architecture review
- ⚙️ **Core Backend:** Pseudonymization, RuleSet engine
- 🎨 **API/Web:** Rules configuration UI
- ✅ **QA/Doc/ML:** Edge case tests

---

### 🎯 Неделя 9: ПОКАЗ 3 - Полный функционал

**Обязательные артефакты:**

💻 **Код:**
- `src/sda/core/generation.py`: UsersTemplate + OrdersTemplate с FK
- `src/sda/core/anonymization.py`: masking/redaction/pseudonymization/drop
- `src/sda/domain/rules.py`: RuleSet, ColumnRule классы
- `src/sda/interfaces/web/`: полные HTML страницы Generate и Anonymize
- `tests/`: 15+ тестов с edge cases

🎬 **Демо:**
- Веб-страница Generate: dropdown выбор шаблона, input для num_rows и seed
- Веб-страница Anonymize: upload CSV, таблица колонок с dropdown методов
- Обязательная генерация report.json с summary по обработке

📁 **Файлы:**
- `examples/users_1000.csv`: большой файл
- `examples/orders_1000.csv`: с FK на users
- `examples/anonymized_users.csv`: результат с разными методами
- `examples/report.json`: обязательный отчёт (методы по колонкам, changed_count, warnings/errors)
- `screenshots/`: скрины UI Generate и Anonymize

**Сценарий демонстрации (10 мин):**
1. Генерация users.csv (100 строк, seed=42) → показать в Excel
2. Генерация orders.csv → проверить FK
3. Загрузить users в Anonymize → для email выбрать masking, для phone masking, для full_name pseudonymization → скачать → показать результат и report.json

**Критерии успеха:**
✅ 2 шаблона генерируют корректные данные с FK  
✅ 3+ метода анонимизации работают  
✅ UI позволяет выбирать метод для каждой колонки  
✅ Report.json генерируется всегда и содержит методы, число изменений, warnings/errors  
✅ Обработка несуществующих колонок (ошибка)  
✅ Default behavior: колонки без правил остаются (keep) и отражаются в отчёте как `kept (no rule provided)`

---

## СПРИНТ 4: Устойчивость и фичи (Недели 10-12)

### 📋 Неделя 10: Устойчивость и UX

**Результаты недели:**
- Поддержка разных разделителей (запятая/точка с запятой)
- Encoding: UTF-8 BOM для Excel
- Ограничение размера входного CSV (например, 20MB) + понятная ошибка при превышении
- Обработка пустого файла, отсутствующих колонок и невалидных правил
- Человеческие сообщения об ошибках (не трейсы)
- Presets-first UX: загрузка/сохранение rules preset (JSON) как основной сценарий
- Улучшенная валидация CSV (проверка структуры)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** UX review
- ⚙️ **Core Backend:** CSV robustness, Preset I/O
- 🎨 **API/Web:** Error messages UI, Preset upload/download
- ✅ **QA/Doc/ML:** CSV format tests

---

### 📋 Неделя 11: Product UX (presets-first)

**Результаты недели:**
- Preview первых N строк перед скачиванием
- История запусков (session storage или simple log)
- Примеры presets: "basic_anonymization.json", "full_masking.json", "gdpr_minimum.json"
- Улучшенный UI: прогресс-бар, уведомления
- Документация API (Swagger/OpenAPI)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Feature prioritization
- ⚙️ **Core Backend:** Logging, API docs
- 🎨 **API/Web:** Preview table, Progress indicators
- ✅ **QA/Doc/ML:** User acceptance testing

---

### 🎯 Неделя 12: ПОКАЗ 4 - Завершённый MVP

**Обязательные артефакты:**

💻 **Код:**
- `src/sda/`: рефакторинг, чистый код
- `src/sda/io/csv_read.py`: delimiter detection, UTF-8 BOM
- `src/sda/domain/presets.py`: preset I/O
- `src/sda/interfaces/web/`: улучшенный UI с preview и presets
- `tests/`: 25+ тестов, coverage report

🎬 **Демо:**
- Поддержка CSV с запятой и точкой с запятой
- Preview первых N строк перед скачиванием
- Загрузка/сохранение preset.json
- История запусков (session storage)
- Человеческие error messages

📁 **Файлы:**
- `presets/basic_anonymization.json`: пример preset
- `presets/full_masking.json`: пример preset
- `test_data/`: CSV с разными delimiters для тестирования
- `screenshots/`: финальные скрины UI

📄 **Документация:**
- `README.md`: полная документация запуска
- API docs: автогенерированный Swagger UI
- `architecture.md`: финальная версия
- `testing.md`: как запустить тесты, coverage

**Сценарий демонстрации (12-15 мин):**
1. Генерация с preview
2. Загрузка CSV с ; delimiter → показать автодетект
3. Настройка правил через UI → сохранить preset
4. Загрузить preset на новом файле
5. Показать error message при загрузке невалидного CSV
6. Показать историю запусков
7. Открыть Swagger docs

**Критерии успеха:**
✅ Полный цикл работает без багов  
✅ CSV с разными delimiters обрабатываются  
✅ Preset можно сохранить и загрузить  
✅ Preview показывает данные корректно  
✅ Error messages понятные, не трейсы  
✅ README позволяет запустить за 5 минут  
✅ 2+ полезные мелочи реализованы

---

## СПРИНТ 5: Финализация (Недели 13-14)

### ⚡ Неделя 13: Стабилизация и тестирование

**Результаты недели:**
- Исправление критических багов
- Рефакторинг и code cleanup
- Покрытие тестами: unit + integration (pytest)
- Performance testing: файлы до 100K строк
- Деплой на Render/Fly.io (опционально, но желательно)

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Bug triage, Deploy coordination
- ⚙️ **Core Backend:** Refactoring, Performance
- 🎨 **API/Web:** UI fixes, Deploy setup
- ✅ **QA/Doc/ML:** Full test coverage, Load testing

---

### 🎓 Неделя 14: Финализация и защита

**Результаты недели:**
- Финальный README: установка, запуск, примеры
- Документация: архитектура, API, методы
- Презентация: 10-15 слайдов (проблема, решение, архитектура, demo)
- Видео-демо или live demo сценарий
- Репозиторий: чистый main, tagged release v1.0

**Задачи по ролям:**
- 👔 **Team Lead/PM:** Presentation, Demo coordination
- ⚙️ **Core Backend:** Documentation
- 🎨 **API/Web:** Demo preparation
- ✅ **QA/Doc/ML:** Final QA checklist

**Сценарий финальной защиты (15-20 мин):**
- 10 мин: Презентация (проблема → решение → архитектура → методы → процесс)
- 5 мин: Live demo (быстрый прогон самых впечатляющих фич)
- 5 мин: Ответы на вопросы

---

## 🧱 ARCHITECTURE GUARDRAILS (обязательные правила реализации)

- Бизнес-логика не размещается в `interfaces/web/routes.py`; роуты только валидируют вход, вызывают use-case и формируют ответ.
- `core/*` не зависит от FastAPI, HTTP и шаблонов; `core` тестируется unit-тестами независимо от веб-слоя.
- Все операции чтения/записи CSV проходят через `io/csv_read.py` и `io/csv_write.py`; прямой работы с файлами в роуте быть не должно.
- Единый pipeline для анонимизации: parse input → validate rules → apply methods → build report → write output.
- Для `pseudonymization` используется стабильное соответствие (одинаковый вход = одинаковый токен в рамках одного salt/маппинга).
- Любая новая фича сначала оформляется как задача в backlog с пометкой `MVP` или `Optional`.
- Рекомендуемый src-layout сохраняется без смешения слоёв: `src/sda/core`, `src/sda/io`, `src/sda/interfaces/web`, `src/sda/interfaces/cli(optional)`.

---

## ✅ DEFINITION OF DONE ПО НЕДЕЛЯМ

| Неделя | Definition of Done |
|---|---|
| 1 | Роли и доска задач готовы, репозиторий и базовый стек поднимаются, стартовый README есть |
| 2 | Архитектура согласована, CSV-форматы users/orders зафиксированы, wireframes двух страниц готовы |
| 3 | Показ 1: полный пакет артефактов собран и продемонстрирован |
| 4 | Генерация users/orders работает в core, CSV writer готов, unit-тесты на генерацию проходят |
| 5 | Базовая анонимизация (masking/redaction) реализована, CSV reader и тесты на методы готовы |
| 6 | Показ 2: end-to-end веб-сценарий работает локально, базовые ошибки обработаны |
| 7 | Генерация с `num_rows` и `seed` работает через веб, валидация параметров добавлена |
| 8 | RuleSet engine готов, default keep зафиксирован, ошибки по отсутствующим колонкам человекочитаемы |
| 9 | Показ 3: 2 шаблона + 3 метода + column rules UI + `report.json` обязательный |
| 10 | Устойчивость CSV (`;`/`,`, UTF-8), лимит размера, пустой файл и невалидные правила корректно обрабатываются |
| 11 | Presets-first UX и минимум 2 preset-примера работают, история/preview добавлены |
| 12 | Показ 4: полный MVP-цикл, человеческие ошибки, минимум 2 полезные фичи показаны |
| 13 | Багфиксы/рефакторинг завершены, regression + integration тесты зелёные |
| 14 | Финальный README, презентация, demo script и репетиция защиты готовы |

---

## 🧪 ACCEPTANCE CRITERIA (ключевые фичи MVP)

### Generate page
- Пользователь выбирает шаблон (`users` или `orders`), указывает `num_rows`, опционально `seed`, нажимает Download.
- На выходе скачивается валидный CSV с корректными заголовками и типами данных.
- При одинаковом `seed` и параметрах результат воспроизводим.
- `orders.user_id` ссылается на существующие `users.user_id`.

### Anonymize page
- После upload CSV система показывает список колонок.
- Для каждой колонки можно выбрать метод: `keep`, `masking`, `redaction`, `pseudonymization`, `drop_column(optional)`.
- Если для колонки метод не выбран, применяется `keep` и это отражается в отчёте.
- Если правило указано для несуществующей колонки, возвращается понятная ошибка (без traceback).

### report.json (обязательно)
- Генерируется при каждой операции анонимизации.
- Содержит по каждой колонке выбранный метод и факт изменений.
- Содержит агрегаты: сколько строк обработано, сколько значений изменено, предупреждения и ошибки.

### Presets (обязательно в текущем плане)
- Можно сохранить текущие правила в `preset.json`.
- Можно загрузить `preset.json` и применить его к новому CSV.
- При несовместимости preset с колонками файла показывается понятное сообщение.

---

## 📄 CONTRACT: REPORT.JSON

Минимальный рекомендуемый формат:

```json
{
  "run_id": "2026-03-15T12:34:56Z_abc123",
  "input_file": "users.csv",
  "output_file": "users_anonymized.csv",
  "rows_total": 1000,
  "columns": [
    {
      "name": "email",
      "method": "masking",
      "changed_count": 1000,
      "status": "applied"
    },
    {
      "name": "city",
      "method": "keep",
      "changed_count": 0,
      "status": "kept (no rule provided)"
    }
  ],
  "warnings": [],
  "errors": [],
  "duration_ms": 412,
  "timestamp": "2026-03-15T12:34:56Z"
}
```

---

## 🗂️ ОБЯЗАТЕЛЬНЫЙ НАБОР TEST DATA (для QA и демо)

- `test_data/users_valid.csv`
- `test_data/orders_valid.csv`
- `test_data/empty.csv`
- `test_data/invalid_delimiter.csv`
- `test_data/missing_required_column.csv`
- `test_data/invalid_encoding.csv`
- `test_data/oversized.csv` (проверка лимита размера)
- `test_data/rules_invalid_column.json`
- `test_data/presets/basic_anonymization.json`
- `test_data/presets/gdpr_minimum.json`

---

## 🚧 MVP GATES (anti-feature-creep)

| Период | Что обязательно закрыто до перехода дальше | Что запрещено до закрытия |
|---|---|---|
| До конца недели 6 | Рабочий веб end-to-end, базовые ошибки, CSV download | SDV synthesis, сложный ML, сложный CLI |
| До конца недели 9 | 2 шаблона генерации, 3 метода анонимизации, column rules UI, report.json | Дополнительные форматы (Excel/Parquet), авторизация |
| До конца недели 12 | Устойчивость CSV, presets, human-friendly errors, 2 полезные мелочи | Любые крупные refactor-only задачи без user value |
| Недели 13-14 | Стабильность, тесты, README, презентация, demo flow | Новые MVP-фичи без критической необходимости |

---

## 🔭 POST-MVP / OPTIONAL

- Suggest rules: авто-предложение правил по типам колонок (regex/heuristics, опционально spaCy/Presidio).
- Synthesize from input: синтетический датасет через SDV + `quality_report.json`.
- Batch processing: обработка нескольких файлов за один запуск (например, zip upload/download).
- Дополнительные форматы: Excel/Parquet через конвертацию в CSV-пайплайн.
- Асинхронные задачи и очередь: фоновая обработка крупных файлов со статусом и прогрессом.

---

## 🎬 DEMO CHECKLISTS (показы 2/3/4 + финал)

### Показ 2 (неделя 6)
- Проверка: сервер стартует локально без ошибок.
- Действие: generate или anonymize через веб-форму.
- Ожидаемый результат: скачивается CSV, структура корректна.
- Проверка ошибки: невалидный файл/параметр → понятное сообщение.

### Показ 3 (неделя 9)
- Проверка: users/orders генерация + FK.
- Действие: column-wise анонимизация с 3 методами.
- Ожидаемый результат: выходной CSV + `report.json`.
- Проверка default: колонка без правила отмечена как `kept (no rule provided)`.

### Показ 4 (неделя 12)
- Проверка устойчивости: файлы с `,` и `;`, UTF-8.
- Действие: загрузка preset и повторное применение.
- Ожидаемый результат: корректная анонимизация + история/preview.
- Проверка ошибок: oversized/empty/invalid CSV показывают человекочитаемые сообщения.

### Финальная защита (неделя 14)
- 10 минут: проблема, архитектура, MVP scope, реализация.
- 5 минут: live demo основного сценария (Generate → Anonymize → report).
- 5 минут: ответы на вопросы по архитектуре, тестам, ограничениям и дальнейшему развитию.

---

## ⚠️ РИСКИ И МИТИГАЦИЯ

### Высокий приоритет:

**R001: Расползание scope (feature creep)**
- **Риск:** Команда добавляет "классные фичи" вне MVP
- **Митигация:** Жёсткий MVP checklist. Новые идеи → в backlog "после MVP"

**R003: Использование реальных персональных данных**
- **Риск:** Нарушение GDPR/требований
- **Митигация:** Только Faker данные. WARNING в README. Code review

**R004: ML-надстройка блокирует MVP**
- **Риск:** Увлечение ML, забывая про базовый функционал
- **Митигация:** В MVP только intelligent suggestion (regex/эвристики: email/phone/name + предложение метода). spaCy/Presidio и SDV — только бонус после MVP

**R008: Неравномерное распределение нагрузки**
- **Риск:** Один делает всё, остальные бездействуют
- **Митигация:** WIP-лимиты по человеку, обязательные assignee в задачах, weekly check загрузки и ротация ownership

**R010: Невоспроизводимый запуск**
- **Риск:** "У меня же запускается"
- **Митигация:** requirements.txt с версиями. README с шагами

---

## ❌ АНТИ-ПАТТЕРНЫ: Что НЕ делать

1. **НЕ делать:** Авторизацию и пользователей (JWT, OAuth)
   - **Вместо:** Простой stateless сервис

2. **НЕ делать:** Сложные ML-модели с нуля (GAN, deep learning)
   - **Вместо:** Сначала regex/эвристики для suggest rules, затем (опционально) spaCy/Presidio. SDV synthesis только после MVP

3. **НЕ делать:** Базу данных для хранения файлов
   - **Вместо:** Файловое хранилище или SQLite

4. **НЕ делать:** Сложный frontend framework (React SPA отдельно)
   - **Вместо:** FastAPI templates (Jinja2)

5. **НЕ делать:** Поддержку 10+ форматов (Excel, Parquet, JSON)
   - **Вместо:** Только CSV

6. **НЕ делать:** Рефакторинг "на потом"
   - **Вместо:** Инкрементальный рефакторинг. Спринт 5 для cleanup

---

## ✅ MVP SCOPE GUARD

### Обязательно в MVP:
- ✅ 2 шаблона генерации (users, orders)
- ✅ 3+ метода анонимизации (masking, redaction, pseudonymization)
- ✅ Веб-интерфейс FastAPI (2 страницы)
- ✅ Upload/download CSV
- ✅ Настройка правил по колонкам
- ✅ Default behavior: если для колонки нет правила → keep
- ✅ Report.json (обязателен): правила по колонкам, changed_count, warnings/errors
- ✅ Preset rules (сохранить/загрузить preset.json)
- ✅ Защита ввода: лимит CSV размера, пустой файл, отсутствующие колонки
- ✅ Базовые тесты pytest
- ✅ README с инструкциями

### Опционально (nice-to-have):
- 💎 Preview первых N строк
- 💎 История запусков
- 💎 CLI интерфейс
- 💎 ML enhancement: spaCy/Presidio NER для suggest rules
- 💎 ML synthesis (SDV GaussianCopula) после MVP
- 💎 Batch processing (несколько файлов за запуск)
- 💎 Дополнительные форматы (Excel/Parquet)
- 💎 Асинхронная обработка с очередью задач
- 💎 Деплой на Render/Fly
- 💎 Docker

---

## 🎯 СОВЕТЫ ДЛЯ УСПЕХА

### Для демонстраций:
- ✅ Репетируйте за день до показа
- ✅ Подготовьте backup: видео или скриншоты
- ✅ Каждый член команды знает свою часть
- ✅ Держите готовые тестовые файлы: валидный CSV, невалидный CSV, пустой CSV
- ✅ Таймер: не превышайте отведённое время

### Что впечатляет:
- ✨ Плавный end-to-end flow без ошибок
- ✨ Реалистичные данные (не "test test test")
- ✨ Понятный UI, не нужно объяснять
- ✨ Обработка ошибок (покажите намеренно)
- ✨ Качественный код (покажите структуру)
- ✨ README: запуск за 5 минут

---

## 📊 СТАТИСТИКА ПРОЕКТА

- **Всего задач:** 58
- **Недель:** 14
- **Спринтов:** 5
- **Показов:** 4
- **Ролей:** 4 (Lead, Backend, Web, QA)
- **Общая оценка времени:** ~400-500 часов команды

---

**Создано:** 2026-02-28  
**Версия:** 1.0  
**Команда:** 4 студента
