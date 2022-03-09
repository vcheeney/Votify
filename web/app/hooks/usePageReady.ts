import { useEffect, useState } from "react";
import { usePageLoaded } from "./usePageLoaded";

export function usePageReady(condition = usePageLoaded()) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (condition) {
      setTimeout(() => {
        setReady(true);
      }, 0);
    }
  }, [condition]);

  return ready;
}
