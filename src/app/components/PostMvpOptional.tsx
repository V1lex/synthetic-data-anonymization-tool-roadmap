import { DraggableSegmented } from './ui/DraggableSegmented';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface OptionalFeature {
  id: 'rules' | 'synthesis' | 'batch' | 'formats' | 'queue';
  label: string;
  title: string;
  goal: string;
  userValue: string[];
  implementationPlan: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
}

const optionalFeatures: OptionalFeature[] = [
  {
    id: 'rules',
    label: 'Suggest rules',
    title: 'Suggest Rules (AI/Heuristics)',
    goal: 'Автоматически предлагать безопасные правила анонимизации для каждой колонки без ручной настройки.',
    userValue: [
      'Сокращает время настройки анонимизации с минут до секунд.',
      'Снижает риск забыть чувствительную колонку.',
      'Дает понятные подсказки, почему выбран конкретный метод.'
    ],
    implementationPlan: [
      'Слой инференса типа колонки: regex + статистика значений + названия полей.',
      'Матрица рекомендаций: email -> masking, phone -> masking, full_name -> pseudonymization.',
      'UI режим: suggested/accepted/overridden с ручной корректировкой.',
      'Логирование quality метрик предложений для последующей калибровки.'
    ],
    deliverables: [
      'rules_suggestions.py с API suggest_rules(columns, sample_rows).',
      'UI блок "Recommended rules" и кнопка "Apply all suggested".',
      'report.json с секцией suggestions_applied.'
    ],
    acceptanceCriteria: [
      'Для типового users.csv рекомендации покрывают минимум 90% колонок.',
      'Пользователь может принять все или изменить каждую рекомендацию вручную.',
      'Каждое предложение объясняется коротким reason в UI и report.json.'
    ]
  },
  {
    id: 'synthesis',
    label: 'Synthesize',
    title: 'Synthesize from Input',
    goal: 'Генерировать синтетический датасет на основе входных данных с сохранением статистической структуры.',
    userValue: [
      'Позволяет делиться безопасными данными для разработки и тестов.',
      'Сохраняет реалистичные распределения и взаимосвязи.',
      'Уменьшает зависимость от production выгрузок.'
    ],
    implementationPlan: [
      'Интеграция с SDV/GaussianCopula для табличной синтетики.',
      'Пайплайн: profile input -> train model -> sample N rows.',
      'Проверка приватности: отсутствие прямого копирования исходных строк.',
      'Генерация quality_report.json с отклонениями по полям и корреляциям.'
    ],
    deliverables: [
      'Новый endpoint /synthesize и страница UI "Synthesize".',
      'Артефакты synthesis_model.pkl и quality_report.json.',
      'Набор тестов на стабильность seed и структуру схемы.'
    ],
    acceptanceCriteria: [
      'Схема колонок синтетического CSV совпадает с входной.',
      'Ключевые статистики (mean/std/top categories) в заданном пороге отклонений.',
      'Прямых дубликатов строк с исходным датасетом нет.'
    ]
  },
  {
    id: 'batch',
    label: 'Batch',
    title: 'Batch Processing',
    goal: 'Обрабатывать несколько файлов одним запуском с единым набором правил.',
    userValue: [
      'Экономит время на повторяющихся операциях.',
      'Дает консистентный результат по нескольким источникам.',
      'Удобен для командного тестирования и миграций.'
    ],
    implementationPlan: [
      'Загрузка zip или мультивыбор файлов в UI.',
      'Применение одного preset к каждому файлу в батче.',
      'Сводный прогресс и итоговый batch_report.json.',
      'Выгрузка результата единым архивом.'
    ],
    deliverables: [
      'Endpoint /batch-anonymize c поддержкой multipart.',
      'batch_report.json: статус каждого файла, warnings/errors.',
      'UI таблица batch-задачи с колонками status/duration/output.'
    ],
    acceptanceCriteria: [
      'Минимум 10 файлов обрабатываются в одном запуске.',
      'Падение одного файла не ломает обработку остальных.',
      'Итоговый архив содержит результаты и единый отчет.'
    ]
  },
  {
    id: 'formats',
    label: 'Excel/Parquet',
    title: 'Additional Formats (Excel/Parquet)',
    goal: 'Поддержать вход и выход в форматах Excel и Parquet без дублирования бизнес-логики.',
    userValue: [
      'Убирает шаг ручной конвертации для аналитиков.',
      'Дает более быстрый формат хранения (Parquet) для крупных данных.',
      'Сохраняет единый UX независимо от типа файла.'
    ],
    implementationPlan: [
      'I/O адаптеры: excel_reader/writer и parquet_reader/writer.',
      'Единая внутренняя модель таблицы перед core pipeline.',
      'Валидация типов и авто-мэппинг листов в Excel.',
      'Выбор output format в интерфейсе.'
    ],
    deliverables: [
      'Новые модули io/excel_*.py и io/parquet_*.py.',
      'Обновленная документация по форматам и ограничениям.',
      'Набор интеграционных тестов на round-trip для каждого формата.'
    ],
    acceptanceCriteria: [
      'Excel и Parquet проходят тот же pipeline, что CSV.',
      'Критичные ошибки формата возвращаются понятным сообщением.',
      'Сравнение результата между CSV и Parquet эквивалентно по данным.'
    ]
  },
  {
    id: 'queue',
    label: 'Queue',
    title: 'Async Queue and Jobs',
    goal: 'Вынести тяжелые операции в очередь задач с трекингом статуса и прогресса.',
    userValue: [
      'Интерфейс не блокируется на больших файлах.',
      'Можно безопасно обрабатывать длительные задачи в фоне.',
      'Появляется аудит выполнения и повторный запуск.'
    ],
    implementationPlan: [
      'Интеграция Celery/RQ + Redis.',
      'Job lifecycle: queued -> running -> completed/failed.',
      'Endpoint /jobs/{id} со статусом и прогрессом.',
      'UI экран "Jobs" с историей и логами ошибок.'
    ],
    deliverables: [
      'worker процесс и docker-compose для локального запуска.',
      'Таблица jobs в хранилище или persist file log.',
      'Система retries и timeout policy для нестабильных задач.'
    ],
    acceptanceCriteria: [
      'Большой файл обрабатывается без таймаута HTTP запроса.',
      'Пользователь видит прогресс и финальный статус задачи.',
      'Ошибки задачи доступны в UI и журнале для диагностики.'
    ]
  }
];

