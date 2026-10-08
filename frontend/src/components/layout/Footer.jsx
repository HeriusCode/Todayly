import { CalendarDays } from 'lucide-react';
const currentYear = new Date().getFullYear();

export default function Footer() {
  return <footer className="mt-10 border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 font-bold text-slate-700"><CalendarDays size={18} className="text-brand-600" />Todayly</span><span>Make Today Better • {currentYear}</span></div></footer>;
}
