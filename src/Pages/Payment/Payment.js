import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import paymentService from "../../Services/payment.service";

export default function Payment() {
  let [invoice, setInvoice] = useState("");

  let { subscriptionType } = useParams();

  useEffect(() => {
    paymentService.getInvoice().then((response) => {
      setInvoice(response.data);
    });
  }, []);

  return (
    <div>
      <form action="https://www.coinpayments.net/index.php" method="post">
        <input type="hidden" name="cmd" value="_pay_simple" />
        <input type="hidden" name="reset" value="1" />
        <input
          type="hidden"
          name="merchant"
          value="661a3ac5e8834a8251a81452e027c3b9"
        />
        <input type="hidden" name="item_name" value={subscriptionType} />
        <input
          type="hidden"
          name="item_desc"
          value="Starter Subscription for Fitt platform"
        />
        <input type="hidden" name="currency" value="USDT.BEP20" />
        <input type="hidden" name="amountf" value="10.00000000" />
        <input type="hidden" name="invoice" value={invoice} />

        <input type="hidden" name="want_shipping" value="0" />
        <input
          type="hidden"
          name="success_url"
          value="https://gregarious-crostata-7ee7b5.netlify.app/#"
        />
        <input
          type="hidden"
          name="ipn_url"
          value="https://fitt.ink/api/payment/ipn"
        />
        <input
          type="image"
          src="https://www.coinpayments.net/images/pub/buynow-grey.png"
          alt="Купить используя CoinPayments.net"
        />
      </form>
    </div>
  );
}
