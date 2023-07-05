export interface PaginationLink {
  page: number;
  label: string;
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

  if (currentPage > 1) {
    links.push({ page: currentPage - 1, label: '«' });
  }

  if (from > 1) {
    links.push({ page: 1, label: '1' });
  }

  if (from > 2) {
    links.push({ page: from - 1, label: '…' });
  }

  for (let i = from; i <= to; ++i) {
    links.push({ page: i, label: `${i}` });
  }

  if (to < lastPage - 1) {
    links.push({ page: to + 1, label: '…' });
  }

  if (to < lastPage) {
    links.push({ page: lastPage, label: `${lastPage}` });
  }

  if (currentPage < lastPage) {
    links.push({ page: currentPage + 1, label: '»' });
  }

  return links;
};
