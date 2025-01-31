DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'postgis') THEN
        CREATE EXTENSION postgis;
    END IF;
END $$;

CREATE TABLE "stores" (
    "id" text PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "image" text DEFAULT '/store.jpeg' NOT NULL,
    "address" text NOT NULL,
    "country" text NOT NULL,
    "city" text NOT NULL,
    "location" geometry (point) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "spatial_index" ON "stores" USING gist ("location");