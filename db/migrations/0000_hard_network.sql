CREATE EXTENSION postgis;  
CREATE TABLE "stores" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"country" text NOT NULL,
	"city" text NOT NULL,
	"location" geometry(point) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "spatial_index" ON "stores" USING gist ("location");

