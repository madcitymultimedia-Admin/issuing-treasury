ALTER TABLE "users" ADD COLUMN "last_login_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "users" ALTER COLUMN "last_login_at" SET NOT NULL;

ALTER TABLE "users" ADD COLUMN "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;

ALTER TABLE "users" ADD COLUMN "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "users" ALTER COLUMN "updated_at" SET NOT NULL;