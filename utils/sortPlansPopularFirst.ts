/** Mobile swiper order: popular plans first, original order preserved within each group. */
export const sortPlansPopularFirst = <T extends { isPopular?: boolean }>(
  plans: readonly T[],
): T[] =>
  [...plans].sort((a, b) => Number(Boolean(b.isPopular)) - Number(Boolean(a.isPopular)));
