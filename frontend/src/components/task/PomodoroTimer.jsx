import { useEffect, useState } from 'react';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';

export default function PomodoroTimer({ tasks = [], onSessionComplete }) {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const selected = tasks.find((task) => (task.id || task._id) === selectedId) || tasks.find((task) => !task.completed);
  useEffect(() => { if (!running) return undefined; const timer = window.setInterval(() => setSecondsLeft((current) => current > 0 ? current - 1 : 0), 1000); return () => window.clearInterval(timer); }, [running]);
  useEffect(() => { if (secondsLeft !== 0) return; setRunning(false); setSecondsLeft(25 * 60); if (selected) onSessionComplete?.(selected); }, [secondsLeft, selected, onSessionComplete]);
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');
  const progress = ((25 * 60 - secondsLeft) / (25 * 60)) * 100;
  return <section className="tasks-focus-card"><header><span><Timer size={19} /></span><div><h2>Bộ đếm tập trung</h2><p>Pomodoro 25 phút</p></div></header><div className="tasks-focus-tabs"><button className="active">Tập trung</button><button>Nghỉ ngắn</button><button>Nghỉ dài</button></div><div className="tasks-clock" style={{ '--focus-progress': `${progress * 3.6}deg` }}><div><strong>{minutes}:{seconds}</strong><span>{running ? 'Đang tập trung sâu' : 'Sẵn sàng bắt đầu'}</span></div></div><label className="tasks-linked-task">Công việc đang tập trung<select value={selected?.id || selected?._id || ''} onChange={(event) => setSelectedId(event.target.value)}><option value="">Chọn công việc</option>{tasks.filter((task) => !task.completed).map((task) => <option value={task.id || task._id} key={task.id || task._id}>{task.title}</option>)}</select></label><div className="tasks-focus-actions"><button onClick={() => setRunning(!running)}>{running ? <Pause size={18} /> : <Play size={18} />}{running ? 'Tạm dừng' : 'Bắt đầu 25p'}</button><button onClick={() => { setRunning(false); setSecondsLeft(25 * 60); }} aria-label="Đặt lại"><RotateCcw size={18} /></button></div></section>;
}
