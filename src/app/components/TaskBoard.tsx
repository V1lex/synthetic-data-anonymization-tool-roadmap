import { Users, Briefcase, Palette, CheckSquare } from 'lucide-react';
import { DraggableSegmented } from './ui/DraggableSegmented';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

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
  { id: 'T002', title: 'Создание доски задач (Сфера.задачи)', role: 'lead', sprint: 1, priority: 'high', estimated: '2ч' },
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
  { id: 'T027', title: 'Координация спринта 2: PR-ревью и подготовка Показа 2', role: 'lead', sprint: 2, priority: 'high', estimated: '6ч' },

  // Sprint 3 (Weeks 7-9)
  { id: 'T028', title: 'Seed support для воспроизводимости', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T012'], estimated: '4ч' },
  { id: 'T029', title: 'Реализация pseudonymization (hashing с salt)', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T016'], estimated: '12ч' },
  { id: 'T030', title: 'Drop column метод', role: 'backend', sprint: 3, priority: 'medium', dependencies: ['T016'], estimated: '4ч' },
  { id: 'T031', title: 'Модуль RuleSet: domain/rules.py', role: 'backend', sprint: 3, priority: 'high', estimated: '10ч' },
  { id: 'T032', title: 'Pipeline: default keep + статус kept (no rule provided)', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T031'], estimated: '8ч' },
  { id: 'T033', title: 'Report.json (обязательный): методы по колонкам, changed_count, warnings/errors', role: 'backend', sprint: 3, priority: 'high', dependencies: ['T032'], estimated: '8ч' },
  { id: 'T034', title: 'Веб-страница Generate: полная форма', role: 'web', sprint: 3, priority: 'high', dependencies: ['T021'], estimated: '10ч' },
  { id: 'T035', title: 'Веб-страница Anonymize: column-wise rules', role: 'web', sprint: 3, priority: 'high', dependencies: ['T031'], estimated: '12ч' },
  { id: 'T036', title: 'Preview компонент (первые N строк)', role: 'web', sprint: 3, priority: 'low', estimated: '6ч' },
  { id: 'T037', title: 'Тесты для RuleSet engine', role: 'qa', sprint: 3, priority: 'high', dependencies: ['T031'], estimated: '8ч' },
  { id: 'T038', title: 'Edge case тесты (несуществующие колонки)', role: 'qa', sprint: 3, priority: 'high', dependencies: ['T032'], estimated: '6ч' },
  { id: 'T039', title: 'Координация спринта 3: архитектурное ревью и подготовка Показа 3', role: 'lead', sprint: 3, priority: 'high', estimated: '6ч' },

  // Sprint 4 (Weeks 10-12)
  { id: 'T040', title: 'CSV robustness: delimiter detection', role: 'backend', sprint: 4, priority: 'high', estimated: '8ч' },
  { id: 'T041', title: 'UTF-8 BOM для Excel compatibility', role: 'backend', sprint: 4, priority: 'medium', estimated: '4ч' },
  { id: 'T042', title: 'Preset I/O: presets-first UX (загрузка/сохранение preset.json)', role: 'backend', sprint: 4, priority: 'high', dependencies: ['T031'], estimated: '8ч' },
  { id: 'T043', title: 'Человеческие error messages + пустой файл/отсутствующие колонки', role: 'backend', sprint: 4, priority: 'high', estimated: '8ч' },
  { id: 'T044', title: 'Лимит размера CSV (10-20MB) + понятная ошибка при превышении', role: 'backend', sprint: 4, priority: 'high', estimated: '4ч' },
  { id: 'T045', title: 'Logging: простая история запусков', role: 'backend', sprint: 4, priority: 'low', estimated: '4ч' },
  { id: 'T046', title: 'UI: preset upload/download', role: 'web', sprint: 4, priority: 'medium', dependencies: ['T042'], estimated: '8ч' },
  { id: 'T047', title: 'UI: улучшенные error messages', role: 'web', sprint: 4, priority: 'high', dependencies: ['T043'], estimated: '6ч' },
  { id: 'T048', title: 'UI: progress indicators', role: 'web', sprint: 4, priority: 'low', estimated: '6ч' },
  { id: 'T049', title: 'OpenAPI/Swagger documentation', role: 'web', sprint: 4, priority: 'medium', estimated: '4ч' },
  { id: 'T050', title: 'CSV format validation tests', role: 'qa', sprint: 4, priority: 'high', dependencies: ['T040'], estimated: '8ч' },
  { id: 'T051', title: 'User acceptance testing', role: 'qa', sprint: 4, priority: 'high', estimated: '10ч' },
  { id: 'T052', title: 'Координация спринта 4: приоритизация фич и подготовка Показа 4', role: 'lead', sprint: 4, priority: 'high', estimated: '6ч' },

  // Sprint 5 (Weeks 13-14)
  { id: 'T053', title: 'Bug triage и fixes', role: 'lead', sprint: 5, priority: 'high', estimated: '12ч' },
  { id: 'T054', title: 'Code refactoring и cleanup', role: 'backend', sprint: 5, priority: 'high', estimated: '10ч' },
  { id: 'T055', title: 'Performance optimization (100K rows)', role: 'backend', sprint: 5, priority: 'medium', estimated: '8ч' },
  { id: 'T056', title: 'UI polish и responsive fixes', role: 'web', sprint: 5, priority: 'medium', estimated: '8ч' },
  { id: 'T057', title: 'Deploy на публичный хостинг', role: 'web', sprint: 5, priority: 'medium', estimated: '6ч' },
  { id: 'T058', title: 'Full test coverage report', role: 'qa', sprint: 5, priority: 'high', estimated: '8ч' },
  { id: 'T059', title: 'Load testing', role: 'qa', sprint: 5, priority: 'medium', estimated: '6ч' },
  { id: 'T060', title: 'Финальный README', role: 'qa', sprint: 5, priority: 'high', estimated: '8ч' },
  { id: 'T061', title: 'Презентация (10-15 слайдов)', role: 'lead', sprint: 5, priority: 'high', estimated: '10ч' },
  { id: 'T062', title: 'Demo сценарий и репетиция', role: 'lead', sprint: 5, priority: 'high', estimated: '6ч' }
];

export function TaskBoard() {
  const roles = [
    { id: 'lead', name: 'Team Lead/PM', icon: <Briefcase className="w-5 h-5" />, color: 'blue' },
    { id: 'backend', name: 'Core Backend', icon: <Users className="w-5 h-5" />, color: 'emerald' },
    { id: 'web', name: 'API/Web', icon: <Palette className="w-5 h-5" />, color: 'purple' },
    { id: 'qa', name: 'QA/Doc/ML', icon: <CheckSquare className="w-5 h-5" />, color: 'amber' }
  ];

  const [selectedSprint, setSelectedSprint] = useLocalStorageState<number>('taskboard.selectedSprint', 1);
  const [selectedRole, setSelectedRole] = useLocalStorageState<RoleId | 'all'>('taskboard.selectedRole', 'all');

  const sprintOptions: Array<{ id: number; label: string }> = [1, 2, 3, 4, 5].map((sprint) => ({
    id: sprint,
    label: `Спринт ${sprint}`
  }));

  const roleOptions: Array<{ id: RoleId | 'all'; label: string }> = [
    { id: 'all', label: 'Все' },
    { id: 'lead', label: 'Lead/PM' },
    { id: 'backend', label: 'Backend' },
    { id: 'web', label: 'API/Web' },
    { id: 'qa', label: 'QA/Doc/ML' }
  ];

  const filteredTasks = tasks.filter(
    (task) => 
      task.sprint === selectedSprint &&
      (selectedRole === 'all' || task.role === selectedRole)
  );

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
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
      container: 'bg-purple-100 border-purple-300',
      title: 'text-purple-900',
      subtitle: 'text-purple-800'
    },
    qa: {
      container: 'bg-amber-50 border-amber-200',
      title: 'text-amber-900',
      subtitle: 'text-amber-700'
    }
  };

  const roleTagClasses: Record<RoleId, string> = {
    lead: 'bg-blue-100 text-blue-800 border border-blue-300',
    backend: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    web: 'bg-purple-100 text-purple-800 border border-purple-300',
    qa: 'bg-amber-100 text-amber-800 border border-amber-300'
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Фильтр по спринту
            </label>
            <DraggableSegmented
              value={selectedSprint}
              options={sprintOptions}
              onChange={setSelectedSprint}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Фильтр по роли
            </label>
            <DraggableSegmented
              value={selectedRole}
              options={roleOptions}
              onChange={setSelectedRole}
              className="w-full"
            />
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
                      {task.priority === 'high' && 'Высокий'}
                      {task.priority === 'medium' && 'Средний'}
                      {task.priority === 'low' && 'Низкий'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${roleTagClasses[task.role]}`}>
                      {roles.find(r => r.id === task.role)?.name}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-900 mb-2">{task.title}</h4>
                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-amber-600">Зависимости:</span>
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
