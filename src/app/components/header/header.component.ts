import { Component } from '@angular/core';
import { ExchangeRateService } from '../../services/exchangeRate.service';
import { Currencies } from '../../types/index.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  exchangeRateEUR?: number;
  exchangeRateUSD?: number;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    this.exchangeRateService
      .getExchangeRate(Currencies.EUR, Currencies.UAH)
      .subscribe(
        (data) =>
          (this.exchangeRateEUR =
            this.exchangeRateService.calculateExchangeRate(
              data.conversion_rate
            ))
      );

    this.exchangeRateService
      .getExchangeRate(Currencies.USD, Currencies.UAH)
      .subscribe(
        (data) =>
          (this.exchangeRateUSD =
            this.exchangeRateService.calculateExchangeRate(
              data.conversion_rate
            ))
      );
  }
}
