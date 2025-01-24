import { useRef, useEffect } from "react";

const useHorizontalScroll = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleWheel = (event) => {
        const isScrollable =
          container.scrollWidth > container.clientWidth; // Check if scrolling is possible

        if (isScrollable) {
          const delta = event.deltaY;
          if (Math.abs(delta) > Math.abs(event.deltaX)) {
            event.preventDefault();
            container.scrollBy({
              left: delta,
              behavior: "smooth",
            });
          }
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return { containerRef };
};

export default useHorizontalScroll;
