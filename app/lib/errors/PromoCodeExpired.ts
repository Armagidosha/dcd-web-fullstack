export class PromoCodeExpiredError extends Error {
  constructor(message = "Promo code expired") {
    super(message);
    this.name = "PromoCodeExpiredError";
  }
}
