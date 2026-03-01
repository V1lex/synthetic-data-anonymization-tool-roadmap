import { useEffect, useState } from 'react';
import { DraggableSegmented } from './ui/DraggableSegmented';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

declare global {
  interface Window {
    exportRoadmapAllPdf?: () => Promise<void>;
  }
}

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
    title: 'Старт проекта и исследование',
    deliverables: [
      'Организация команды: распределение ролей (Lead, Backend, Web, QA/Doc)',
      'Изучение требований и кейса, разбор границ MVP и optional-фич',
      'Исследование: Faker, методы анонимизации (masking/redaction/pseudonymization)',
      'Создание Git-репозитория, структура проекта (src-layout)',
      'Установка базового стека: Python 3.11+, FastAPI, pytest'
    ],
    status: 'planned',
    roles: {
      lead: ['Организация встреч', 'Создание доски задач', 'Настройка Git'],
      backend: ['Исследование Faker', 'Прототип генерации'],
      web: ['Исследование шаблонов FastAPI', 'Макет интерфейса'],
      qa: ['Создание тест-плана', 'Настройка pytest']
    }
  },
  {
    number: 2,
    sprint: 1,
    title: 'Проектирование архитектуры',
    deliverables: [
      'Архитектура: core (generation, anonymization) + io (csv) + web-интерфейс',
      'Спецификация CSV-форматов для 2 шаблонов (users.csv, orders.csv)',
      'Детальное описание 3 методов анонимизации с примерами',
      'Макеты веб-интерфейса: страницы Generate и Anonymize',
      'Спецификация API (endpoints, request/response schemas)'
    ],
    status: 'planned',
    roles: {
      lead: ['Финализация архитектуры', 'Ревью дизайна'],
      backend: ['Дизайн core-модулей', 'API-контракты'],
      web: ['Макеты в Figma/Excalidraw', 'Пользовательские сценарии UI'],
      qa: ['Тест-кейсы для методов']
    }
  },
  {
    number: 3,
    sprint: 1,
    title: 'Показ 1: Концепция',
    deliverables: [
      'Документ с архитектурой (диаграммы модулей)',
      'Спецификация форматов: users.csv и orders.csv с примерами',
      'Описание 3 методов анонимизации с примерами до/после',
      'Макеты веб-интерфейса (2 страницы: Generate, Anonymize)',
      'Доска задач с планом на спринт 2 (недели 4-6)'
    ],
    status: 'milestone',
    roles: {
      lead: ['Подготовка презентации', 'Координация артефактов'],
      backend: ['Документация core'],
      web: ['Финальные макеты'],
      qa: ['Критерии приемки']
    }
  },
  {
    number: 4,
    sprint: 2,
    title: 'Core: генерация данных',
    deliverables: [
      'Модуль core/generation: класс DataGenerator с Faker',
      'Реализация 2 шаблонов: UsersTemplate и OrdersTemplate',
      'CSV-запись в io/csv_write.py с поддержкой UTF-8',
      'Юнит-тесты для генерации (pytest)',
      'CLI-прототип для тестирования (опционально)'
    ],
    status: 'planned',
    roles: {
      lead: ['Ревью кода', 'Управление PR'],
      backend: ['DataGenerator', 'Шаблоны', 'CSV-запись'],
      web: ['Старт FastAPI-каркаса'],
      qa: ['Юнит-тесты', 'Валидация тестовых данных']
    }
  },
  {
    number: 5,
    sprint: 2,
    title: 'Core: анонимизация (базовая)',
    deliverables: [
      'Модуль core/anonymization: базовые классы Anonymizer',
      'Реализация masking для email и phone',
      'Реализация redaction (замена на ***)',
      'CSV-чтение в io/csv_read.py',
      'Юнит-тесты для методов анонимизации'
    ],
    status: 'planned',
    roles: {
      lead: ['Ревью кода'],
      backend: ['Классы Anonymizer', 'Masking/Redaction'],
      web: ['Каркас роутов FastAPI'],
      qa: ['Тесты для анонимизации']
    }
  },
  {
    number: 6,
    sprint: 2,
    title: 'Показ 2: Сквозной сценарий',
    deliverables: [
      'Работающий веб-endpoint /generate (любой шаблон)',
      'Работающий веб-endpoint /anonymize (masking или redaction)',
      'Простая HTML-форма для тестирования',
      'Базовая обработка ошибок (400/500)',
      'Возможность скачать результат (CSV-ответ)'
    ],
    status: 'milestone',
    roles: {
      lead: ['Демо-сценарий', 'Презентация'],
      backend: ['Интеграция core + web'],
      web: ['HTML-формы', 'Загрузка/скачивание файлов'],
      qa: ['E2E-тестирование']
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
      'Предпросмотр первых 10 строк (опциональная фича)'
    ],
    status: 'planned',
    roles: {
      lead: ['Планирование фич'],
      backend: ['FK-связи', 'Поддержка seed'],
      web: ['UI страницы Generate', 'Компонент предпросмотра'],
      qa: ['Валидационные тесты']
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
      'Запись в отчёте: column_x: kept (правило не задано)',
      'Обработка ошибок: несуществующие колонки'
    ],
    status: 'planned',
    roles: {
      lead: ['Ревью архитектуры'],
      backend: ['Pseudonymization', 'Движок RuleSet'],
      web: ['UI настройки правил'],
      qa: ['Тесты граничных случаев']
    }
  },
  {
    number: 9,
    sprint: 3,
    title: 'Показ 3: Полный функционал',
    deliverables: [
      '2 шаблона генерации работают полностью',
      '3+ методов анонимизации доступны через UI',
      'Веб-форма Anonymize: выбор метода для каждой колонки',
      'Примеры файлов: users.csv, orders.csv, anonymized.csv',
      'Обязательный report.json: методы по колонкам, changed_count, warnings/errors'
    ],
    status: 'milestone',
    roles: {
      lead: ['Координация демо'],
      backend: ['Генерация report.json'],
      web: ['Выбор правил по колонкам'],
      qa: ['Документация тест-сценариев']
    }
  },
  {
    number: 10,
    sprint: 4,
    title: 'Устойчивость и UX',
    deliverables: [
      'Поддержка разных разделителей (запятая/точка с запятой)',
      'Кодировка: UTF-8 BOM для Excel',
      'Лимит размера CSV (10-20MB) + понятная ошибка',
      'Обработка пустого файла и отсутствующих колонок',
      'Человеческие сообщения об ошибках (не трейсы)',
      'Presets-first UX: загрузка/сохранение preset.json',
      'Улучшенная валидация CSV (проверка структуры)'
    ],
    status: 'planned',
    roles: {
      lead: ['UX-ревью'],
      backend: ['Устойчивость CSV', 'Preset I/O'],
      web: ['UI сообщений об ошибках', 'Загрузка/скачивание preset'],
      qa: ['Тесты форматов CSV']
    }
  },
  {
    number: 11,
    sprint: 4,
    title: 'Продуктовый UX (presets-first)',
    deliverables: [
      'Предпросмотр первых N строк перед скачиванием',
      'История запусков (session storage или простой лог)',
      'Примеры preset-файлов: "basic_anonymization.json", "full_masking.json", "gdpr_minimum.json"',
      'Улучшенный UI: прогресс-бар, уведомления',
      'Документация API (Swagger/OpenAPI)'
    ],
    status: 'planned',
    roles: {
      lead: ['Приоритизация фич'],
      backend: ['Логирование', 'Документация API'],
      web: ['Таблица предпросмотра', 'Индикаторы прогресса'],
      qa: ['Пользовательское приемочное тестирование']
    }
  },
  {
    number: 12,
    sprint: 4,
    title: 'Показ 4: Завершённый MVP',
    deliverables: [
      'Полный цикл: Generate → Anonymize → Download',
      'Устойчивость к разным CSV форматам',
      'Человеческие ошибки и валидация',
      '2+ полезные фичи (preview, presets, history)',
      'Базовый README с инструкциями запуска'
    ],
    status: 'milestone',
    roles: {
      lead: ['Финальный скрипт демо'],
      backend: ['Исправление багов'],
      web: ['Финальная полировка UI'],
      qa: ['Регрессионное тестирование']
    }
  },
  {
    number: 13,
    sprint: 5,
    title: 'Стабилизация и тестирование',
    deliverables: [
      'Исправление критических багов',
      'Рефакторинг и чистка кода',
      'Покрытие тестами: unit + integration (pytest)',
      'Тестирование производительности: файлы до 100K строк',
      'Деплой на Render/Fly.io (опционально, но желательно)'
    ],
    status: 'critical',
    roles: {
      lead: ['Приоритизация багов', 'Координация деплоя'],
      backend: ['Рефакторинг', 'Производительность'],
      web: ['Исправления UI', 'Настройка деплоя'],
      qa: ['Полное тестовое покрытие', 'Нагрузочное тестирование']
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
      lead: ['Подготовка презентации', 'Координация демо'],
      backend: ['Финальные технические правки'],
      web: ['Подготовка демо'],
      qa: ['Финальная документация', 'Итоговый QA-чеклист']
    }
  }
];

