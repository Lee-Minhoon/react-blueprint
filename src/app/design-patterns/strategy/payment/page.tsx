"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { PaymentContext } from "./context-class";
import {
  BitcoinPayment,
  CreditCardPayment,
  PayPalPayment,
} from "./payment-strategy";

enum PaymentOptions {
  CREDIT_CARD = "Credit Card",
  PAYPAL = "PayPal",
  BITCOIN = "Bitcoin",
}

const PAYMENT_STRATEGIES = {
  [PaymentOptions.CREDIT_CARD]: new CreditCardPayment(),
  [PaymentOptions.PAYPAL]: new PayPalPayment(),
  [PaymentOptions.BITCOIN]: new BitcoinPayment(),
} as const;

const PAYMENT_CONTEXT = new PaymentContext(
  PAYMENT_STRATEGIES[PaymentOptions.CREDIT_CARD]
);

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState<PaymentOptions>(
    PaymentOptions.CREDIT_CARD
  );
  const [result, setResult] = useState("");
  const [amount, setAmount] = useState(100);

  const handlePayment = useCallback(() => {
    const paymentStrategy = PAYMENT_STRATEGIES[selectedOption];
    PAYMENT_CONTEXT.setPaymentStrategy(paymentStrategy);
    setResult(PAYMENT_CONTEXT.pay(amount));
  }, [amount, selectedOption]);

  return (
    <div className="flex flex-col gap-2 max-w-md">
      <RadioGroup
        value={selectedOption}
        onValueChange={(value) => setSelectedOption(value as PaymentOptions)}
      >
        {Object.entries(PaymentOptions).map(([key, value]) => (
          <div className="flex gap-2" key={key}>
            <RadioGroupItem value={value} id={`option-${key}`} />
            <Label htmlFor={`option-${key}`}>{value}</Label>
          </div>
        ))}
      </RadioGroup>
      <Input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <Button onClick={handlePayment}>Pay</Button>
      {result && <p>{result}</p>}
    </div>
  );
}
