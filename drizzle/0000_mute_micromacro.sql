CREATE TABLE "reservations" (
	"id" integer PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"office" jsonb NOT NULL,
	"room" jsonb NOT NULL,
	"date" date NOT NULL,
	"timeStart" timestamp with time zone,
	"timeEnd" timestamp with time zone,
	"amount" numeric NOT NULL,
	"foodType" text[],
	"cost" numeric
);
