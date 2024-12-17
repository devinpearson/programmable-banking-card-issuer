-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Terminal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "currency" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "currencyCode" TEXT NOT NULL,
    "merchantCode" TEXT NOT NULL,
    "merchantName" TEXT NOT NULL,
    "merchantCity" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_key" ON "Card"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Terminal_id_key" ON "Terminal"("id");
