import {Column, CreatedAt, Model, Scopes, Table, UpdatedAt, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {Users} from './Users';

@Scopes(() => ({
  user: {
    include: [{
      model: Users,
      through: {attributes: []},
    }],
  }
}))
@Table
export class Projects extends Model<Projects> {

  @ForeignKey(() => Users)
  @Column
  user_id!: number;

  @Column
  project_name!: string;

  @BelongsTo(() => Users)
  user?: Users[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

}
