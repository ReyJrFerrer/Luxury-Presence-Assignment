import { useEffect, useId, useRef, useState } from "react";
import FlexCarousel, { type FlexCarouselItem } from "./FlexCarousel";
import "./PropertyCollection.css";
type Item = FlexCarouselItem & { fullSrc: string };
type Details = { heading: string; description: string; provenance: string };
export default function PropertyCollection({
  items,
  details,
}: {
  items: Item[];
  details: Details;
}) {
  const [interactive, setInteractive] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const titleId = useId();
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setInteractive(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (selected !== null) dialog.current?.showModal();
  }, [selected]);
  const open = (index: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSelected(index);
  };
  const close = () => {
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  };
  const item = selected === null ? null : items[selected];
  return (
    <div className="collection-island">
      {interactive && !unavailable ? (
        <div className="flex-shell">
          <FlexCarousel
            items={items}
            intro="rise"
            preset="liquid"
            cardHeight={0.72}
            gap={22}
            radius={18}
            fit="natural"
            autoplay={false}
            captions={false}
            captureWheel={false}
            focusOnClick={false}
            onSelect={open}
            onUnavailable={() => setUnavailable(true)}
          />
        </div>
      ) : (
        <div className="static-collection">
          {items.map((image, index) => (
            <a
              key={image.src}
              href={image.fullSrc}
              aria-label={`Open ${image.title}`}
              onClick={(event) => {
                event.preventDefault();
                open(index);
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                width="800"
                height="533"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}
      <dialog
        ref={dialog}
        className="collection-dialog"
        aria-labelledby={titleId}
        data-lenis-prevent
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="collection-dialog__close"
          type="button"
          aria-label="Close photograph"
          autoFocus
          onClick={() => dialog.current?.close()}
        >
          Close <span aria-hidden="true">×</span>
        </button>
        {item && (
          <div className="collection-dialog__layout">
            <div className="collection-dialog__image">
              <img src={item.fullSrc} alt={item.alt} width="984" height="655" />
            </div>
            <div className="collection-dialog__copy">
              <p className="eyebrow">{item.subtitle}</p>
              <h2 id={titleId}>{item.title}</h2>
              <p>
                {item.alt}.<br />
                {details.provenance}
              </p>
              <div className="collection-dialog__inquiry">
                <h3>{details.heading}</h3>
                <p>{details.description}</p>
                <a className="button button-dark" href="tel:+12069196886">
                  Ask Marci about homes <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
