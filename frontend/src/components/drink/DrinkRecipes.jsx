import { ArrowRight, Clock3 } from 'lucide-react';

export default function DrinkRecipes({ recipes }) {
  return (
    <section className="drink-recipes">
      <header>
        <div><span>Bí quyết pha chế tại nhà</span><h2>Hôm nay ngại ra phố? Tự pha trong 5 phút!</h2><p>Công thức đơn giản với nguyên liệu dễ tìm ngay trong gian bếp của bạn.</p></div>
        <button type="button">Xem tất cả 24 công thức <ArrowRight size={16} /></button>
      </header>
      <div className="drink-recipe-grid">
        {recipes.map((recipe) => (
          <article key={recipe.id}>
            <img src={recipe.image} alt={recipe.name} />
            <div><span><Clock3 size={14} /> {recipe.duration}</span><h3>{recipe.name}</h3><p>{recipe.ingredients}</p></div>
            <button type="button" aria-label={`Xem công thức ${recipe.name}`}><ArrowRight size={17} /></button>
          </article>
        ))}
      </div>
    </section>
  );
}
