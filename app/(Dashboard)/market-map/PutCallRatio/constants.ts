export const PCR_TYPES = {
  niftypcr: "niftypcr",
  bankniftypcr: "bankniftypcr",
  finniftypcr: "finniftypcr",
} as const;

export const PCR_TYPE_LABELS = {
  [PCR_TYPES.niftypcr]: "Nifty",
  [PCR_TYPES.bankniftypcr]: "Bank Nifty",
  [PCR_TYPES.finniftypcr]: "Fin Nifty",
} as const;

export const DEFAULT_PCR_TYPE = PCR_TYPES.niftypcr;
