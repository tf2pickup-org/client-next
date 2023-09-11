export enum PaginationRole {
  first,
  last,
  previous,
  next,
  skip,
  direct,
}

export interface PaginationLink {
  role: PaginationRole;
  page: number;
}

export const paginate = (
  currentPage: number,
  itemsPerPage: number,
  itemCount: number,
): PaginationLink[] => {
  const links: PaginationLink[] = [];
  const range = 1;
  const lastPage = Math.ceil(itemCount / itemsPerPage);

  const from = Math.max(currentPage - range, 1);
  const to = Math.min(currentPage + range, lastPage);

  links.push({ role: PaginationRole.first, page: 1 });

  if (currentPage > 1) {
    links.push({ role: PaginationRole.previous, page: currentPage - 1 });
  }

  if (from > 2) {
    links.push({ role: PaginationRole.skip, page: from - 1 });
  }

  for (let i = from; i <= to; ++i) {
    links.push({ role: PaginationRole.direct, page: i });
  }

  if (to < lastPage - 1) {
    links.push({ role: PaginationRole.skip, page: to + 1 });
  }

  if (to < lastPage) {
    links.push({ role: PaginationRole.last, page: lastPage });
  }

  if (currentPage < lastPage) {
    links.push({ role: PaginationRole.next, page: currentPage + 1 });
  }

  return links;
};