export function PostMvpOptional() {
  const [selectedFeature, setSelectedFeature] = useLocalStorageState<OptionalFeature['id']>('postmvp.selected', 'rules');
  const feature = optionalFeatures.find((item) => item.id === selectedFeature)!;
  const options = optionalFeatures.map((item) => ({ id: item.id, label: item.label }));

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <DraggableSegmented
          value={selectedFeature}
          options={options}
          onChange={setSelectedFeature}
          className="w-full"
        />
        <div className="text-sm text-slate-600">{feature.title}</div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-2 text-xl font-bold text-slate-900">{feature.title}</h3>
        <p className="text-slate-700">{feature.goal}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h4 className="mb-3 font-semibold text-blue-900">Ценность для пользователя</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            {feature.userValue.map((item) => (
              <li key={item} className="rounded-md border border-white/60 bg-white/70 px-3 py-2 leading-relaxed break-words">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-purple-200 bg-purple-50 p-5">
          <h4 className="mb-3 font-semibold text-purple-900">План реализации</h4>
          <ul className="space-y-2 text-sm text-purple-800">
            {feature.implementationPlan.map((item) => (
              <li key={item} className="rounded-md border border-white/60 bg-white/70 px-3 py-2 leading-relaxed break-words">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h4 className="mb-3 font-semibold text-emerald-900">Артефакты</h4>
          <ul className="space-y-2 text-sm text-emerald-800">
            {feature.deliverables.map((item) => (
              <li key={item} className="rounded-md border border-white/60 bg-white/70 px-3 py-2 leading-relaxed break-words">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h4 className="mb-3 font-semibold text-amber-900">Критерии готовности</h4>
          <ul className="space-y-2 text-sm text-amber-800">
            {feature.acceptanceCriteria.map((item) => (
              <li key={item} className="rounded-md border border-white/60 bg-white/70 px-3 py-2 leading-relaxed break-words">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
