DROP TABLE IF EXISTS "users";

CREATE TABLE "properties" (
	"id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
	"node_name" varchar(255) NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"typology" varchar(50) NOT NULL,
	"price_estimate" varchar(100),
	"notes" text,
	"photo_url" text,
	"ip_hash" varchar(64),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);

CREATE TABLE "amenities" (
	"id" uuid DEFAULT gen_random_uuid() PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"geometry_type" varchar(20) NOT NULL,
	"coordinates" jsonb NOT NULL,
	"color" varchar(20) NOT NULL,
	"icon" varchar(50),
	"city" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX "idx_properties_location" ON "properties" USING btree ("latitude","longitude");
CREATE INDEX "idx_properties_visible" ON "properties" USING btree ("is_visible","created_at");
CREATE INDEX "idx_properties_ip_hash" ON "properties" USING btree ("ip_hash","created_at");
CREATE INDEX "idx_amenities_city" ON "amenities" USING btree ("city");
