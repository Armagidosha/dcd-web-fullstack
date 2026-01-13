import { createHash } from "node:crypto";

interface IdempotencyProps {
  playerNick: string;
  playerEmail: string;
  productId: string;
  promoCode?: string;
}

export function generateIdempotencyKey({
  playerNick,
  playerEmail,
  productId,
  promoCode,
}: IdempotencyProps) {
  const uniqueString = [
    playerNick.toLowerCase().trim(),
    playerEmail.toLowerCase().trim(),
    productId,
    promoCode?.toLowerCase().trim() || "",
  ].join("|");

  const hash = createHash("sha256").update(uniqueString).digest("hex");

  return hash.substring(0, 36);
}
