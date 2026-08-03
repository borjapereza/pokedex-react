import { useEffect, useRef, useState } from "react";

const CANTIDAD_INICIAL = 24;
const CANTIDAD_CARGA = 24;

export function useInfiniteScroll(totalElementos: number) {
  const [cantidadMostrar, setCantidadMostrar] =
    useState(CANTIDAD_INICIAL);

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entradas) => {
        const entrada = entradas[0];

        if (!entrada.isIntersecting) {
          return;
        }

        setCantidadMostrar((cantidadActual) =>
          Math.min(
            cantidadActual + CANTIDAD_CARGA,
            totalElementos,
          ),
        );
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [totalElementos]);

  return {
    cantidadMostrar,
    sentinelRef,
  };
}