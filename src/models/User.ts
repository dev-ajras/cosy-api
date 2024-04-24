import { Table, Column, DataType, Model, Unique} from "sequelize-typescript";

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
    
    @Unique
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

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    work!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    birthdate!: string; 

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    school!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    genre!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    country!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    profile_image!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    background_image!: string;
}