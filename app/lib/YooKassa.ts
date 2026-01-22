import { YooCheckout } from "@a2seven/yoo-checkout";

export const yooCheckout = new YooCheckout({
  shopId: process.env.YOO_KASSA_SHOP_ID as string,
  secretKey: process.env.YOO_KASSA_SECRET_KEY as string,
});
