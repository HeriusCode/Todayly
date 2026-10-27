import { useEffect, useMemo, useState } from 'react';
import { foodService } from '../../services/foodService';
import { drinkService } from '../../services/drinkService';
import { getDevicePosition, placeService } from '../../services/placeService';
import { ArrowRight, Check, ChevronRight, CircleHelp, Coins, Dices, Gift, Hash, History, MapPin, PartyPopper, Plus, RotateCcw, Shuffle, Sparkles, Ticket, Trash2, Utensils, WandSparkles } from 'lucide-react';

const palette = ['#4f46e5', '#fd761a', '#00a875', '#9c5cff', '#ee4d7c', '#f5b82e', '#2f80ed', '#e35f45'];
const fallbacks = {
  food: ['Mì Quảng', 'Bún chả cá', 'Cơm gà', 'Bánh xèo', 'Bún bò', 'Cơm niêu', 'Bánh mì', 'Hải sản'],
  drink: ['Cà phê muối', 'Trà đào', 'Matcha latte', 'Nước ép xanh', 'Trà sữa', 'Cold brew', 'Sinh tố', 'Nước dừa'],
  place: ['Đi biển', 'Quán cafe', 'Công viên', 'Rạp phim', 'Bảo tàng', 'Đi dạo', 'Trung tâm mua sắm', 'Ở nhà chill'],
  activity: ['Đọc sách', 'Chạy bộ', 'Xem phim', 'Nấu ăn', 'Đi cafe', 'Chụp ảnh', 'Nghe nhạc', 'Gọi bạn thân'],
};
const modes = [
  { id: 'food', label: 'Ăn gì', icon: '🍜' }, { id: 'drink', label: 'Uống gì', icon: '🧋' },
  { id: 'place', label: 'Đi đâu', icon: '📍' }, { id: 'activity', label: 'Làm gì', icon: '✨' },
];
const fortunes = ['Một tin vui nhỏ đang tìm đến bạn.', 'Hôm nay rất hợp để bắt đầu điều mới.', 'Một cuộc gặp bất ngờ sẽ làm bạn vui.', 'May mắn đến khi bạn chủ động bước ra ngoài.', 'Hãy tin vào lựa chọn đầu tiên của mình.', 'Một lời khen chân thành đang chờ bạn.'];

function QuickRandomCard({ icon: Icon, title, text, tone, children }) {
  return <article className={`lucky-quick-card ${tone}`}><div className="lucky-quick-icon"><Icon size={22} /></div><div className="lucky-quick-copy"><h3>{title}</h3><p>{text}</p></div>{children}</article>;
}

