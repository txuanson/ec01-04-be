-- CreateTable
CREATE TABLE "admin" (
    "m_username" TEXT NOT NULL,
    "m_password" TEXT NOT NULL,
    "m_email" TEXT NOT NULL,
    "m_role" VARCHAR(32),
    "m_last_login" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_id" SERIAL NOT NULL,

    CONSTRAINT "admin_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "cart_item" (
    "m_session_id" INTEGER NOT NULL,
    "m_product_id" INTEGER NOT NULL,
    "m_quantity" INTEGER NOT NULL DEFAULT 1,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_item_pk" PRIMARY KEY ("m_session_id","m_product_id")
);

-- CreateTable
CREATE TABLE "category" (
    "m_id" SERIAL NOT NULL,
    "m_name" TEXT NOT NULL,
    "m_desc" TEXT NOT NULL,
    "m_right_node" INTEGER NOT NULL,
    "m_left_node" INTEGER NOT NULL,
    "m_create_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "discount" (
    "m_id" SERIAL NOT NULL,
    "m_code" TEXT NOT NULL,
    "m_percent" INTEGER NOT NULL,
    "m_desc" TEXT NOT NULL,
    "m_max_discount" MONEY NOT NULL,
    "m_expire" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discount_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "m_id" INTEGER NOT NULL,
    "m_name" TEXT,
    "m_desc" TEXT,
    "m_logo" TEXT,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manufacturer_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "order" (
    "m_id" SERIAL NOT NULL,
    "m_user_id" INTEGER NOT NULL,
    "m_payment_id" INTEGER NOT NULL,
    "m_status" VARCHAR(50) NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_address" TEXT NOT NULL,

    CONSTRAINT "order_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "m_order_id" INTEGER NOT NULL,
    "m_product_id" INTEGER NOT NULL,
    "m_quantity" INTEGER NOT NULL DEFAULT 1,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_item_pk" PRIMARY KEY ("m_order_id","m_product_id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "m_order_id" INTEGER NOT NULL,
    "m_amount" INTEGER NOT NULL,
    "m_provider" TEXT NOT NULL,
    "m_status" VARCHAR(50) NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_payment_pk" PRIMARY KEY ("m_order_id")
);

-- CreateTable
CREATE TABLE "order_shipping_status" (
    "m_order_id" INTEGER NOT NULL,
    "m_status" INTEGER NOT NULL,
    "m_provider" VARCHAR NOT NULL,
    "m_reason" TEXT NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_shipping_status_pk" PRIMARY KEY ("m_order_id","m_created_at")
);

-- CreateTable
CREATE TABLE "origin" (
    "m_id" SERIAL NOT NULL,
    "m_country" TEXT NOT NULL,
    "m_flag" TEXT,

    CONSTRAINT "origin_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "product" (
    "m_id" INTEGER NOT NULL,
    "m_sku" TEXT,
    "m_name" TEXT,
    "m_desc" TEXT,
    "m_price" MONEY DEFAULT 0,
    "m_manu_id" INTEGER,
    "m_created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_img" TEXT[],
    "m_category_id" INTEGER,
    "m_origin_id" INTEGER,
    "m_rating_count" INTEGER NOT NULL DEFAULT 0,
    "m_avg_rating" INTEGER NOT NULL DEFAULT 5,
    "m_status" TEXT DEFAULT E'ACTIVE',

    CONSTRAINT "product_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "product_discount" (
    "m_product_id" INTEGER NOT NULL,
    "m_discount_id" INTEGER NOT NULL,
    "m_created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_discount_pk" PRIMARY KEY ("m_product_id","m_discount_id")
);

-- CreateTable
CREATE TABLE "shopping_session" (
    "m_id" INTEGER NOT NULL,
    "m_user_id" INTEGER NOT NULL,
    "m_total" INTEGER NOT NULL,
    "m_created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shopping_session_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "user" (
    "m_id" SERIAL NOT NULL,
    "m_email" TEXT NOT NULL,
    "m_password" TEXT NOT NULL,
    "m_name" TEXT NOT NULL,
    "m_avatar" TEXT,
    "m_last_login" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "m_modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "m_id" SERIAL NOT NULL,
    "m_user_id" INTEGER NOT NULL,
    "m_type" TEXT NOT NULL,
    "m_phone" TEXT NOT NULL,
    "m_city" TEXT NOT NULL,
    "m_district" TEXT NOT NULL,
    "m_ward" TEXT NOT NULL,
    "m_address" TEXT NOT NULL,

    CONSTRAINT "user_address_pk" PRIMARY KEY ("m_id")
);

-- CreateTable
CREATE TABLE "user_rating" (
    "m_id" SERIAL NOT NULL,
    "m_user_id" INTEGER,
    "m_product_id" INTEGER,
    "m_rating" INTEGER,
    "m_content" TEXT,
    "m_photos" TEXT[],
    "m_created_at" TIMESTAMP(6),

    CONSTRAINT "user_rating_pk" PRIMARY KEY ("m_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_m_name_uindex" ON "category"("m_name");

-- CreateIndex
CREATE UNIQUE INDEX "discount_m_code_uindex" ON "discount"("m_code");

-- CreateIndex
CREATE UNIQUE INDEX "origin_m_country_uindex" ON "origin"("m_country");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_uindex" ON "user"("m_email");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_product_m_id_fk" FOREIGN KEY ("m_product_id") REFERENCES "product"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_shopping_session_m_id_fk" FOREIGN KEY ("m_session_id") REFERENCES "shopping_session"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_m_id_fk" FOREIGN KEY ("m_user_id") REFERENCES "user"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_m_id_fk" FOREIGN KEY ("m_order_id") REFERENCES "order"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_product_m_id_fk" FOREIGN KEY ("m_product_id") REFERENCES "product"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_m_id_fk" FOREIGN KEY ("m_order_id") REFERENCES "order"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_shipping_status" ADD CONSTRAINT "order_shipping_order_m_id_fk" FOREIGN KEY ("m_order_id") REFERENCES "order"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_m_id_fk" FOREIGN KEY ("m_category_id") REFERENCES "category"("m_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_manufacturer_m_id_fk" FOREIGN KEY ("m_manu_id") REFERENCES "manufacturer"("m_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_origin_m_id_fk" FOREIGN KEY ("m_origin_id") REFERENCES "origin"("m_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "product_discount" ADD CONSTRAINT "product_discount_discount_m_id_fk" FOREIGN KEY ("m_discount_id") REFERENCES "discount"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discount" ADD CONSTRAINT "product_discount_product_m_id_fk" FOREIGN KEY ("m_product_id") REFERENCES "product"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shopping_session" ADD CONSTRAINT "shopping_session_user_m_id_fk" FOREIGN KEY ("m_user_id") REFERENCES "user"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_m_id_fk" FOREIGN KEY ("m_user_id") REFERENCES "user"("m_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_product_m_id_fk" FOREIGN KEY ("m_product_id") REFERENCES "product"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_rating" ADD CONSTRAINT "user_rating_user_m_id_fk" FOREIGN KEY ("m_user_id") REFERENCES "user"("m_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
