import { useState } from 'react';

const ROTATING_TEXT = ' • Moscow Aviation Institute • T1 Holding • Cool Peppers •';
const MEDIA_SRC = '/media/chili-pepper-icon.jpg';

export function RotatingInTouch() {
  const [mediaError, setMediaError] = useState(false);
  const handleReload = () => window.location.reload();

  return (
    <div className="group relative h-28 w-28 sm:h-32 sm:w-32">
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-0 h-full w-full animate-spin transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-115"
        style={{ animationDuration: '13s', animationTimingFunction: 'linear' }}
      >
        <defs>
          <path id="ringTextPath" d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" />
        </defs>
        <text fill="#0f172a" fontSize="11" fontWeight="700" letterSpacing="1.1">
          <textPath href="#ringTextPath">{ROTATING_TEXT}</textPath>
        </text>
      </svg>

      <button
        type="button"
        onClick={handleReload}
        aria-label="Reload page"
        title="Reload page"
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 transition-transform duration-200 ease-out group-hover:scale-95 group-active:scale-90"
      >
        {!mediaError ? (
          <img
            src={MEDIA_SRC}
            alt="Team media"
            className="h-full w-full object-cover transition duration-200 group-hover:brightness-110"
            onError={() => setMediaError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500">
            T1
          </div>
        )}
      </button>
    </div>
  );
}
