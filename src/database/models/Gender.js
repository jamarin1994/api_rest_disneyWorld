

module.exports = (sequelize,dataTypes) =>{

    const alias = "genders";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            allowNull : false
        }

    };

    const config = {
        timestamps : false,
        tableName : "genders"
    };

    const Gender = sequelize.define(alias,cols,config);

    Gender.associate = (models) =>{
        Gender.hasMany(models.movies,{
            as : "movies",
            foreignKey : "genderId"
        }) 
    }

    return Gender
}