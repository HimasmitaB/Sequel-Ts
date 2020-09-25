import {Model, Column, Table, DataType, Scopes, CreatedAt, UpdatedAt, HasOne} from "sequelize-typescript";
import {Projects} from './Projects';

@Scopes(() => ({
  projects: {
    include: [
      {
        model: Projects,
        through: {attributes: []},
      },
    ],
  },
}))

@Table
export class Users extends Model<Users> {

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

  @Column
  password!: string;

  @Column(DataType.BIGINT)
  mobile_num!: number;

  @Column(DataType.TEXT)
  token!: string;

  @HasOne(() => Projects)
  projects?: Projects[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
