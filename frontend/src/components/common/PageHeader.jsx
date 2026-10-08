export default function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 leading-7 text-slate-600">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
