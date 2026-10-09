import React from 'react';

export default function PageHeader({ badge, title, description, actions }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2 border-b border-surface-container">
      <div className="flex flex-col gap-2 max-w-2xl">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-md text-xs font-semibold w-fit">
            {badge.icon && <span className="material-symbols-outlined text-[16px]">{badge.icon}</span>}
            <span>{badge.text}</span>
          </div>
        )}
        <h1 className="font-display-lg text-display-lg tracking-tight text-on-surface font-extrabold">
          {title}
        </h1>
        {description && (
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start md:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}
