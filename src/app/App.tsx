import { RoadmapView } from './components/RoadmapView';
import { TaskBoard } from './components/TaskBoard';
import { MilestoneDetails } from './components/MilestoneDetails';
import { DemoScenarios } from './components/DemoScenarios';
import { PostMvpOptional } from './components/PostMvpOptional';
import { DraggableSegmented } from './components/ui/DraggableSegmented';
import { RotatingInTouch } from './components/RotatingInTouch';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { Download } from 'lucide-react';

declare global {
  interface Window {
    exportRoadmapAllPdf?: () => Promise<void> | void;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useLocalStorageState<'roadmap' | 'tasks' | 'milestones' | 'demos' | 'postmvp'>(
    'roadmap.activeTab',
    'roadmap'
  );
  const tabs: Array<{ id: 'roadmap' | 'tasks' | 'milestones' | 'demos' | 'postmvp'; label: string }> = [
    { id: 'roadmap', label: 'Roadmap по неделям' },
    { id: 'tasks', label: 'Задачи по ролям' },
    { id: 'milestones', label: 'Milestone артефакты' },
    { id: 'demos', label: 'Demo flow' },
    { id: 'postmvp', label: 'Post-MVP / Optional' }
  ];
  const exportAllRoadmap = () => {
    if (typeof window.exportRoadmapAllPdf === 'function') {
      void window.exportRoadmapAllPdf();
      return;
    }
    setActiveTab('roadmap');
    setTimeout(() => {
      if (typeof window.exportRoadmapAllPdf === 'function') {
        void window.exportRoadmapAllPdf();
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-slate-900 mb-2">
                Synthetic Data Anonymization Tool (MVP)
              </h1>
              <p className="text-slate-600">14-недельный roadmap</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={exportAllRoadmap}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md active:translate-y-0 active:shadow-sm"
                title="Скачать roadmap за все 14 недель в PDF"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
              <RotatingInTouch />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <DraggableSegmented
              value={activeTab}
              options={tabs}
              onChange={setActiveTab}
              variant="main"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={activeTab === 'roadmap' ? 'block' : 'hidden'}>
            <RoadmapView />
          </div>
          {activeTab === 'tasks' && <TaskBoard />}
          {activeTab === 'milestones' && <MilestoneDetails />}
          {activeTab === 'demos' && <DemoScenarios />}
          {activeTab === 'postmvp' && <PostMvpOptional />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            Project: Data anonymization and synthesis tool 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
