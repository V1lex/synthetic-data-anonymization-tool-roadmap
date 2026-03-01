import { FileText, Code, Image, Film, CheckCircle2 } from 'lucide-react';
import { DraggableSegmented } from './ui/DraggableSegmented';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface Milestone {
  number: number;
  week: number;
  title: string;
  description: string;
  artifacts: {
    category: 'docs' | 'code' | 'demo' | 'files';
    items: string[];
  }[];
  demoScenario: string;
  successCriteria: string[];
}

const milestones: Milestone[] = [
  {
    number: 1,
    week: 3,
    title: 'Концепция и архитектура',
    description: 'Показ концепции проекта, архитектуры и спецификаций',
    artifacts: [
      {
        category: 'docs',
        items: [
          'architecture.md: диаграмма модулей (core/io/interfaces), описание компонентов',
          'csv_formats.md: спецификация users.csv и orders.csv с примерами данных',
          'anonymization_methods.md: детальное описание masking/redaction/pseudonymization',
          'api_spec.yaml: OpenAPI спецификация endpoints'
        ]
      },
      {
        category: 'files',
        items: [
          'wireframes/: скриншоты или ссылки на Figma/Excalidraw',
          'examples/users_sample.csv: пример users.csv (10 строк)',
          'examples/orders_sample.csv: пример orders.csv (20 строк)',
          'examples/users_anonymized.csv: before/after пример анонимизации'
        ]
      },
      {
        category: 'code',
        items: [
          'project_structure.txt: дерево папок src/sda/...',
          'requirements.txt: базовые зависимости (faker, fastapi, pytest)',
          'README.md: описание проекта, цели MVP'
        ]
      }
    ],
    demoScenario: 'Презентация слайдов (10 мин): проблематика → архитектура → примеры CSV → методы → UI mockups → план спринта 2',
    successCriteria: [
      'Понятная архитектура с разделением ответственности',
      'Конкретные примеры CSV с корректными типами данных',
      'Описание 3+ методов анонимизации с before/after',
      'Wireframes двух страниц (Generate/Anonymize)',
      'Доска задач на спринт 2 заполнена с оценками'
    ]
  },
  {
    number: 2,
    week: 6,
    title: 'Сквозной end-to-end сценарий',
    description: 'Работающий веб-интерфейс с базовой генерацией или анонимизацией',
    artifacts: [
      {
        category: 'code',
        items: [
          'src/sda/core/generation.py: класс DataGenerator',
          'src/sda/core/anonymization.py: базовый Anonymizer',
          'src/sda/io/csv_*.py: reader и writer',
          'src/sda/interfaces/web/routes.py: endpoints /generate и /anonymize',
          'tests/: минимум 5 unit-тестов'
        ]
      },
      {
        category: 'demo',
        items: [
          'Локально запущенный FastAPI сервер (http://localhost:8000)',
          'HTML форма для генерации (любой шаблон)',
          'HTML форма для анонимизации (masking или redaction)',
          'Возможность скачать результат в CSV'
        ]
      },
      {
        category: 'files',
        items: [
          'generated_users.csv: результат генерации',
          'anonymized_sample.csv: результат анонимизации',
          'test_report.txt: результаты pytest'
        ]
      }
    ],
    demoScenario: 'Live demo (5-7 мин): запуск сервера → открыть /generate → выбрать шаблон → скачать CSV → показать содержимое → загрузить файл в /anonymize → выбрать метод → скачать результат → показать изменения',
    successCriteria: [
      'Сервер запускается без ошибок',
      'Генерация создаёт валидный CSV',
      'Анонимизация корректно применяет хотя бы 1 метод',
      'Обработка базовых ошибок (400/500)',
      'Скачивание файлов работает',
      'Минимум 5 passing тестов'
    ]
  },
  {
    number: 3,
    week: 9,
    title: 'Полный MVP функционал',
    description: '2 шаблона генерации, 3+ метода анонимизации, настройка правил',
    artifacts: [
      {
        category: 'code',
        items: [
          'src/sda/core/generation.py: UsersTemplate + OrdersTemplate с FK',
          'src/sda/core/anonymization.py: masking/redaction/pseudonymization/drop',
          'src/sda/domain/rules.py: RuleSet, ColumnRule классы',
          'src/sda/interfaces/web/: полные HTML страницы Generate и Anonymize',
          'tests/: 15+ тестов с edge cases'
        ]
      },
      {
        category: 'demo',
        items: [
          'Веб-страница Generate: dropdown выбор шаблона, input для num_rows и seed',
          'Веб-страница Anonymize: upload CSV, таблица колонок с dropdown методов',
          'Обязательная генерация report.json: методы по колонкам, changed_count, warnings/errors'
        ]
      },
      {
        category: 'files',
        items: [
          'examples/users_1000.csv: большой файл',
          'examples/orders_1000.csv: с FK на users',
          'examples/anonymized_users.csv: результат с разными методами',
          'examples/report.json: обязательный отчёт с итогами обработки',
          'screenshots/: скрины UI Generate и Anonymize'
        ]
      }
    ],
    demoScenario: 'Live demo (10 мин): 1) Генерация users.csv (100 строк, seed=42) → показать в Excel. 2) Генерация orders.csv → проверить FK. 3) Загрузить users в Anonymize → для email выбрать masking, для phone masking, для full_name pseudonymization → скачать → показать результат и report.json',
    successCriteria: [
      '2 шаблона генерируют корректные данные с FK',
      '3+ метода анонимизации работают',
      'UI позволяет выбирать метод для каждой колонки',
      'Report.json генерируется всегда и содержит методы, changed_count, warnings/errors',
      'Обработка несуществующих колонок (ошибка)',
      'Default behavior: колонки без правил остаются (keep) и помечаются в отчёте как kept (no rule provided)'
    ]
  },
  {
    number: 4,
    week: 12,
    title: 'Завершённый MVP + мелочи',
    description: 'Устойчивость, человеческие ошибки, полезные фичи',
    artifacts: [
      {
        category: 'code',
        items: [
          'src/sda/: рефакторинг, чистый код',
          'src/sda/io/csv_read.py: delimiter detection, UTF-8 BOM',
          'src/sda/domain/presets.py: preset I/O',
          'src/sda/interfaces/web/: улучшенный UI с preview и presets',
          'tests/: 25+ тестов, coverage report'
        ]
      },
      {
        category: 'demo',
        items: [
          'Поддержка CSV с запятой и точкой с запятой',
          'Лимит размера CSV (10-20MB) + понятная ошибка',
          'Обработка пустого файла и отсутствующих колонок',
          'Preview первых N строк перед скачиванием',
          'Presets-first UX: загрузка/сохранение preset.json',
          'История запусков (session storage)',
          'Человеческие error messages'
        ]
      },
      {
        category: 'files',
        items: [
          'presets/basic_anonymization.json: пример preset',
          'presets/full_masking.json: пример preset',
          'presets/gdpr_minimum.json: пример preset',
          'test_data/: CSV с разными delimiters для тестирования',
          'screenshots/: финальные скрины UI',
          'README.md: полная документация запуска'
        ]
      },
      {
        category: 'docs',
        items: [
          'README.md: установка, запуск, примеры использования',
          'API docs: автогенерированный Swagger UI',
          'architecture.md: финальная версия',
          'testing.md: как запустить тесты, coverage'
        ]
      }
    ],
    demoScenario: 'Live demo (12-15 мин): 1) Генерация с preview. 2) Загрузка CSV с ; delimiter → показать автодетект. 3) Настройка правил через UI → сохранить preset. 4) Загрузить preset на новом файле. 5) Показать error message при загрузке невалидного CSV. 6) Показать историю запусков. 7) Открыть Swagger docs',
    successCriteria: [
      'Полный цикл работает без багов',
      'CSV с разными delimiters обрабатываются',
      'Preset можно сохранить и загрузить',
      'Пустой CSV, oversized CSV и отсутствующие колонки обрабатываются понятными ошибками',
      'Preview показывает данные корректно',
      'Error messages понятные, не трейсы',
      'README позволяет запустить за 5 минут',
      '2+ полезные мелочи реализованы'
    ]
  }
];

