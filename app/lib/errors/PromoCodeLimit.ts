export class PromoCodeLimitError extends Error {
  constructor(message = "Promo code usage limit exceeded") {
    super(message);
    this.name = "PromoCodeLimitError";
  }
}
