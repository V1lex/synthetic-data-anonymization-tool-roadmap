import { Play, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface DemoScenario {
  milestone: number;
  week: number;
  title: string;
  duration: string;
  steps: {
    action: string;
    expected: string;
    notes?: string;
  }[];
}

const demoScenarios: DemoScenario[] = [
  {
    milestone: 2,
    week: 6,
    title: 'Сквозной end-to-end сценарий',
    duration: '5-7 минут',
    steps: [
      {
        action: '1. Запустить сервер локально',
        expected: 'uvicorn запускается без ошибок, доступен на localhost:8000',
        notes: 'Показать терминал с логами'
      },
      {
        action: '2. Открыть браузер → http://localhost:8000',
        expected: 'Загружается главная страница с навигацией',
        notes: 'Показать UI'
      },
      {
        action: '3. Перейти на /generate',
        expected: 'Форма с выбором шаблона (users или orders) и input для num_rows',
        notes: 'Выбрать users, 50 строк'
      },
      {
        action: '4. Нажать "Generate" → скачать CSV',
        expected: 'Файл generated_users.csv скачивается',
        notes: 'Открыть в Excel/VSCode, показать данные'
      },
      {
        action: '5. Перейти на /anonymize',
        expected: 'Форма загрузки файла и выбор метода',
        notes: 'Загрузить generated_users.csv'
      },
      {
        action: '6. Выбрать метод (masking) → нажать "Anonymize"',
        expected: 'Файл anonymized_users.csv скачивается',
        notes: 'Открыть, показать замаскированные email: iv***@domain'
      },
      {
        action: '7. Показать обработку ошибки',
        expected: 'При загрузке невалидного файла → сообщение 400 Bad Request',
        notes: 'Загрузить .txt файл вместо CSV'
      }
    ],
  },
  {
    milestone: 3,
    week: 9,
    title: 'Полный MVP функционал',
    duration: '10 минут',
    steps: [
      {
        action: '1. Генерация users.csv',
        expected: 'Выбрать template=users, num_rows=100, seed=42 → скачать',
        notes: 'Показать воспроизводимость: с тем же seed результат идентичен'
      },
      {
        action: '2. Открыть users.csv',
        expected: 'Колонки: user_id, full_name, email, phone, city, registered_at',
        notes: 'Проверить корректность данных (email валидный, даты в нужном формате)'
      },
      {
        action: '3. Генерация orders.csv',
        expected: 'Выбрать template=orders, num_rows=200 → скачать',
        notes: 'Показать foreign key: orders.user_id ссылается на users.user_id'
      },
      {
        action: '4. Загрузить users.csv в /anonymize',
        expected: 'Показывается таблица со списком колонок',
        notes: 'Каждая колонка имеет dropdown с методами'
      },
      {
        action: '5. Настроить правила: email=masking, phone=masking, full_name=pseudonymization',
        expected: 'Dropdown выбраны корректно',
        notes: 'Для других колонок: keep (default)'
      },
      {
        action: '6. Нажать "Apply" → скачать результат',
        expected: 'anonymized_users.csv + report.json',
        notes: 'Открыть оба файла'
      },
      {
        action: '7. Показать anonymized_users.csv',
        expected: 'email: iv***@example.com, phone: +31******78, full_name: псевдоним',
        notes: 'user_id, city, registered_at остались без изменений'
      },
      {
        action: '8. Показать report.json',
        expected: 'JSON: какие колонки чем обработаны, changed_count, warnings/errors, timestamp',
        notes: 'Показать, что для колонок без правил стоит kept (no rule provided)'
      },
      {
        action: '9. Протестировать ошибку: загрузить CSV, указать правило на несуществующую колонку',
        expected: 'Сообщение: "Column \'xyz\' not found in CSV"',
        notes: 'Человеческое сообщение, не traceback'
      }
    ],
  },
  {
    milestone: 4,
    week: 12,
    title: 'Завершённый MVP + мелочи',
    duration: '12-15 минут',
    steps: [
      {
        action: '1. Генерация с preview',
        expected: 'После генерации показывается preview первых 10 строк',
        notes: 'Можно проверить данные перед скачиванием'
      },
      {
        action: '2. Загрузить CSV с ; delimiter',
        expected: 'Система автоматически детектирует разделитель',
        notes: 'Показать файл с точкой с запятой'
      },
      {
        action: '3. Настроить правила через UI → сохранить как preset',
        expected: 'Кнопка "Save preset" → скачивается basic_anonymization.json',
        notes: 'Показать содержимое JSON'
      },
      {
        action: '4. Загрузить другой CSV',
        expected: 'Новый файл users_2.csv',
        notes: 'Схема такая же'
      },
      {
        action: '5. Загрузить preset basic_anonymization.json',
        expected: 'Правила автоматически применяются к колонкам',
        notes: 'Не нужно выбирать методы вручную'
      },
      {
        action: '6. Нажать "Apply" → скачать результат',
        expected: 'Анонимизация с теми же правилами',
        notes: 'Preset работает корректно'
      },
      {
        action: '7. Показать error message при невалидном CSV',
        expected: 'Загрузить файл с кракозябрами → понятная ошибка',
        notes: '"Unable to parse CSV: invalid format"'
      },
      {
        action: '8. Показать историю запусков',
        expected: 'Список предыдущих операций (генерация/анонимизация)',
        notes: 'Session storage или simple log'
      },
      {
        action: '9. Открыть /docs',
        expected: 'Swagger UI с документацией API',
        notes: 'Показать endpoints, schemas, try it out'
      },
      {
        action: '10. Показать README',
        expected: 'Чёткие инструкции: установка, запуск, примеры',
        notes: 'Можно запустить за 5 минут'
      }
    ],
  },
  {
    milestone: 5,
    week: 14,
    title: 'Финальная защита',
    duration: '15-20 минут (10 мин презентация + 5 мин демо + 5 мин вопросы)',
    steps: [
      {
        action: '1. Презентация (слайды)',
        expected: 'Слайд 1-2: проблема (зачем нужна анонимизация)',
        notes: 'GDPR, синтетические данные для разработки'
      },
      {
        action: '2. Слайд 3-4: Решение',
        expected: 'Обзор нашего инструмента, ключевые возможности',
        notes: 'Генерация + анонимизация, веб-интерфейс'
      },
      {
        action: '3. Слайд 5-6: Архитектура',
        expected: 'Диаграмма модулей: core/io/interfaces',
        notes: 'Объяснить разделение ответственности'
      },
      {
        action: '4. Слайд 7-8: Методы анонимизации',
        expected: 'Masking, redaction, pseudonymization с примерами',
        notes: 'Before/after примеры'
      },
      {
        action: '5. Слайд 9-10: Стек и процесс',
        expected: 'Python, FastAPI, Faker, pytest. Git workflow, спринты',
        notes: 'Показать командную работу'
      },
      {
        action: '6. Live Demo: Быстрый прогон',
        expected: 'Генерация → анонимизация → preset → результат (5 мин)',
        notes: 'Самые впечатляющие фичи'
      },
      {
        action: '7. Показать код (опционально)',
        expected: 'Структура проекта, чистота кода',
        notes: 'Открыть VSCode, показать архитектуру'
      },
      {
        action: '8. Показать тесты и coverage',
        expected: 'pytest результаты, coverage report',
        notes: 'Демонстрация качества'
      },
      {
        action: '9. Слайд 11-12: Достижения и выводы',
        expected: 'Что сделали, что узнали, что можно улучшить',
        notes: 'Рефлексия команды'
      },
      {
        action: '10. Ответы на вопросы',
        expected: 'Готовность объяснить любую часть проекта',
        notes: 'Каждый член команды знает свою часть'
      }
    ],
  }
];

export function DemoScenarios() {
  const [selectedDemo, setSelectedDemo] = useState<number>(2);
  const demo = demoScenarios.find(d => d.milestone === selectedDemo)!;

  return (
    <div className="space-y-6">
      {/* Demo Selector */}
      <div className="grid grid-cols-4 gap-4">
        {demoScenarios.map((d) => (
          <button
            key={d.milestone}
            onClick={() => setSelectedDemo(d.milestone)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              selectedDemo === d.milestone
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-slate-900 border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="font-bold mb-1">Показ {d.milestone}</div>
            <div className={`text-sm ${selectedDemo === d.milestone ? 'text-blue-100' : 'text-slate-600'}`}>
              Неделя {d.week}
            </div>
          </button>
        ))}
      </div>

      {/* Demo Details */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-blue-100 mb-2">
                ДЕМО СЦЕНАРИЙ • Показ {demo.milestone} • Неделя {demo.week}
              </div>
              <h2 className="font-bold text-2xl mb-2">{demo.title}</h2>
              <p className="text-blue-100">Длительность: {demo.duration}</p>
            </div>
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Steps */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600" />
              Пошаговый сценарий
            </h3>
            <div className="space-y-4">
              {demo.steps.map((step, idx) => (
                <div key={idx} className="relative pl-8">
                  {/* Timeline connector */}
                  {idx < demo.steps.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-blue-200" />
                  )}
                  
                  <div className="absolute left-0 top-1">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="font-semibold text-slate-900 mb-2">{step.action}</div>
                    <div className="flex items-start gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-emerald-800 bg-emerald-50 px-3 py-1 rounded">
                        {step.expected}
                      </span>
                    </div>
                    {step.notes && (
                      <div className="text-sm text-slate-600 italic mt-2">
                        {step.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Timeline of all demos */}
      <div className="bg-slate-800 text-white rounded-lg p-6">
        <h3 className="font-bold mb-4 text-lg">График всех демо</h3>
        <div className="grid grid-cols-4 gap-4">
          {demoScenarios.map((d) => (
            <div key={d.milestone} className="bg-white/10 rounded-lg p-4 backdrop-blur">
              <div className="text-2xl font-bold mb-2">Неделя {d.week}</div>
              <div className="text-sm text-slate-300 mb-2">{d.title}</div>
              <div className="text-xs text-slate-400">{d.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
