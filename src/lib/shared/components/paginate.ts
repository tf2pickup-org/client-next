export interface Paginated {
  last: number;
  around: number[];
}

const range = 2;

export const paginate = (
  currentPage: number,
  itemsPerPage: number,
  itemCount: number,
): Paginated => {
  const links: number[] = [];
  const last = Math.ceil(itemCount / itemsPerPage);

  let from = Math.max(currentPage - range, 1);
  const to = Math.min(from + range * 2, last);
  from = Math.max(to - range * 2, 1);

  for (let i = from; i <= to; ++i) {
    links.push(i);
  }

  return {
    last,
    around: links,
  };
};
