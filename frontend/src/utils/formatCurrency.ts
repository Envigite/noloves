export function formatCurrency(
  value: number,
  locale: string = "es-CL",
  currency: string = "CLP"
): string {
  return value.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
}
