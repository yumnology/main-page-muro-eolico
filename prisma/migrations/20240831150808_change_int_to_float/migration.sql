-- CreateTable
CREATE TABLE "PropellerData" (
    "id" TEXT NOT NULL,
    "propeller1" DOUBLE PRECISION NOT NULL,
    "propeller2" DOUBLE PRECISION NOT NULL,
    "propeller3" DOUBLE PRECISION NOT NULL,
    "propeller4" DOUBLE PRECISION NOT NULL,
    "propeller5" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PropellerData_pkey" PRIMARY KEY ("id")
);
