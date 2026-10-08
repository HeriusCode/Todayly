import FoodCard from './FoodCard';
export default function FeaturedFood({ foods }) { return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{foods.map((food) => <FoodCard key={food.id} food={food} />)}</div>; }
