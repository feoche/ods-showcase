import { BUTTON_EMPHASIS, BUTTON_SIZE, Button } from '@ovhcloud/ods-react';
import * as React from 'react';

interface TocAffixProps {
  /** The component names shown on the page, in order: each links to the section whose id is its lower case. */
  sections: string[];
  onSelect: (sectionId: string) => void;
}

/**
 * The drawer's component list as small low-emphasis buttons, fixed in the empty space left of the content on
 * wide screens. It highlights the section being read and keeps that button in view when the list is longer
 * than the screen.
 */
export const TocAffix = ({ sections, onSelect }: TocAffixProps) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // The active section is the first one crossing the top part of the viewport, under the navbar.
  React.useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.toLowerCase()))
      .filter((element): element is HTMLElement => element !== null);
    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          intersecting.set(entry.target.id, entry.isIntersecting);
        }
        const first = elements.find((element) => intersecting.get(element.id));
        if (first) {
          setActiveId(first.id);
        }
      },
      { rootMargin: '-96px 0px -60% 0px' }
    );
    for (const element of elements) {
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [sections]);

  // Scroll the list, not the page, so the active link stays visible.
  React.useEffect(() => {
    const list = listRef.current;
    const link = activeId
      ? list?.querySelector<HTMLElement>(`[data-section="${activeId}"]`)
      : null;
    if (!list || !link) {
      return;
    }
    if (link.offsetTop < list.scrollTop) {
      list.scrollTop = link.offsetTop;
    } else if (
      link.offsetTop + link.offsetHeight >
      list.scrollTop + list.clientHeight
    ) {
      list.scrollTop = link.offsetTop + link.offsetHeight - list.clientHeight;
    }
  }, [activeId]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Components" className="toc-affix">
      <div className="toc-affix__list" ref={listRef}>
        {sections.map((section) => {
          const id = section.toLowerCase();
          return (
            <Button
              aria-current={id === activeId ? 'location' : undefined}
              className="toc-affix__item"
              data-section={id}
              emphasis={BUTTON_EMPHASIS.low}
              key={id}
              onClick={() => onSelect(id)}
              size={BUTTON_SIZE.sm}
            >
              {section}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};
