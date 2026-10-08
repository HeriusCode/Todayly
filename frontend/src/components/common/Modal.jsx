import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <header className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl p-2 hover:bg-slate-100"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
