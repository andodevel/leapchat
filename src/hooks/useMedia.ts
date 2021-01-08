import { useEffect, useState } from "react";
import { Media } from "../models";

export default function useMedia() {
  const queries = [
    "(min-width: 1024px)",
    "(min-width: 768px)",
    "(min-width: 376px)",
  ];
  const values = [Media.DESKTOP, Media.TABLET, Media.PHONE];

  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : Media.PHONE;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);

  return value;
}
