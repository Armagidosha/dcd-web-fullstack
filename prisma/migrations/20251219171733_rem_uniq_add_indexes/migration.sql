-- DropIndex
DROP INDEX "Rule_order_key";

-- CreateIndex
CREATE INDEX "Latest_createdAt_idx" ON "Latest"("createdAt");

-- CreateIndex
CREATE INDEX "News_createdAt_idx" ON "News"("createdAt");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "Product"("price");

-- CreateIndex
CREATE INDEX "Rule_order_idx" ON "Rule"("order");
