-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(60) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "id" SERIAL NOT NULL,
    "person_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "asset_number" VARCHAR(50) NOT NULL,
    "created_by_user_id" INTEGER NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_email_key" ON "equipments"("email");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_type_key" ON "equipments"("type");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_asset_number_key" ON "equipments"("asset_number");

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
