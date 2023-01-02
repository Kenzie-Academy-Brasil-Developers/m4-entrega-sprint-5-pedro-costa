import { MigrationInterface, QueryRunner } from "typeorm";

export class createkImoveisEntities1672174816150 implements MigrationInterface {
    name = 'createkImoveisEntities1672174816150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" character varying, "city" character varying NOT NULL, "state" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addresseIdId" uuid, "categoryIdId" uuid, CONSTRAINT "REL_57cdb1cf244236fc3fb5168d94" UNIQUE ("addresseIdId"), CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "hour" TIME NOT NULL, "propertyId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb" PRIMARY KEY ("id", "propertyId", "userId"))`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_7deb41becdbf1052d1d9610d692" PRIMARY KEY ("propertyId", "userId")`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_7deb41becdbf1052d1d9610d692"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb" PRIMARY KEY ("propertyId", "userId", "id")`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_7deb41becdbf1052d1d9610d692" PRIMARY KEY ("propertyId", "userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_3193709d61be5a23d570547c96" ON "schedules_users_properties" ("propertyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6b07764ec82685efb66e562984" ON "schedules_users_properties" ("userId") `);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_57cdb1cf244236fc3fb5168d94a" FOREIGN KEY ("addresseIdId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_f051b757f8e45139549dceb39af" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_3193709d61be5a23d570547c964" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "FK_6b07764ec82685efb66e5629845" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_6b07764ec82685efb66e5629845"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "FK_3193709d61be5a23d570547c964"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_f051b757f8e45139549dceb39af"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_57cdb1cf244236fc3fb5168d94a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b07764ec82685efb66e562984"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3193709d61be5a23d570547c96"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_7deb41becdbf1052d1d9610d692"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb" PRIMARY KEY ("propertyId", "userId", "id")`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_7deb41becdbf1052d1d9610d692" PRIMARY KEY ("propertyId", "userId")`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" DROP CONSTRAINT "PK_7deb41becdbf1052d1d9610d692"`);
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" ADD CONSTRAINT "PK_2da5f1690059bb0f1aa60ec79fb" PRIMARY KEY ("id", "propertyId", "userId")`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