export function MilestoneDetails() {
  const [selectedMilestone, setSelectedMilestone] = useLocalStorageState<number>('milestone.selected', 1);
  const milestone = milestones.find(m => m.number === selectedMilestone)!;
  const milestoneOptions = milestones.map((m) => ({
    id: m.number,
    label: `Показ ${m.number}`
  }));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'docs': return <FileText className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      case 'demo': return <Film className="w-5 h-5" />;
      case 'files': return <Image className="w-5 h-5" />;
    }
  };

  const categoryStyles: Record<string, { container: string; title: string; list: string }> = {
    docs: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-900',
      list: 'text-blue-800'
    },
    code: {
      container: 'bg-emerald-50 border-emerald-200',
      title: 'text-emerald-900',
      list: 'text-emerald-800'
    },
    demo: {
      container: 'bg-purple-50 border-purple-200',
      title: 'text-purple-900',
      list: 'text-purple-800'
    },
    files: {
      container: 'bg-amber-50 border-amber-200',
      title: 'text-amber-900',
      list: 'text-amber-800'
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'docs': return 'Документация';
      case 'code': return 'Код';
      case 'demo': return 'Демо';
      case 'files': return 'Файлы';
    }
  };

  return (
    <div className="space-y-6">
      {/* Milestone Selector */}
      <div className="space-y-3">
        <DraggableSegmented
          value={selectedMilestone}
          options={milestoneOptions}
          onChange={setSelectedMilestone}
          className="w-full"
        />
        <div className="text-sm text-slate-600">
          Неделя {milestone.week}: {milestone.title}
        </div>
      </div>

      {/* Milestone Details */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-500 mb-2">
                Показ {milestone.number} • Неделя {milestone.week}
              </div>
              <h2 className="font-bold text-2xl mb-2 text-slate-900">{milestone.title}</h2>
              <p className="text-slate-600">{milestone.description}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Artifacts */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Артефакты
            </h3>
            <div className={`grid grid-cols-1 gap-4 ${
              milestone.artifacts.length === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2'
            }`}>
              {milestone.artifacts.map((artifact, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border p-4 ${categoryStyles[artifact.category].container}`}
                >
                  <div className={`mb-3 flex items-center gap-2 font-semibold ${categoryStyles[artifact.category].title}`}>
                    {getCategoryIcon(artifact.category)}
                    {getCategoryLabel(artifact.category)}
                  </div>
                  <ul className={`space-y-2 text-sm ${categoryStyles[artifact.category].list}`}>
                    {artifact.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="rounded-md border border-white/50 bg-white/50 px-3 py-2 leading-relaxed break-words">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Scenario */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Film className="w-5 h-5" />
              Сценарий демонстрации
            </h3>
            <p className="text-purple-900">{milestone.demoScenario}</p>
          </div>

          {/* Success Criteria */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Критерии
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {milestone.successCriteria.map((criterion, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-emerald-900">{criterion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h3 className="font-bold mb-4 text-slate-900">График показов</h3>
        <div className="grid grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div key={m.number} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-2xl font-bold mb-1 text-slate-900">Неделя {m.week}</div>
              <div className="text-sm text-slate-600">{m.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
