import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Week {
  number: number;
  sprint: number;
  title: string;
  deliverables: string[];
  status: 'planned' | 'critical' | 'milestone';
  roles: {
    lead: string[];
    backend: string[];
    web: string[];
    qa: string[];
  };
}

const weeks: Week[] = [
  {
    number: 1,
    sprint: 1,
    title: 'Kickoff & Research',
    deliverables: [
      'Организация команды: распределение ролей (Lead, Backend, Web, QA/Doc)',
      'Изучение требований и кейса, разбор MVP-scope vs optional',
      'Исследование: Faker, методы анонимизации (masking/redaction/pseudonymization)',
      'Создание Git-репозитория, структура проекта (src-layout)',
      'Установка базового стека: Python 3.11+, FastAPI, pytest'
    ],
    status: 'planned',
    roles: {
      lead: ['Организация встреч', 'Создание доски задач', 'Настройка Git'],
      backend: ['Исследование Faker', 'Прототип генерации'],
      web: ['Исследование FastAPI templates', 'Mockup UI'],
      qa: ['Создание тест-плана', 'Настройка pytest']
    }
  },
  {
    number: 2,
    sprint: 1,
    title: 'Проектирование архитектуры',
    deliverables: [
      'Архитектура: core (generation, anonymization) + io (csv) + interfaces/web',
      'Спецификация CSV-форматов для 2 шаблонов (users.csv, orders.csv)',
      'Детальное описание 3 методов анонимизации с примерами',
      'Wireframe веб-интерфейса: страницы Generate и Anonymize',
      'API спецификация (endpoints, request/response schemas)'
    ],
    status: 'planned',
    roles: {
      lead: ['Финализация архитектуры', 'Ревью дизайна'],
      backend: ['Дизайн core модулей', 'API contracts'],
      web: ['Wireframes в Figma/Excalidraw', 'UI flow'],
      qa: ['Тест-кейсы для методов']
    }
  },
  {
    number: 3,
    sprint: 1,
    title: 'ПОКАЗ 1: Концепция',
    deliverables: [
      'Документ с архитектурой (диаграммы модулей)',
      'Спецификация форматов: users.csv и orders.csv с примерами',
      'Описание 3 методов анонимизации с before/after примерами',
      'Макеты веб-интерфейса (2 страницы: Generate, Anonymize)',
      'Доска задач с планом на спринт 2 (недели 4-6)'
    ],
    status: 'milestone',
    roles: {
      lead: ['Подготовка презентации', 'Координация артефактов'],
      backend: ['Документация core'],
      web: ['Финальные mockups'],
      qa: ['Acceptance criteria']
    }
  },
  {
    number: 4,
    sprint: 2,
    title: 'Core: Генерация данных',
    deliverables: [
      'Модуль core/generation: класс DataGenerator с Faker',
      'Реализация 2 шаблонов: UsersTemplate и OrdersTemplate',
      'CSV writer в io/csv_write.py с поддержкой UTF-8',
      'Unit-тесты для генерации (pytest)',
      'CLI-прототип для тестирования (опционально)'
    ],
    status: 'planned',
    roles: {
      lead: ['Ревью кода', 'PR management'],
      backend: ['DataGenerator', 'Templates', 'CSV writer'],
      web: ['Начало FastAPI skeleton'],
      qa: ['Unit tests', 'Test data validation']
    }
  },
  {
    number: 5,
    sprint: 2,
    title: 'Core: Анонимизация (базовая)',
    deliverables: [
      'Модуль core/anonymization: базовые классы Anonymizer',
      'Реализация masking для email и phone',
      'Реализация redaction (замена на ***)',
      'CSV reader в io/csv_read.py',
      'Unit-тесты для методов анонимизации'
    ],
    status: 'planned',
    roles: {
      lead: ['Code reviews'],
      backend: ['Anonymizer classes', 'Masking/Redaction'],
      web: ['FastAPI routes skeleton'],
      qa: ['Tests для анонимизации']
    }
  },
  {
    number: 6,
    sprint: 2,
    title: 'ПОКАЗ 2: Сквозной сценарий',
    deliverables: [
      'Работающий веб-endpoint /generate (любой шаблон)',
      'Работающий веб-endpoint /anonymize (masking или redaction)',
      'Простая HTML-форма для тестирования',
      'Базовая обработка ошибок (400/500)',
      'Возможность скачать результат (CSV file response)'
    ],
    status: 'milestone',
    roles: {
      lead: ['Demo сценарий', 'Презентация'],
      backend: ['Интеграция core + web'],
      web: ['HTML forms', 'File upload/download'],
      qa: ['E2E тестирование']
    }
  },
  {
    number: 7,
    sprint: 3,
    title: 'Полная реализация генерации',
    deliverables: [
      'Финализация 2 шаблонов с foreign key (orders.user_id)',
      'Параметры генерации: num_rows, seed для воспроизводимости',
      'Веб-страница Generate с формой выбора',
      'Валидация параметров (Pydantic schemas)',
      'Preview первых 10 строк (опциональная фича)'
    ],
    status: 'planned',
    roles: {
      lead: ['Feature planning'],
      backend: ['FK relationships', 'Seed handling'],
      web: ['Generate page UI', 'Preview component'],
      qa: ['Validation tests']
    }
  },
  {
    number: 8,
    sprint: 3,
    title: 'Полная реализация анонимизации',
    deliverables: [
      'Реализация pseudonymization (consistent hashing с salt)',
      'Drop column метод',
      'Модуль domain/rules.py: RuleSet, ColumnRule',
      'Применение правил по колонкам: если правила нет → keep (не менять)',
      'Запись в отчёте: column_x: kept (no rule provided)',
      'Обработка ошибок: несуществующие колонки'
    ],
    status: 'planned',
    roles: {
      lead: ['Architecture review'],
      backend: ['Pseudonymization', 'RuleSet engine'],
      web: ['Rules configuration UI'],
      qa: ['Edge case tests']
    }
  },
  {
    number: 9,
    sprint: 3,
    title: 'ПОКАЗ 3: Полный функционал',
    deliverables: [
      '2 шаблона генерации работают полностью',
      '3+ методов анонимизации доступны через UI',
      'Веб-форма Anonymize: выбор метода для каждой колонки',
      'Примеры файлов: users.csv, orders.csv, anonymized.csv',
      'Обязательный report.json: методы по колонкам, changed_count, warnings/errors'
    ],
    status: 'milestone',
    roles: {
      lead: ['Demo coordination'],
      backend: ['Report generation'],
      web: ['Column-wise rule selector'],
      qa: ['Test scenarios documentation']
    }
  },
  {
    number: 10,
    sprint: 4,
    title: 'Устойчивость и UX',
    deliverables: [
      'Поддержка разных разделителей (запятая/точка с запятой)',
      'Encoding: UTF-8 BOM для Excel',
      'Лимит размера CSV (10-20MB) + понятная ошибка',
      'Обработка пустого файла и отсутствующих колонок',
      'Человеческие сообщения об ошибках (не трейсы)',
      'Presets-first UX: загрузка/сохранение preset.json',
      'Улучшенная валидация CSV (проверка структуры)'
    ],
    status: 'planned',
    roles: {
      lead: ['UX review'],
      backend: ['CSV robustness', 'Preset I/O'],
      web: ['Error messages UI', 'Preset upload/download'],
      qa: ['CSV format tests']
    }
  },
  {
    number: 11,
    sprint: 4,
    title: 'Product UX (presets-first)',
    deliverables: [
      'Preview первых N строк перед скачиванием',
      'История запусков (session storage или simple log)',
      'Примеры presets: "basic_anonymization.json", "full_masking.json", "gdpr_minimum.json"',
      'Улучшенный UI: прогресс-бар, уведомления',
      'Документация API (Swagger/OpenAPI)'
    ],
    status: 'planned',
    roles: {
      lead: ['Feature prioritization'],
      backend: ['Logging', 'API docs'],
      web: ['Preview table', 'Progress indicators'],
      qa: ['User acceptance testing']
    }
  },
  {
    number: 12,
    sprint: 4,
    title: 'ПОКАЗ 4: Завершённый MVP',
    deliverables: [
      'Полный цикл: Generate → Anonymize → Download',
      'Устойчивость к разным CSV форматам',
      'Человеческие ошибки и валидация',
      '2+ полезные фичи (preview, presets, history)',
      'Базовый README с инструкциями запуска'
    ],
    status: 'milestone',
    roles: {
      lead: ['Final demo script'],
      backend: ['Bug fixes'],
      web: ['UI polish'],
      qa: ['Regression testing']
    }
  },
  {
    number: 13,
    sprint: 5,
    title: 'Стабилизация и тестирование',
    deliverables: [
      'Исправление критических багов',
      'Рефакторинг и code cleanup',
      'Покрытие тестами: unit + integration (pytest)',
      'Performance testing: файлы до 100K строк',
      'Деплой на Render/Fly.io (опционально, но желательно)'
    ],
    status: 'critical',
    roles: {
      lead: ['Bug triage', 'Deploy coordination'],
      backend: ['Refactoring', 'Performance'],
      web: ['UI fixes', 'Deploy setup'],
      qa: ['Full test coverage', 'Load testing']
    }
  },
  {
    number: 14,
    sprint: 5,
    title: 'Финализация и защита',
    deliverables: [
      'Финальный README: установка, запуск, примеры',
      'Документация: архитектура, API, методы',
      'Презентация: 10-15 слайдов (проблема, решение, архитектура, demo)',
      'Видео-демо или live demo сценарий',
      'Репозиторий: чистый main, tagged release v1.0'
    ],
    status: 'critical',
    roles: {
      lead: ['Presentation', 'Demo coordination'],
      backend: ['Documentation'],
      web: ['Demo preparation'],
      qa: ['Final QA checklist']
    }
  }
];

