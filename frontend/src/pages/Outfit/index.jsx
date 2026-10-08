import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import OutfitCard from '../../components/outfit/OutfitCard';
import { outfitService } from '../../services/outfitService';
export default function Outfit() { const [outfits, setOutfits] = useState([]); useEffect(() => { outfitService.getAll().then(setOutfits); }, []); return <div className="page-container space-y-6"><PageHeader eyebrow="Phong cách" title="Hôm Nay Mặc Gì? 👕" description="Gợi ý trang phục thoải mái theo thời tiết và hoạt động trong lịch trình." /><div className="space-y-5">{outfits.map((outfit) => <OutfitCard key={outfit.id} outfit={outfit} />)}</div></div>; }
