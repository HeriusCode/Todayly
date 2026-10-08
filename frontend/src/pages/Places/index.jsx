import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import PlaceCard from '../../components/place/PlaceCard';
import { placeService } from '../../services/placeService';
export default function Places() { const [places, setPlaces] = useState([]); useEffect(() => { placeService.getAll().then(setPlaces); }, []); return <div className="page-container space-y-6"><PageHeader eyebrow="Khám phá" title="Hôm Nay Đi Đâu? 🌿" description="Các điểm hẹn làm việc, thư giãn và vận động phù hợp với nhịp sống hôm nay." /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{places.map((place) => <PlaceCard key={place.id} place={place} />)}</div></div>; }