export function RoadmapView() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const getStatusColor = (status: Week['status']) => {
    switch (status) {
      case 'milestone':
        return 'bg-purple-100 border-purple-300 text-purple-900';
      case 'critical':
        return 'bg-amber-100 border-amber-300 text-amber-900';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  return (
    <div className="space-y-4">
      {/* Sprint Headers */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((sprint) => (
          <div key={sprint} className="bg-slate-800 text-white rounded-lg p-4 text-center">
            <div className="font-bold">Спринт {sprint}</div>
            <div className="text-sm text-slate-300 mt-1">
              {sprint === 1 && 'Недели 1-3'}
              {sprint === 2 && 'Недели 4-6'}
              {sprint === 3 && 'Недели 7-9'}
              {sprint === 4 && 'Недели 10-12'}
              {sprint === 5 && 'Недели 13-14'}
            </div>
          </div>
        ))}
      </div>

      {/* Weeks Timeline */}
      <div className="space-y-3">
        {weeks.map((week) => (
          <div
            key={week.number}
            className={`border-2 rounded-lg overflow-hidden transition-all ${getStatusColor(week.status)}`}
          >
            <button
              onClick={() => setExpandedWeek(expandedWeek === week.number ? null : week.number)}
              className="w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">Неделя {week.number}</span>
                    <span className="text-sm opacity-75">Спринт {week.sprint}</span>
                  </div>
                  <div className="font-semibold mt-1">{week.title}</div>
                </div>
              </div>
              <div className="text-2xl">{expandedWeek === week.number ? '−' : '+'}</div>
            </button>

            <div
              className={`px-6 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
                expandedWeek === week.number
                  ? 'max-h-[1200px] opacity-100 pt-4 pb-6'
                  : 'max-h-0 opacity-0 pt-0 pb-0'
              }`}
            >
                <>
                {/* Deliverables */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {week.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-semibold text-blue-900 mb-2 text-sm">Team Lead/PM</div>
                    <ul className="space-y-1 text-sm text-blue-800">
                      {week.roles.lead.map((task, idx) => (
                        <li key={idx}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="font-semibold text-emerald-900 mb-2 text-sm">Core Backend</div>
                    <ul className="space-y-1 text-sm text-emerald-800">
                      {week.roles.backend.map((task, idx) => (
                        <li key={idx}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="font-semibold text-purple-900 mb-2 text-sm">Web/UX</div>
                    <ul className="space-y-1 text-sm text-purple-800">
                      {week.roles.web.map((task, idx) => (
                        <li key={idx}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="font-semibold text-amber-900 mb-2 text-sm">QA/Doc/ML</div>
                    <ul className="space-y-1 text-sm text-amber-800">
                      {week.roles.qa.map((task, idx) => (
                        <li key={idx}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                </>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
