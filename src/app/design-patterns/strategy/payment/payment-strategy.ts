export interface Payment {
  pay(amount: number): string;
}

export class CreditCardPayment implements Payment {
  pay(amount: number) {
    return `Paid ${amount} using Credit Card.`;
  }
}

export class PayPalPayment implements Payment {
  pay(amount: number) {
    return `Paid ${amount} using PayPal.`;
  }
}

export class BitcoinPayment implements Payment {
  pay(amount: number) {
    return `Paid ${amount} using Bitcoin.`;
  }
}
