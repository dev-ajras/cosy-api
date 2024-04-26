import { Table, Column, DataType, Model, ForeignKey, BelongsTo  } from "sequelize-typescript";
import User from "./User";
import Publication from "./Publication";


@Table({
    timestamps: true,
    tableName: "comments",
    modelName: "Comment"
})

export default class Comment extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    image!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;
    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Publication)
    @Column ({
        type: DataType.INTEGER,
        allowNull: false,
    })
    publicationId!: number;
    @BelongsTo(() => Publication)
    publication!: Publication;
}