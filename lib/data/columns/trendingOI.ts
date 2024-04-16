
export const trendingOIColumns = [
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "index_close",
    header: "Spot Price",
  },
  {
    accessorKey: "calls_change_oi",
    header: "Calls Change OI",
  },
  {
    accessorKey: "puts_change_oi",
    header: "Puts Change OI",
  },
  {
    accessorKey: "diff_in_oi",
    header: "Diff. in OI",
  },
  {
    accessorKey: "direction",
    header: "Dir. of Change",
    enableSorting: false,
  },
  {
    accessorKey: "change_in_direction",
    header: "Change in Dir.",
  },
  {
    accessorKey: "pcr",
    header: "PCR",
  },
  {
    accessorKey: "change_in_oi_pcr",
    header: "COI PCR",
  },
  {
    accessorKey: "volume_pcr",
    header: "Vol. PCR",
  },
] as const;
