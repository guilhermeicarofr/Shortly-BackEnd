CREATE DATABASE "shortly";



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "links" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"full_url" TEXT NOT NULL,
	"short_url" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "links_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "visits" (
	"id" serial NOT NULL,
	"link_id" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "visits_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "links" ADD CONSTRAINT "links_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "visits" ADD CONSTRAINT "visits_fk0" FOREIGN KEY ("link_id") REFERENCES "links"("id");