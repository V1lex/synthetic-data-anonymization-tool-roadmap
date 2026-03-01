import { useRef, useState, type PointerEvent } from 'react';

type SegmentId = string | number;

interface SegmentOption<T extends SegmentId> {
  id: T;
  label: string;
}

interface DraggableSegmentedProps<T extends SegmentId> {
  value: T;
  options: Array<SegmentOption<T>>;
  onChange: (value: T) => void;
  className?: string;
  variant?: 'light' | 'dark' | 'main';
}

export function DraggableSegmented<T extends SegmentId>({
  value,
  options,
  onChange,
  className = '',
  variant = 'light'
}: DraggableSegmentedProps<T>) {
  const navRef = useRef<HTMLElement | null>(null);
  const dragMetaRef = useRef<{ pointerId: number; grabOffset: number; startX: number; moved: boolean } | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const activeIndex = Math.max(0, options.findIndex((option) => option.id === value));
  const visualIndex = dragIndex ?? activeIndex;
  const variantStyles = {
    light: {
      nav: 'bg-slate-100 border border-slate-200',
      thumb: 'bg-white border border-slate-200 shadow-sm',
      active: 'text-slate-900',
      inactive: 'text-slate-600 hover:text-slate-900'
    },
    dark: {
      nav: 'bg-slate-300 border border-slate-400',
      thumb: 'bg-white border border-slate-200 shadow-sm',
      active: 'text-slate-900',
      inactive: 'text-slate-700 hover:text-slate-900'
    },
    main: {
      nav: 'bg-slate-200 border border-slate-300 shadow',
      thumb: 'bg-white border border-slate-100 shadow',
      active: 'text-slate-900',
      inactive: 'text-slate-700 hover:text-slate-900'
    }
  } as const;

  const clamp = (current: number, min: number, max: number) => Math.min(max, Math.max(min, current));

  const getMetrics = () => {
    const nav = navRef.current;
    if (!nav) return null;

    const rect = nav.getBoundingClientRect();
    const padding = 4;
    const segmentWidth = (rect.width - padding * 2) / options.length;

    return { rect, padding, segmentWidth };
  };

  const startDrag = (event: PointerEvent<HTMLElement>) => {
    const metrics = getMetrics();
    if (!metrics) return;

    const pointerX = event.clientX - metrics.rect.left;
    const activeLeft = metrics.padding + activeIndex * metrics.segmentWidth;
    const activeRight = activeLeft + metrics.segmentWidth;
    const startedOnThumb = pointerX >= activeLeft && pointerX <= activeRight;

    dragMetaRef.current = {
      pointerId: event.pointerId,
      grabOffset: startedOnThumb ? pointerX - activeLeft : metrics.segmentWidth / 2,
      startX: event.clientX,
      moved: false
    };
    setDragIndex(activeIndex);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const moveDrag = (event: PointerEvent<HTMLElement>) => {
    const metrics = getMetrics();
    const dragMeta = dragMetaRef.current;
    if (!metrics || !dragMeta || dragMeta.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - dragMeta.startX) > 4) {
      dragMeta.moved = true;
    }

    const minLeft = metrics.padding;
    const maxLeft = metrics.padding + metrics.segmentWidth * (options.length - 1);
    const nextLeft = clamp(
      event.clientX - metrics.rect.left - dragMeta.grabOffset,
      minLeft,
      maxLeft
    );

    setDragIndex((nextLeft - metrics.padding) / metrics.segmentWidth);
  };

  const endDrag = (event: PointerEvent<HTMLElement>) => {
    const metrics = getMetrics();
    const dragMeta = dragMetaRef.current;
    if (!dragMeta || dragMeta.pointerId !== event.pointerId || !metrics) return;

    if (dragMeta.moved) {
      const snappedIndex = clamp(Math.round(dragIndex ?? activeIndex), 0, options.length - 1);
      onChange(options[snappedIndex].id);
    } else {
      const pointerX = event.clientX - metrics.rect.left;
      const rawIndex = Math.floor((pointerX - metrics.padding) / metrics.segmentWidth);
      const tappedIndex = clamp(rawIndex, 0, options.length - 1);
      onChange(options[tappedIndex].id);
    }

    setDragIndex(null);
    dragMetaRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <nav
      ref={navRef}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative grid rounded-2xl p-1 select-none touch-none ${variantStyles[variant].nav} ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        className={`pointer-events-none absolute bottom-1 top-1 z-10 rounded-xl ${variantStyles[variant].thumb}`}
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          left: `calc(0.25rem + ${visualIndex} * ((100% - 0.5rem) / ${options.length}))`,
          transition: dragIndex === null ? 'left 240ms cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
        }}
      />

      {options.map((option) => (
        <div
          key={String(option.id)}
          className={`pointer-events-none relative z-20 rounded-xl px-2 py-2.5 text-center text-xs font-medium leading-tight transition-colors md:text-sm ${
            value === option.id ? variantStyles[variant].active : variantStyles[variant].inactive
          }`}
        >
          {option.label}
        </div>
      ))}
    </nav>
  );
}
