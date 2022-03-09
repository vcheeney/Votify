import { useEffect, useState } from "react";

export function usePageLoaded() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded;
}
