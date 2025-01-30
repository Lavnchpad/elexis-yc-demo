export function SkillBar({ rating, maxRating = 5 }) {
    return (
      <div className="flex gap-1">
        {[...Array(maxRating)].map((_, index) => (
          <div key={index} className={`h-4 w-4 rounded ${index < rating ? "bg-purple-500" : "bg-purple-100"}`} />
        ))}
      </div>
    )
  }
  
  