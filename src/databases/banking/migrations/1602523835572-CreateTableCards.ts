import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCards1602523835572 implements MigrationInterface {

  // eslint-disable-next-line max-lines-per-function
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'cards',
      columns: [
        {
          name: 'token',
          type: 'varchar',
          isPrimary: true
        },
        {
          name: 'number',
          type: 'varchar'
        },
        {
          name: 'cvv',
          type: 'varchar'
        },
        {
          name: 'number',
          type: 'varchar'
        },
        {
          name: 'expirationMonth',
          type: 'varchar'
        },
        {
          name: 'expirationYear',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar'
        },
        {
          name: 'business',
          type: 'varchar'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards', true);
  }

}
