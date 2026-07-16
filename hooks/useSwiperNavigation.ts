import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

/**
 * Binds custom prev/next buttons after mount.
 * Needed when the next button is a sibling rendered after <Swiper>,
 * so nextRef is still null during Swiper's own onInit.
 */
export function useSwiperNavigation() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (!swiper) return;

    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!prevEl || !nextEl) return;

    // `navigation={true}` keeps a boolean until we replace it with custom els
    swiper.params.navigation = {
      ...(typeof swiper.params.navigation === 'object' && swiper.params.navigation
        ? swiper.params.navigation
        : {}),
      prevEl,
      nextEl,
    };

    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, [swiper]);

  return { prevRef, nextRef, onSwiper: setSwiper };
}
