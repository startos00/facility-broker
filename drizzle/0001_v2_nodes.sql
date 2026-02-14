-- v2: Unified nodes table replacing properties
DROP TABLE IF EXISTS "properties";

CREATE TABLE "nodes" (
    "id"              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "node_name"       VARCHAR(255) NOT NULL,
    "typology"        VARCHAR(20) NOT NULL,
    "description"     TEXT,
    "photo_url"       TEXT,
    "latitude"        DOUBLE PRECISION NOT NULL,
    "longitude"       DOUBLE PRECISION NOT NULL,
    "boundary"        JSONB,

    "population"      INTEGER,
    "vibe"            VARCHAR(100),
    "next_event_date" DATE,

    "acreage"         VARCHAR(50),
    "price"           INTEGER,
    "zoning"          VARCHAR(100),
    "editability"     INTEGER,
    "is_distressed"   BOOLEAN DEFAULT FALSE NOT NULL,

    "capacity_pax"    INTEGER,
    "internet_speed"  VARCHAR(50),
    "availability"    VARCHAR(100),
    "is_free_offer"   BOOLEAN DEFAULT FALSE NOT NULL,

    "seeking_capital" BOOLEAN DEFAULT FALSE NOT NULL,
    "capital_amount"  VARCHAR(100),

    "ip_hash"         VARCHAR(64),
    "created_at"      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "is_visible"      BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE INDEX "idx_nodes_typology" ON "nodes" ("typology", "is_visible");
CREATE INDEX "idx_nodes_location" ON "nodes" ("latitude", "longitude");
CREATE INDEX "idx_nodes_ip_hash" ON "nodes" ("ip_hash", "created_at");
