import { useEffect, useRef } from "react";

interface Props {
  element: SVGElement;
  onElementAttached: () => void;
}

export function AttachForeignSVG({ element, onElementAttached }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // attach foreign node only on first run, do not handle any subsequent changes
  useEffect(() => {
    if (containerRef.current?.children.length === 0) {
      containerRef.current.appendChild(element);
    }

    onElementAttached();
  }, []);

  return <div ref={containerRef}></div>;
}
