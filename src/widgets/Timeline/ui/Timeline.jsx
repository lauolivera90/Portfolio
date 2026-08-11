import { timeline } from '../../../shared/data/timeline.js'
import { Container } from '../../../shared/ui/index.js'

export function Timeline() {
  return (
    <section id="timeline" className="py-24 border-t border-text/10 bg-text/5">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Timeline
        </p>
        <h2 className="text-3xl font-bold text-text mb-16">Career progression</h2>

        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-text/10" />

            <div className="grid grid-cols-5 gap-4">
              {timeline.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10 mb-4 ${
                      i === timeline.length - 1
                        ? 'bg-primary border-primary text-text'
                        : 'bg-background border-text/10 text-text/60'
                    }`}
                  >
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-xs font-semibold text-accent mb-1">{item.year}</p>
                  <p className="text-sm font-medium text-text leading-snug mb-1">{item.label}</p>
                  <p className="text-xs text-text/60 leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10 ${
                    i === timeline.length - 1
                      ? 'bg-primary border-primary text-text'
                      : 'bg-background border-text/10 text-text/60'
                  }`}
                >
                  <span className="text-[10px] font-bold">{i + 1}</span>
                </div>
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-text/10 my-1" />}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-accent mb-0.5">{item.year}</p>
                <p className="text-sm font-medium text-text mb-0.5">{item.label}</p>
                <p className="text-xs text-text/60">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}