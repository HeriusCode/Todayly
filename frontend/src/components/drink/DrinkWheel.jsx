import { Droplets, Plus, Sparkles } from 'lucide-react';

const moods = [
  ['⚡', 'Cần tỉnh táo', 'Cà phê muối'],
  ['🌸', 'Muốn ngọt ngào', 'Trà sữa Oolong'],
  ['🛋️', 'Đang chill', 'Cold Brew Cam'],
];

export default function DrinkWheel({ spinning, rotation, result, onSpin, onMood, waterMl, targetMl, onAddWater }) {
  const percent = Math.min(100, Math.round((waterMl / targetMl) * 100));

  return (
    <div className="drink-side-stack">
      <article className="drink-wheel-card">
        <header><div><Sparkles size={19} /><span><strong>Vòng quay giải ngố</strong><small>Để Todayly chọn thay bạn</small></span></div></header>
        <div className="drink-wheel-wrap">
          <span className="drink-wheel-pointer" />
          <div className="drink-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
            <span>🧋</span><span>☕</span><span>🍊</span><span>🍵</span><span>🍓</span>
          </div>
          <div className="drink-wheel-center">?</div>
        </div>
        <strong className="drink-wheel-result">{spinning ? 'Đang quay gợi ý…' : result}</strong>
        <button type="button" className="drink-spin-button" onClick={onSpin} disabled={spinning}>
          <Sparkles size={18} /> {spinning ? 'Đang quay…' : 'Quay ngay'}
        </button>
        <div className="drink-moods">
          {moods.map(([emoji, label, suggestion]) => (
            <button type="button" key={label} onClick={() => onMood(`${emoji} ${suggestion}`)}><span>{emoji}</span>{label}</button>
          ))}
        </div>
      </article>

      <article className="drink-water-card">
        <div className="drink-water-icon"><Droplets size={25} /></div>
        <div className="drink-water-copy">
          <span>Mục tiêu bổ sung nước</span>
          <strong>{(waterMl / 1000).toFixed(2).replace('.00', '')}L / {(targetMl / 1000).toFixed(1)}L</strong>
          <p>Đã đạt {percent}% mục tiêu hôm nay. Đừng quên uống thêm một ngụm nhé!</p>
          <i><b style={{ width: `${percent}%` }} /></i>
        </div>
        <button type="button" onClick={() => onAddWater(250)} disabled={waterMl >= targetMl} aria-label="Thêm 250 ml nước"><Plus size={18} /></button>
      </article>
    </div>
  );
}
