-- CreateTable
CREATE TABLE "users"
(
    "user_id" SERIAL ,
    "userName" TEXT ,
    "banned" boolean ,
    "email" TEXT ,
    "phoneNumber" INTEGER ,

    "image" TEXT ,
    "ratings" numeric[] ,
	"pendingRequests" TEXT[] ,
    "location" TEXT  ,
	"contactList" TEXT[] ,
	"verified" boolean ,

    PRIMARY KEY
    ("user_id")
);

    -- CreateTable
    CREATE TABLE "posts"
    (
        "post_id" SERIAL NOT NULL,
        "type" TEXT NOT NULL ,
        "departCountry" TEXT NOT NULL,
        "departTime" TEXT NOT NULL,
        "arriveCountry" TEXT NOT NULL,
        "arriveTime" TEXT NOT NULL,
        "content" TEXT NOT NULL ,
        "paymentWays" TEXT[] NOT NULL,
    "acceptedItems" TEXT[] NOT NULL,
    "weight" TEXT NOT NULL,
    "postTime" TEXT NOT NULL ,
  
"poster_image" TEXT
NOT NULL ,
"poster_name" TEXT
NOT NULL ,
"poster_id" INTEGER
NOT NULL ,
    "flight_id" TEXT NOT NULL ,
	
   

    PRIMARY KEY
        ("post_id")
);-- CreateTable
        CREATE TABLE "reviews"
        (
            "review_id" SERIAL NOT NULL,
            "content" TEXT NOT NULL ,
            "reviewSender" INTEGER NOT NULL,
            "reviewReceiver" INTEGER NOT NULL,




            PRIMARY KEY ("review_id")
        );

        -- CreateTable
        CREATE TABLE "products"
        (
            "product_id" SERIAL NOT NULL,
            "shipper_id" INTEGER NOT NULL,
            "receiver_id" INTEGER NOT NULL,
            "status" TEXT NOT NULL ,
            "weight" TEXT NOT NULL ,
            "productName" TEXT NOT NULL ,

            "flightNumber" TEXT NOT NULL ,

            PRIMARY KEY ("product_id")
        );
        -- CreateTable
        CREATE TABLE "reclamation"
        (
            "reclamation_id" SERIAL NOT NULL,
            "content" TEXT NOT NULL ,
            "response" INTEGER,
            "sender_id" INTEGER,

                PRIMARY KEY ("reclamation_id")
        );

    
-- CreateTable

CREATE TABLE "articles"
(
    "article_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL ,
    "content" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "summary" TEXT NOT NULL,





    PRIMARY KEY
    ("article_id")
);

-- CreateTable

CREATE TABLE "notification"
(
    "notification_id" SERIAL NOT NULL,
    "status" TEXT NOT NULL ,
    "content" TEXT NOT NULL,
   "notification_receiver" INTEGER NOT NULL





    PRIMARY KEY
    ("notification_id")
);

        -- CreateIndex
        CREATE UNIQUE INDEX "user.id_unique" ON "users"("userName");


        -- AddForeignKey
        ALTER TABLE "posts" ADD FOREIGN KEY ("poster_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

        -- AddForeignKey
        ALTER TABLE "products" ADD FOREIGN KEY ("shipper_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

        -- AddForeignKey
        ALTER TABLE "products" ADD FOREIGN KEY ("receiver_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

        -- AddForeignKey
        ALTER TABLE "reviews" ADD FOREIGN KEY ("reviewSender") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

     
-- AddForeignKey
ALTER TABLE "reviews" ADD FOREIGN KEY ("reviewReceiver") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reclamation" ADD FOREIGN KEY ("sender_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "notification" ADD FOREIGN KEY ("notification_receiver") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
