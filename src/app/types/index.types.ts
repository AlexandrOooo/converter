export interface ExchangeRate {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: Currencies;
  target_code: Currencies;
  conversion_rate: number;
}
export enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
  UAH = 'UAH',
}
