import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRate } from '../types/index.types';
import { VERY_SECURITY_KEY } from '../constants/index.constants';
@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  constructor(private http: HttpClient) {}

  getExchangeRate(code: string, rate: string): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(
      `https://v6.exchangerate-api.com/v6/${VERY_SECURITY_KEY}/pair/${code}/${rate}`
    );
  }
  calculateExchangeRate(
    conversionRate: number,
    basicExchangeAmount: number = 1
  ): number {
    return Number((basicExchangeAmount * conversionRate).toFixed(4));
  }
}
