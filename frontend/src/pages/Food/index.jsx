import { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import FeaturedFood from '../../components/food/FeaturedFood';
import { foodService } from '../../services/foodService';
export default function Food() { const [foods, setFoods] = useState([]); useEffect(() => { foodService.getAll().then(setFoods); }, []); return <div className="page-container space-y-6"><PageHeader eyebrow="Ẩm thực" title="Hôm Nay Ăn Gì? 🍜" description="Khám phá món ngon phù hợp với thời gian, khẩu vị và ngân sách của bạn." /><FeaturedFood foods={foods} /></div>; }
