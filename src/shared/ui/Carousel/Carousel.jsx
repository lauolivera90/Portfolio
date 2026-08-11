import { Children } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel } from '../../hook/index.js'
import { IconButton } from '../IconButton/IconButton.jsx'

export function Carousel({ children, className = '', ariaLabel = 'Carousel' }) {
  const slides = Children.toArray(children)
  const { index, next, prev, goTo } = useCarousel(slides.length)

  if (slides.length === 0) return null

  const activeSlide = slides[index]
  const otherSlides = slides.filter((_, i) => i !== index)

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={className}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') next()
        if (event.key === 'ArrowLeft') prev()
      }}
    >
      <div className="flex gap-3 h-64 overflow-hidden">
        <div className="flex-[2] min-w-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
          {activeSlide}
        </div>
        <div className="flex flex-1 min-w-0 flex-col gap-3 [&>img]:flex-1 [&>img]:min-h-0 [&>img]:w-full [&>img]:object-cover">
          {otherSlides}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <IconButton variant="ghost" size="sm" onClick={prev} aria-label="Captura anterior">
          <ChevronLeft />
        </IconButton>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a la captura ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-text/20 hover:bg-text/40'}`}
            />
          ))}
        </div>
        <IconButton variant="ghost" size="sm" onClick={next} aria-label="Captura siguiente">
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  )
}