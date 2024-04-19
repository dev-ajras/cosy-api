import { Table, Column, DataType, Model} from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "users",
    modelName: "User"
})

export default class User extends Model {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })

    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    mail!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
}