export default function Wheel() {
  const [mode, setMode] = useState('food'); const [data, setData] = useState({ food: [], drink: [], place: [] });
  const [rotation, setRotation] = useState(0); const [spinning, setSpinning] = useState(false); const [winner, setWinner] = useState('');
  const [history, setHistory] = useState([]); const [dice, setDice] = useState(6); const [coin, setCoin] = useState('Ngửa');
  const [number, setNumber] = useState(7); const [maxNumber, setMaxNumber] = useState(100); const [fortune, setFortune] = useState(fortunes[0]);
  const [pickerText, setPickerText] = useState('Đi cafe, Đi biển, Xem phim, Ở nhà chill'); const [pickerResult, setPickerResult] = useState('');

  useEffect(() => {
    let active = true;
    getDevicePosition(true).then((position) => {
      const { latitude: lat, longitude: lon } = position.coords;
      return Promise.allSettled([
        foodService.getNearby({ lat, lon, radius: 5000 }),
        drinkService.getNearby({ lat, lon, radius: 5000 }),
        placeService.getNearby({ lat, lon, radius: 5000 }),
      ]);
    }).then(([foods, drinks, places]) => {
      if (!active) return;
      setData({
        food: foods.status === 'fulfilled' ? foods.value : [],
        drink: drinks.status === 'fulfilled' ? drinks.value : [],
        place: places.status === 'fulfilled' ? places.value : [],
      });
    }).catch(() => {});
    return () => { active = false; };
  }, []);

  const segments = useMemo(() => {
    const source = mode === 'activity' ? [] : data[mode];
    const names = source?.length ? source.slice(0, 8).map(item => item.name || item.storeName).filter(Boolean) : fallbacks[mode];
    return names.slice(0, 8).map((name, index) => ({ label: name.length > 15 ? `${name.slice(0, 14)}…` : name, full: name, color: palette[index] }));
  }, [data, mode]);
  const angle = 360 / segments.length;

  const addHistory = (type, result) => setHistory(current => [{ type, result, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }, ...current].slice(0, 6));
  const spin = () => {
    if (spinning || !segments.length) return;
    setSpinning(true); setWinner('');
    const index = Math.floor(Math.random() * segments.length); const extra = 5 + Math.floor(Math.random() * 3);
    setRotation(current => current + extra * 360 + (360 - index * angle - angle / 2));
    window.setTimeout(() => { setSpinning(false); setWinner(segments[index].full); addHistory('Vòng quay', segments[index].full); }, 3400);
  };
  const rollDice = () => { const value = 1 + Math.floor(Math.random() * 6); setDice(value); addHistory('Xúc xắc', String(value)); };
  const flipCoin = () => { const value = Math.random() > .5 ? 'Ngửa' : 'Sấp'; setCoin(value); addHistory('Đồng xu', value); };
  const randomNumber = () => { const value = 1 + Math.floor(Math.random() * Math.max(1, maxNumber)); setNumber(value); addHistory('Số may mắn', String(value)); };
  const drawFortune = () => { const value = fortunes[Math.floor(Math.random() * fortunes.length)]; setFortune(value); addHistory('Thẻ may mắn', value); };
  const pickCustom = () => { const list = pickerText.split(/[,\n]/).map(item => item.trim()).filter(Boolean); if (!list.length) return; const value = list[Math.floor(Math.random() * list.length)]; setPickerResult(value); addHistory('Chọn nhanh', value); };

  return <div className="lucky-page"><div className="lucky-shell">
    <section className="lucky-hero"><div><span className="lucky-eyebrow"><Sparkles size={16} /> Góc ngẫu nhiên của Todayly</span><h1>Vòng quay may mắn <span>🎡</span></h1><p>Khi chưa biết ăn gì, đi đâu hay làm gì, hãy để một chút ngẫu nhiên giúp bạn đưa ra quyết định thật vui.</p><div className="lucky-status"><i /> Hoàn toàn ngẫu nhiên · Không lưu dữ liệu nhạy cảm</div></div><div className="lucky-hero-art"><span>?</span><i>✨</i><b>LUCKY</b></div></section>

    <section className="lucky-main-grid"><article className="lucky-wheel-card"><header><div><span><WandSparkles size={21} /></span><div><h2>Hôm nay chọn gì?</h2><p>Chọn chủ đề rồi nhấn vào tâm vòng quay</p></div></div><button type="button" onClick={() => { setRotation(0); setWinner(''); }}><RotateCcw size={16} /> Đặt lại</button></header><div className="lucky-mode-list">{modes.map(item => <button type="button" key={item.id} className={mode === item.id ? 'active' : ''} onClick={() => { if (!spinning) { setMode(item.id); setWinner(''); } }}><span>{item.icon}</span>{item.label}</button>)}</div>
      <div className="lucky-wheel-zone"><span className="lucky-pointer" /><div className="lucky-wheel" style={{ transform: `rotate(${rotation}deg)` }}><svg viewBox="-100 -100 200 200">{segments.map((segment, index) => { const start = index * angle * Math.PI / 180; const end = (index + 1) * angle * Math.PI / 180; const x1 = 100 * Math.cos(start), y1 = 100 * Math.sin(start), x2 = 100 * Math.cos(end), y2 = 100 * Math.sin(end); const mid = (index + .5) * angle * Math.PI / 180; const tx = 62 * Math.cos(mid), ty = 62 * Math.sin(mid); return <g key={`${segment.full}-${index}`}><path d={`M0 0 L${x1} ${y1} A100 100 0 0 1 ${x2} ${y2} Z`} fill={segment.color} /><text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle" transform={`rotate(${(index + .5) * angle},${tx},${ty})`}>{segment.label}</text></g>; })}</svg></div><button type="button" className="lucky-spin-button" onClick={spin} disabled={spinning}>{spinning ? <><Shuffle size={22} /> Đang quay</> : <><PartyPopper size={23} /> QUAY</>}</button></div>
      <div className={`lucky-result ${winner ? 'show' : ''}`}>{winner ? <><span><Gift size={20} /></span><div><small>KẾT QUẢ DÀNH CHO BẠN</small><h3>{winner}</h3></div><button type="button" onClick={spin}>Quay lại <ArrowRight size={15} /></button></> : <p>Kết quả sẽ xuất hiện ở đây sau khi vòng quay dừng lại.</p>}</div>
    </article>

    <aside className="lucky-side"><article className="lucky-custom"><header><span><CircleHelp size={20} /></span><div><h2>Chọn nhanh theo danh sách</h2><p>Nhập lựa chọn, ngăn cách bằng dấu phẩy.</p></div></header><textarea value={pickerText} onChange={event => setPickerText(event.target.value)} /><button type="button" onClick={pickCustom}><Shuffle size={17} /> Chọn ngẫu nhiên</button>{pickerResult && <div><Check size={16} /><span>Kết quả: <b>{pickerResult}</b></span></div>}</article>
      <article className="lucky-history"><header><History size={18} /><h2>Lịch sử gần đây</h2><button type="button" onClick={() => setHistory([])} aria-label="Xóa lịch sử"><Trash2 size={15} /></button></header>{history.length ? <div>{history.map((item, index) => <p key={`${item.time}-${index}`}><span>{item.type}</span><b>{item.result}</b><small>{item.time}</small></p>)}</div> : <div className="lucky-empty">Chưa có kết quả nào. Thử vận may nhé!</div>}</article>
    </aside></section>

    <section className="lucky-tools"><header><div><span><Dices size={20} /></span><div><h2>Thêm nhiều kiểu random may mắn</h2><p>Không chỉ có vòng quay — chọn công cụ phù hợp với quyết định của bạn.</p></div></div></header><div className="lucky-tools-grid">
      <QuickRandomCard icon={Dices} title="Tung xúc xắc" text="Phù hợp chia đội hoặc chọn thứ tự 1–6." tone="violet"><div className="lucky-dice-result">{dice}</div><button type="button" onClick={rollDice}>Tung ngay</button></QuickRandomCard>
      <QuickRandomCard icon={Coins} title="Tung đồng xu" text="Khi bạn chỉ có hai lựa chọn khó nghĩ." tone="orange"><div className={`lucky-coin ${coin === 'Sấp' ? 'tails' : ''}`}><span>{coin === 'Ngửa' ? '★' : 'T'}</span></div><button type="button" onClick={flipCoin}>Tung xu</button></QuickRandomCard>
      <QuickRandomCard icon={Hash} title="Số may mắn" text="Tạo một con số bất kỳ trong giới hạn."><div className="lucky-number-row"><input type="number" min="1" max="9999" value={maxNumber} onChange={event => setMaxNumber(Number(event.target.value))} /><strong>{number}</strong></div><button type="button" onClick={randomNumber}>Tạo số</button></QuickRandomCard>
      <QuickRandomCard icon={Ticket} title="Rút thẻ may mắn" text="Nhận một lời nhắn nhỏ cho hôm nay." tone="green"><div className="lucky-fortune">“{fortune}”</div><button type="button" onClick={drawFortune}>Rút thẻ</button></QuickRandomCard>
    </div></section>

    <section className="lucky-suggestions"><header><div><Sparkles size={19} /><h2>Gợi ý thử ngay</h2></div><span>Mỗi ngày một niềm vui bất ngờ</span></header><div>{['Ai sẽ trả tiền cafe?', 'Cuối tuần đi đâu?', 'Tối nay xem phim gì?', 'Chọn món cho cả nhóm', 'Phân công việc nhà', 'Bài tập thể thao hôm nay'].map((item, index) => <button type="button" key={item} onClick={() => { setPickerText(item.includes('?') ? item.replace('?', '') : item); setPickerResult(''); }}><span>{['☕','🏕️','🎬','🍽️','🧹','🏃'][index]}</span>{item}<ChevronRight size={15} /></button>)}</div></section>
  </div></div>;
}
