import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExchangeRateService } from '../../services/exchangeRate.service';
import { Currencies, ExchangeRate } from '../../types/index.types';
import {
  FIRST_EXCHANGE_FIELD_ID,
  SECOND_EXCHANGE_FIELD_ID,
} from '../../constants/index.constants';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent {
  currencies = Object.keys(Currencies);
  firstExchangeFieldId = FIRST_EXCHANGE_FIELD_ID;
  secondExchangeFieldId = SECOND_EXCHANGE_FIELD_ID;

  constructor(public exchangeRateService: ExchangeRateService) {}
  firstExchangeValue: number = 0;
  firstExchangeCurrency = Currencies.UAH;

  exchangeRate!: Observable<ExchangeRate>;
  secondExchangeValue: number = 0;
  secondExchangeCurrency = Currencies.USD;

  calculateValue(id: string) {
    if (id === FIRST_EXCHANGE_FIELD_ID) {
      this.exchangeRate.subscribe((value: ExchangeRate) => {
        this.firstExchangeValue =
          this.exchangeRateService.calculateExchangeRate(
            value.conversion_rate,
            this.secondExchangeValue
          );
      });
    } else {
      this.exchangeRate.subscribe((value: ExchangeRate) => {
        this.secondExchangeValue =
          this.exchangeRateService.calculateExchangeRate(
            value.conversion_rate,
            this.firstExchangeValue
          );
      });
    }
  }
  changeCurrency(id: string) {
    this.getExchangeRate(id);

    let calculatedElementId =
      id === FIRST_EXCHANGE_FIELD_ID
        ? SECOND_EXCHANGE_FIELD_ID
        : FIRST_EXCHANGE_FIELD_ID;

    this.calculateValue(calculatedElementId);
  }
  getExchangeRate(id: string) {
    let from;
    let to;

    if (id === FIRST_EXCHANGE_FIELD_ID) {
      from = this.firstExchangeCurrency;
      to = this.secondExchangeCurrency;
    } else {
      from = this.secondExchangeCurrency;
      to = this.firstExchangeCurrency;
    }

    this.exchangeRate = this.exchangeRateService.getExchangeRate(from, to);
  }
}
