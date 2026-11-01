export class Product {
  constructor(
    public readonly id: string,
    public readonly sku: string,
    public currentPrice: number,
    public readonly supplierId: string,
  ) {}

  public updatePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new Error('Le prix doit être strictement positif.');
    }

    const maxAllowedPrice = this.currentPrice * 1.15;

    if (newPrice > maxAllowedPrice) {
      throw new Error(
        `Augmentation refusée : le nouveau prix (${newPrice}€) dépasse la limite de +15% autorisée (${maxAllowedPrice}€).`,
      );
    }

    this.currentPrice = newPrice;
  }
}
