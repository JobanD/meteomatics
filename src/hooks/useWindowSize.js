import { useState, useEffect } from "react";
import { debounce } from "lodash";

export default function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize([window.innerHeight, window.innerWidth]);
    };
    // 200ms delay on resizing to prevent constant resize on every pixel change
    const debounceHandleResize = debounce(handleResize, 200);
    window.addEventListener("resize", debounceHandleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", debounceHandleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
