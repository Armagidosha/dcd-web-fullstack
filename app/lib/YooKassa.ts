import { YooCheckout } from "@a2seven/yoo-checkout";

export const yooCheckout = new YooCheckout({
  shopId: process.env.YUKASSA_SHOP_ID as string,
  secretKey: process.env.YUKASSA_SECRET_KEY as string,
});
