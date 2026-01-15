export class PaymentError extends Error {
  constructor(
    message: string,
    public details: Record<string, string[]>,
  ) {
    super(message);
    this.name = "PaymentError";
  }
}
