import { Children, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCarousel, useCarouselPause } from '../../hook/index.js'
import { IconButton } from '../IconButton/IconButton.jsx'

export function Carousel({
  children,
  className = '',
  ariaLabel = 'Carousel',
  interval = 5000,
  paused = false,
  onImageClick,
}) {
  const slides = Children.toArray(children)
  const rootRef = useRef(null)
  const { paused: internallyPaused, handlers } = useCarouselPause({ rootRef })
  const { index, next, prev, goTo } = useCarousel(slides.length, {
    interval,
    paused: paused || internallyPaused,
  })

  if (slides.length === 0) return null

  const slideButton = (slide, i) => (
    <button
      key={i}
      type="button"
      onClick={() => onImageClick?.(i)}
      aria-label={`Ampliar captura ${i + 1}`}
      className="block h-full w-full min-h-0 min-w-0 cursor-pointer overflow-hidden rounded transition-all focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {slide}
    </button>
  )

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={ariaLabel}
      className={className}
      {...handlers}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') next()
        if (event.key === 'ArrowLeft') prev()
      }}
    >
      <div className="flex gap-3 h-64 overflow-hidden">
        <div className="flex-[2] min-w-0 [&>button]:h-full [&>button]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          {slideButton(slides[index], index)}
        </div>
        <div className="flex flex-1 min-w-0 flex-col gap-3 [&>button]:flex-1 [&>button]:min-h-0 [&>button]:w-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          {slides.map((slide, i) => (i === index ? null : slideButton(slide, i)))}
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