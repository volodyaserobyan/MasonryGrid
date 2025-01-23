import { useCallback, useEffect, useRef } from "react";

const useScrollPagination = (
  isLoading: boolean,
  hasNextPage: boolean,
  onScrollCallback: () => void
) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (sentinelRef.current && !isLoading && hasNextPage) {
      const sentinelTop = sentinelRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sentinelTop <= windowHeight) {
        onScrollCallback();
      }
    }
  }, [isLoading, hasNextPage, onScrollCallback]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return sentinelRef;
};

export default useScrollPagination;