const PDF_PAGE_WIDTH_PT = 595;
const PDF_PAGE_HEIGHT_PT = 842;
const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 2260;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  return lines.length > 0 ? lines : [''];
}

function dataUriToBytes(dataUri: string) {
  const base64 = dataUri.split(',')[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function concatBytes(chunks: Uint8Array[]) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

function ascii(str: string) {
  return new TextEncoder().encode(str);
}

function padOffset(value: number) {
  return value.toString().padStart(10, '0');
}

function renderWeekToJpeg(week: Week) {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context unavailable');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const margin = 90;
  const contentWidth = CANVAS_WIDTH - margin * 2;
  let y = margin;

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 46px Arial';
  ctx.fillText(`Неделя ${week.number}`, margin, y);
  y += 56;

  ctx.fillStyle = '#334155';
  ctx.font = '600 28px Arial';
  ctx.fillText(`Спринт ${week.sprint} • ${week.title}`, margin, y);
  y += 48;

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 30px Arial';
  ctx.fillText('Результаты недели', margin, y);
  y += 38;

  ctx.font = '24px Arial';
  for (const item of week.deliverables) {
    const lines = wrapText(ctx, `• ${item}`, contentWidth - 20);
    for (const line of lines) {
      ctx.fillStyle = '#334155';
      ctx.fillText(line, margin + 10, y);
      y += 30;
    }
    y += 8;
  }

  y += 12;
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 30px Arial';
  ctx.fillText('Задачи по ролям', margin, y);
  y += 24;

  const roleSections: Array<{ title: string; tasks: string[]; bg: string; border: string; text: string }> = [
    { title: 'Team Lead/PM', tasks: week.roles.lead, bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a8a' },
    { title: 'Core Backend', tasks: week.roles.backend, bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46' },
    { title: 'API/Web', tasks: week.roles.web, bg: '#f5f3ff', border: '#ddd6fe', text: '#5b21b6' },
    { title: 'QA/Doc/ML', tasks: week.roles.qa, bg: '#fffbeb', border: '#fde68a', text: '#92400e' }
  ];

  const colGap = 26;
  const cardWidth = (contentWidth - colGap) / 2;
  let rowY = y + 18;

  for (let i = 0; i < roleSections.length; i += 2) {
    const left = roleSections[i];
    const right = roleSections[i + 1];

    const drawRoleCard = (section: typeof left, x: number) => {
      let cardY = rowY + 44;
      ctx.font = '22px Arial';
      for (const task of section.tasks) {
        const lines = wrapText(ctx, `• ${task}`, cardWidth - 34);
        cardY += lines.length * 28 + 6;
      }
      const cardHeight = Math.max(170, cardY - rowY + 16);

      ctx.fillStyle = section.bg;
      ctx.strokeStyle = section.border;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, rowY, cardWidth, cardHeight, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = section.text;
      ctx.font = 'bold 24px Arial';
      ctx.fillText(section.title, x + 18, rowY + 36);

      let textY = rowY + 70;
      ctx.font = '22px Arial';
      for (const task of section.tasks) {
        const lines = wrapText(ctx, `• ${task}`, cardWidth - 34);
        for (const line of lines) {
          ctx.fillText(line, x + 18, textY);
          textY += 28;
        }
        textY += 6;
      }

      return cardHeight;
    };

    const leftHeight = drawRoleCard(left, margin);
    const rightHeight = right ? drawRoleCard(right, margin + cardWidth + colGap) : leftHeight;
    rowY += Math.max(leftHeight, rightHeight) + 22;
  }

  const dataUri = canvas.toDataURL('image/jpeg', 0.92);
  return dataUriToBytes(dataUri);
}

function buildPdfFromJpegs(images: Uint8Array[]) {
  const parts: Uint8Array[] = [];
  const offsets: number[] = [0];

  const push = (data: Uint8Array) => {
    const currentOffset = parts.reduce((sum, chunk) => sum + chunk.length, 0);
    offsets.push(currentOffset);
    parts.push(data);
  };

  parts.push(ascii('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n'));

  const pageCount = images.length;
  const pageObjectStart = 3;
  const totalObjects = 2 + pageCount * 3;

  push(ascii('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n'));

  const kids = Array.from({ length: pageCount }, (_, i) => `${pageObjectStart + i * 3} 0 R`).join(' ');
  push(ascii(`2 0 obj\n<< /Type /Pages /Count ${pageCount} /Kids [ ${kids} ] >>\nendobj\n`));

  for (let i = 0; i < pageCount; i += 1) {
    const pageObj = pageObjectStart + i * 3;
    const contentObj = pageObj + 1;
    const imageObj = pageObj + 2;
    const imageName = `Im${i + 1}`;

    push(
      ascii(
        `${pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PDF_PAGE_WIDTH_PT} ${PDF_PAGE_HEIGHT_PT}] /Resources << /XObject << /${imageName} ${imageObj} 0 R >> >> /Contents ${contentObj} 0 R >>\nendobj\n`
      )
    );

    const contentStream = `q\n${PDF_PAGE_WIDTH_PT} 0 0 ${PDF_PAGE_HEIGHT_PT} 0 0 cm\n/${imageName} Do\nQ\n`;
    push(
      ascii(
        `${contentObj} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}endstream\nendobj\n`
      )
    );

    const image = images[i];
    const imageHeader = ascii(
      `${imageObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${CANVAS_WIDTH} /Height ${CANVAS_HEIGHT} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`
    );
    const imageFooter = ascii('\nendstream\nendobj\n');
    push(concatBytes([imageHeader, image, imageFooter]));
  }

  const xrefOffset = parts.reduce((sum, chunk) => sum + chunk.length, 0);
  let xref = `xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= totalObjects; i += 1) {
    xref += `${padOffset(offsets[i])} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  parts.push(ascii(xref));

  return new Blob([concatBytes(parts)], { type: 'application/pdf' });
}

export function RoadmapView() {
  const [expandedWeek, setExpandedWeek] = useLocalStorageState<number | null>('roadmap.expandedWeek', null);
  const [selectedSprint, setSelectedSprint] = useLocalStorageState<number>('roadmap.selectedSprint', 1);
  const [isExporting, setIsExporting] = useState(false);
  const sprintOptions = [1, 2, 3, 4, 5].map((sprint) => ({
    id: sprint,
    label: `Спринт ${sprint}`
  }));
  const sprintRanges: Record<number, string> = {
    1: 'Недели 1-3',
    2: 'Недели 4-6',
    3: 'Недели 7-9',
    4: 'Недели 10-12',
    5: 'Недели 13-14'
  };
  const visibleWeeks = weeks.filter((week) => week.sprint === selectedSprint);

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

  const exportRoadmapPdf = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const pages = weeks.map((week) => renderWeekToJpeg(week));
      const pdfBlob = buildPdfFromJpegs(pages);
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'roadmap-14-weeks.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    window.exportRoadmapAllPdf = exportRoadmapPdf;
    return () => {
      delete window.exportRoadmapAllPdf;
    };
  }, [isExporting]);

  return (
    <div className="space-y-4">
      {/* Sprint Headers */}
      <div className="space-y-3 mb-6">
        <div className="text-sm text-slate-600">{sprintRanges[selectedSprint]}</div>
        <DraggableSegmented
          value={selectedSprint}
          options={sprintOptions}
          onChange={(sprint) => {
            setSelectedSprint(sprint);
            setExpandedWeek(null);
          }}
          className="w-full"
        />
      </div>

      {/* Weeks Timeline */}
      <div className="space-y-3">
        {visibleWeeks.map((week) => (
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
                    <div className="font-semibold text-purple-900 mb-2 text-sm">API/Web</div>
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

      {isExporting && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-800">
          Экспорт roadmap в PDF...
        </div>
      )}
    </div>
  );
}
