import { Table, Column, DataType, Model, ForeignKey, BelongsTo  } from "sequelize-typescript";
import User from "./User";


@Table({
    timestamps: true,
    tableName: "publications",
    modelName: "Publication"
})

export default class Publication extends Model {

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

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    isPublic!: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;
    @BelongsTo(() => User)
    user!: User;
}