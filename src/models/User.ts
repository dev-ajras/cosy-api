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
        allowNull: false,
        defaultValue: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    })
    profile_image!: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        defaultValue: "https://p4.wallpaperbetter.com/wallpaper/650/47/795/hdr-fireplace-indoors-fire-wallpaper-preview.jpg"
    })
    background_image!: string;
}