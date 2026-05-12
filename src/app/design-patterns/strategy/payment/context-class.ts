import { Payment } from "./payment-strategy";

export class PaymentContext {
  private paymentStrategy: Payment;

  constructor(paymentStrategy: Payment) {
    this.paymentStrategy = paymentStrategy;
  }

  public setPaymentStrategy(paymentStrategy: Payment) {
    this.paymentStrategy = paymentStrategy;
  }

  public pay(amount: number) {
    return this.paymentStrategy.pay(amount);
  }
}
