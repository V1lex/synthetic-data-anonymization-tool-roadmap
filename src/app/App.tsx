import { useState } from 'react';
import { RoadmapView } from './components/RoadmapView';
import { TaskBoard } from './components/TaskBoard';
import { MilestoneDetails } from './components/MilestoneDetails';
import { DemoScenarios } from './components/DemoScenarios';
import { PostMvpOptional } from './components/PostMvpOptional';

export default function App() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'tasks' | 'milestones' | 'demos' | 'postmvp'>('roadmap');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-slate-900 mb-2">
                Synthetic Data Anonymization Tool (MVP)
              </h1>
              <p className="text-slate-600">14-недельный roadmap</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                MVP Scope
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'roadmap', label: 'Roadmap по неделям' },
              { id: 'tasks', label: 'Задачи по ролям' },
              { id: 'milestones', label: 'Milestone артефакты' },
              { id: 'demos', label: 'Demo flow' },
              { id: 'postmvp', label: 'Post-MVP / Optional' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'roadmap' && <RoadmapView />}
        {activeTab === 'tasks' && <TaskBoard />}
        {activeTab === 'milestones' && <MilestoneDetails />}
        {activeTab === 'demos' && <DemoScenarios />}
        {activeTab === 'postmvp' && <PostMvpOptional />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            Проект: Инструмент для синтетической генерации и анонимизации табличных данных • Стек: Python + FastAPI + React
          </p>
        </div>
      </footer>
    </div>
  );
}
