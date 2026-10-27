const quadrants = [
  ['important_urgent', 'Làm ngay', 'Quan trọng · Khẩn cấp', 'red'],
  ['important_not_urgent', 'Lên lịch', 'Quan trọng · Không khẩn', 'blue'],
  ['not_important_urgent', 'Ủy quyền', 'Khẩn cấp · Ít quan trọng', 'orange'],
  ['not_important_not_urgent', 'Loại bỏ', 'Không khẩn · Ít quan trọng', 'green'],
];

export default function EisenhowerMatrix({ tasks = [], active, onSelect }) {
  return <section className="tasks-matrix"><header><div><h2>Ma trận Eisenhower</h2><p>Chọn một góc để lọc danh sách công việc</p></div><button className={!active || active === 'all' ? 'active' : ''} onClick={() => onSelect?.('all')}>Tất cả</button></header><div className="tasks-matrix-grid">{quadrants.map(([key, action, label, tone]) => { const items = tasks.filter((task) => task.matrixQuadrant === key); return <button key={key} onClick={() => onSelect?.(key)} className={`${tone} ${active === key ? 'active' : ''}`}><span>{action}<b>{items.length}</b></span><small>{label}</small>{items[0] && <p>{items[0].title}</p>}</button>; })}</div></section>;
}
