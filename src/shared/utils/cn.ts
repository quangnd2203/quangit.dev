type ClassValue = string | undefined | null | false;

/** Simple className merger */
export const cn = (...classes: ClassValue[]): string =>
  classes.filter(Boolean).join(' ');
