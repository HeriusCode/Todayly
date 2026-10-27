import { Coffee, Leaf, Sparkles } from 'lucide-react';

export default function TimeblockBar({ tasks = [] }) {
  const visible = tasks.slice(0, 7);
  return <section className="tasks-timeblock">
    <header><div><Sparkles size={19} /><h2>Dòng chảy thời gian hôm nay</h2><span>Nhịp sinh học êm dịu</span></div><div className="tasks-timeblock-legend"><span><i className="deep" />Tập trung sâu</span><span><i className="meeting" />Trao đổi</span><span><i className="break" />Khoảng nghỉ</span></div></header>
    {visible.length ? <><div className="tasks-timeblock-bar">{visible.map((task, index) => <div key={task.id || task._id} className={`${task.completed ? 'done' : ''} block-${index % 4}`} style={{ flex: Math.max(1, Number(task.pomodoroTarget) || 1) }} title={`${task.startTime || ''} ${task.title}`}><span>{index % 4 === 2 ? <Leaf size={13} /> : index % 4 === 0 ? <Coffee size={13} /> : null}{task.title}</span></div>)}</div><div className="tasks-time-ruler"><span>{visible[0]?.startTime || '08:00'}</span><span>12:00</span><span>{visible.at(-1)?.endTime || '18:00'}</span></div></> : <div className="tasks-timeblock-empty">Chưa có công việc để tạo dòng thời gian.</div>}
  </section>;
}
