export class PromoCodeInvalidError extends Error {
  constructor(message = "Promo code invalid") {
    super(message);
    this.name = "PromoCodeInvalidError";
  }
}
