import { IPrices } from "@shared/interfaces/Product";

export class CalculatePriceService {
  async run(amount: number) {
    const prices = [
      {
        price: 50,
        minimum: 0,
      },
      {
        minimum: 0.1,
        price: 48,
      },
      {
        minimum: 0.05,
        price: 48,
      },
    ];

    const filteredPrices = prices.filter((item) => item.minimum <= amount);
    console.log(filteredPrices);
    let lowestPrice = 0;
    if (filteredPrices.length === 1) lowestPrice = filteredPrices[0].price;
    else {
      filteredPrices.sort(function (a: IPrices, b: IPrices): any {
        lowestPrice = a.price < b.price ? a.price : b.price;
      });
    }

    const value = lowestPrice * amount;

    return value;
  }
}
