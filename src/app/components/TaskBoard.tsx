import { Users, Briefcase, Palette, CheckSquare } from 'lucide-react';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  role: 'lead' | 'backend' | 'web' | 'qa';
  sprint: number;
  priority: 'high' | 'medium' | 'low';
  dependencies?: string[];
  estimated: string;
}

type RoleId = Task['role'];

const tasks: Task[] = [
  // Sprint 1 (Weeks 1-3)
  { id: 'T001', title: 'Настройка Git репозитория и структуры проекта', role: 'lead', sprint: 1, priority: 'high', estimated: '4ч' },
  { id: 'T002', title: 'Создание доски задач (Trello/Notion/GitHub Projects)', role: 'lead', sprint: 1, priority: 'high', estimated: '2ч' },
  { id: 'T003', title: 'Архитектура: дизайн модулей core/io/interfaces', role: 'backend', sprint: 1, priority: 'high', estimated: '8ч' },
  { id: 'T004', title: 'Исследование Faker: примеры генерации данных', role: 'backend', sprint: 1, priority: 'high', estimated: '4ч' },
  { id: 'T005', title: 'Спецификация CSV-форматов (users, orders)', role: 'backend', sprint: 1, priority: 'high', estimated: '6ч' },
  { id: 'T006', title: 'Дизайн методов анонимизации с примерами', role: 'backend', sprint: 1, priority: 'high', estimated: '6ч' },
  { id: 'T007', title: 'Wireframes UI: страницы Generate и Anonymize', role: 'web', sprint: 1, priority: 'high', estimated: '8ч' },
  { id: 'T008', title: 'API спецификация (endpoints, schemas)', role: 'web', sprint: 1, priority: 'high', dependencies: ['T003'], estimated: '6ч' },
  { id: 'T009', title: 'Настройка pytest и базовая структура тестов', role: 'qa', sprint: 1, priority: 'high', estimated: '4ч' },
  { id: 'T010', title: 'Создание тест-плана и acceptance criteria', role: 'qa', sprint: 1, priority: 'medium', estimated: '6ч' },
  { id: 'T011', title: 'Подготовка артефактов для Показа 1', role: 'lead', sprint: 1, priority: 'high', dependencies: ['T003', 'T007'], estimated: '6ч' },

  // Sprint 2 (Weeks 4-6)
  { id: 'T012', title: 'Модуль DataGenerator с базовым API', role: 'backend', sprint: 2, priority: 'high', dependencies: ['T003'], estimated: '12ч' },
  { id: 'T013', title: 'UsersTemplate: генерация user_id, name, email, phone, city', role: 'backend', sprint: 2, priority: 'high', dependencies: ['T012'], estimated: '8ч' },
  { id: 'T014', title: 'OrdersTemplate: генерация с FK на users', role: 'backend', sprint: 2, priority: 'high', dependencies: ['T013'], estimated: '8ч' },
  { id: 'T015', title: 'CSV writer с UTF-8 и delimiter options', role: 'backend', sprint: 2, priority: 'high', estimated: '6ч' },
  { id: 'T016', title: 'Модуль Anonymizer: базовые классы', role: 'backend', sprint: 2, priority: 'high', estimated: '8ч' },
  { id: 'T017', title: 'Реализация masking (email, phone)', role: 'backend', sprint: 2, priority: 'high', dependencies: ['T016'], estimated: '10ч' },
  { id: 'T018', title: 'Реализация redaction', role: 'backend', sprint: 2, priority: 'high', dependencies: ['T016'], estimated: '4ч' },
  { id: 'T019', title: 'CSV reader с валидацией', role: 'backend', sprint: 2, priority: 'high', estimated: '6ч' },
  { id: 'T020', title: 'FastAPI skeleton: основные роуты', role: 'web', sprint: 2, priority: 'high', dependencies: ['T008'], estimated: '8ч' },
  { id: 'T021', title: 'Endpoint /generate с Pydantic schemas', role: 'web', sprint: 2, priority: 'high', dependencies: ['T012', 'T020'], estimated: '8ч' },
  { id: 'T022', title: 'Endpoint /anonymize базовый', role: 'web', sprint: 2, priority: 'high', dependencies: ['T016', 'T020'], estimated: '8ч' },
  { id: 'T023', title: 'HTML формы для тестирования', role: 'web', sprint: 2, priority: 'medium', dependencies: ['T021'], estimated: '6ч' },
  { id: 'T024', title: 'Unit-тесты для DataGenerator', role: 'qa', sprint: 2, priority: 'high', dependencies: ['T012'], estimated: '6ч' },
  { id: 'T025', title: 'Unit-тесты для Anonymizer', role: 'qa', sprint: 2, priority: 'high', dependencies: ['T016'], estimated: '6ч' },
  { id: 'T026', title: 'E2E тест: generate → download', role: 'qa', sprint: 2, priority: 'high', dependencies: ['T021'], estimated: '4ч' },

  // Sprint 3 (Weeks 7-9)
  { id: 'T027', title: 'Seed support для воспроизводимости', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T012'], estimated: '4ч' },
  { id: 'T028', title: 'Реализация pseudonymization (hashing с salt)', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T016'], estimated: '12ч' },
  { id: 'T029', title: 'Drop column метод', role: 'backend', sprint: 3, priority: 'medium', dependencies: ['T016'], estimated: '4ч' },
  { id: 'T030', title: 'Модуль RuleSet: domain/rules.py', role: 'backend', sprint: 3, priority: 'high', estimated: '10ч' },
  { id: 'T031', title: 'Pipeline: default keep + статус kept (no rule provided)', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T030'], estimated: '8ч' },
  { id: 'T032', title: 'Report.json (обязательный): методы по колонкам, changed_count, warnings/errors', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T031'], estimated: '8ч' },
  { id: 'T033', title: 'Веб-страница Generate: полная форма', role: 'web', sprint: 3, priority: 'high', dependencies: ['T021'], estimated: '10ч' },
  { id: 'T034', title: 'Веб-страница Anonymize: column-wise rules', role: 'web', sprint: 3, priority: 'high', dependencies: ['T030'], estimated: '12ч' },
  { id: 'T035', title: 'Preview компонент (первые N строк)', role: 'web', sprint: 3, priority: 'low', estimated: '6ч' },
  { id: 'T036', title: 'Тесты для RuleSet engine', role: 'qa', sprint: 3, priority: 'high', dependencies: ['T030'], estimated: '8ч' },
  { id: 'T037', title: 'Edge case тесты (несуществующие колонки)', role: 'qa', sprint: 3, priority: 'high', dependencies: ['T031'], estimated: '6ч' },

  // Sprint 4 (Weeks 10-12)
  { id: 'T038', title: 'CSV robustness: delimiter detection', role: 'backend', sprint: 4, priority: 'high', estimated: '8ч' },
  { id: 'T039', title: 'UTF-8 BOM для Excel compatibility', role: 'backend', sprint: 4, priority: 'medium', estimated: '4ч' },
  { id: 'T040', title: 'Preset I/O: presets-first UX (загрузка/сохранение preset.json)', role: 'backend', sprint: 4, priority: 'high', dependencies: ['T030'], estimated: '8ч' },
  { id: 'T041', title: 'Человеческие error messages + пустой файл/отсутствующие колонки', role: 'backend', sprint: 4, priority: 'high', estimated: '8ч' },
  { id: 'T059', title: 'Лимит размера CSV (10-20MB) + понятная ошибка при превышении', role: 'backend', sprint: 4, priority: 'high', estimated: '4ч' },
  { id: 'T042', title: 'Logging: простая история запусков', role: 'backend', sprint: 4, priority: 'low', estimated: '4ч' },
  { id: 'T043', title: 'UI: preset upload/download', role: 'web', sprint: 4, priority: 'medium', dependencies: ['T040'], estimated: '8ч' },
  { id: 'T044', title: 'UI: улучшенные error messages', role: 'web', sprint: 4, priority: 'high', dependencies: ['T041'], estimated: '6ч' },
  { id: 'T045', title: 'UI: progress indicators', role: 'web', sprint: 4, priority: 'low', estimated: '6ч' },
  { id: 'T046', title: 'OpenAPI/Swagger documentation', role: 'web', sprint: 4, priority: 'medium', estimated: '4ч' },
  { id: 'T047', title: 'CSV format validation tests', role: 'qa', sprint: 4, priority: 'high', dependencies: ['T038'], estimated: '8ч' },
  { id: 'T048', title: 'User acceptance testing', role: 'qa', sprint: 4, priority: 'high', estimated: '10ч' },

  // Sprint 5 (Weeks 13-14)
  { id: 'T049', title: 'Bug triage и fixes', role: 'lead', sprint: 5, priority: 'high', estimated: '12ч' },
  { id: 'T050', title: 'Code refactoring и cleanup', role: 'backend', sprint: 5, priority: 'high', estimated: '10ч' },
  { id: 'T051', title: 'Performance optimization (100K rows)', role: 'backend', sprint: 5, priority: 'medium', estimated: '8ч' },
  { id: 'T052', title: 'UI polish и responsive fixes', role: 'web', sprint: 5, priority: 'medium', estimated: '8ч' },
  { id: 'T053', title: 'Deploy на Render/Fly.io', role: 'web', sprint: 5, priority: 'medium', estimated: '6ч' },
  { id: 'T054', title: 'Full test coverage report', role: 'qa', sprint: 5, priority: 'high', estimated: '8ч' },
  { id: 'T055', title: 'Load testing', role: 'qa', sprint: 5, priority: 'medium', estimated: '6ч' },
  { id: 'T056', title: 'Финальный README', role: 'qa', sprint: 5, priority: 'high', estimated: '8ч' },
  { id: 'T057', title: 'Презентация (10-15 слайдов)', role: 'lead', sprint: 5, priority: 'high', estimated: '10ч' },
  { id: 'T058', title: 'Demo сценарий и репетиция', role: 'lead', sprint: 5, priority: 'high', estimated: '6ч' }
];

export function TaskBoard() {
  const roles = [
    { id: 'lead', name: 'Team Lead/PM', icon: <Briefcase className="w-5 h-5" />, color: 'blue' },
    { id: 'backend', name: 'Core Backend', icon: <Users className="w-5 h-5" />, color: 'emerald' },
    { id: 'web', name: 'Web/UX', icon: <Palette className="w-5 h-5" />, color: 'purple' },
    { id: 'qa', name: 'QA/Doc/ML', icon: <CheckSquare className="w-5 h-5" />, color: 'amber' }
  ];

  const [selectedSprint, setSelectedSprint] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const filteredTasks = tasks.filter(
    (task) => 
      task.sprint === selectedSprint &&
      (selectedRole === null || task.role === selectedRole)
  );

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const roleFilterClasses: Record<RoleId, { active: string; inactive: string }> = {
    lead: {
      active: 'bg-blue-600 text-white',
      inactive: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    },
    backend: {
      active: 'bg-emerald-600 text-white',
      inactive: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
    },
    web: {
      active: 'bg-purple-600 text-white',
      inactive: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    },
    qa: {
      active: 'bg-amber-600 text-white',
      inactive: 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    }
  };

  const roleStatClasses: Record<RoleId, { container: string; title: string; subtitle: string }> = {
    lead: {
      container: 'bg-blue-50 border-blue-200',
      title: 'text-blue-900',
      subtitle: 'text-blue-700'
    },
    backend: {
      container: 'bg-emerald-50 border-emerald-200',
      title: 'text-emerald-900',
      subtitle: 'text-emerald-700'
    },
    web: {
      container: 'bg-purple-50 border-purple-200',
      title: 'text-purple-900',
      subtitle: 'text-purple-700'
    },
    qa: {
      container: 'bg-amber-50 border-amber-200',
      title: 'text-amber-900',
      subtitle: 'text-amber-700'
    }
  };

  const roleTagClasses: Record<RoleId, string> = {
    lead: 'bg-blue-100 text-blue-800',
    backend: 'bg-emerald-100 text-emerald-800',
    web: 'bg-purple-100 text-purple-800',
    qa: 'bg-amber-100 text-amber-800'
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sprint Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Фильтр по спринту
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((sprint) => (
                <button
                  key={sprint}
                  onClick={() => setSelectedSprint(sprint)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSprint === sprint
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Спринт {sprint}
                </button>
              ))}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Фильтр по роли
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedRole(null)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedRole === null
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Все
              </button>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedRole === role.id
                      ? roleFilterClasses[role.id as RoleId].active
                      : roleFilterClasses[role.id as RoleId].inactive
                  }`}
                >
                  {role.icon}
                  {role.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roles.map((role) => {
          const roleTasksCount = tasks.filter(t => t.role === role.id && t.sprint === selectedSprint).length;
          const totalEstimate = tasks
            .filter(t => t.role === role.id && t.sprint === selectedSprint)
            .reduce((sum, t) => sum + parseInt(t.estimated), 0);
          
          return (
            <div
              key={role.id}
              className={`rounded-lg p-4 border ${roleStatClasses[role.id as RoleId].container}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {role.icon}
                <div className={`font-semibold text-sm ${roleStatClasses[role.id as RoleId].title}`}>{role.name}</div>
              </div>
              <div className={`text-2xl font-bold ${roleStatClasses[role.id as RoleId].title}`}>{roleTasksCount}</div>
              <div className={`text-xs ${roleStatClasses[role.id as RoleId].subtitle}`}>{totalEstimate}ч в спринте {selectedSprint}</div>
            </div>
          );
        })}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <p className="text-slate-500">Нет задач для выбранных фильтров</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {task.id}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' && '🔴 Высокий'}
                      {task.priority === 'medium' && '🟡 Средний'}
                      {task.priority === 'low' && '🟢 Низкий'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${roleTagClasses[task.role]}`}>
                      {roles.find(r => r.id === task.role)?.name}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{task.title}</h4>
                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-amber-600">⚠️ Зависимости:</span>
                      <span className="font-mono">{task.dependencies.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-900">{task.estimated}</div>
                  <div className="text-xs text-slate-500">оценка</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-300 mb-1">Всего задач в Спринте {selectedSprint}</div>
            <div className="text-3xl font-bold">{filteredTasks.length}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-300 mb-1">Общая оценка</div>
            <div className="text-3xl font-bold">
              {filteredTasks.reduce((sum, t) => sum + parseInt(t.estimated), 0)}ч
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
