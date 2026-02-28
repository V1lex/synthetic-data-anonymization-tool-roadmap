export function PostMvpOptional() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Suggest rules</h3>
        <p className="text-sm text-blue-800">
          Автопредложение правил анонимизации по типам колонок (email/phone/person) на основе regex/heuristics.
          Опционально можно усилить через spaCy/Presidio.
        </p>
      </div>

      <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
        <h3 className="font-semibold text-purple-900 mb-2">Synthesize from input</h3>
        <p className="text-sm text-purple-800">
          Генерация синтетического датасета, похожего на входной, через SDV (например, GaussianCopula) и
          формирование `quality_report.json` (mean/std, категории, корреляции).
        </p>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="font-semibold text-emerald-900 mb-2">Batch processing</h3>
        <p className="text-sm text-emerald-800">
          Обработка нескольких файлов за один запуск (zip upload/download), чтобы ускорить повторяющиеся операции.
        </p>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-semibold text-amber-900 mb-2">Дополнительные форматы</h3>
        <p className="text-sm text-amber-800">
          Поддержка Excel/Parquet с конвертацией в CSV-пайплайн и обратно без изменения core-логики.
        </p>
      </div>

      <div className="rounded-lg border border-slate-300 bg-slate-100 p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Асинхронные задачи и очередь</h3>
        <p className="text-sm text-slate-700">
          Очередь долгих операций (Celery/RQ), статус задач и прогресс для больших файлов.
        </p>
      </div>
    </div>
  );
}
