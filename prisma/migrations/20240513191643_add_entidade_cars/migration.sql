-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "brand" VARCHAR(100) NOT NULL,
    "year" INTEGER NOT NULL,
    "km" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);
