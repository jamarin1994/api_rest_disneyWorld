

module.exports = (sequelize,dataTypes) =>{

    const alias = "characters";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING,
            allowNull : false
        },
        age : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        weight : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false
        },
        history : {
            type : dataTypes.STRING(500),
            allowNull : false
        }

    };

    const config = {
        timestamps : false,
        tableName : "characters"
    };

    const Character = sequelize.define(alias,cols,config);

    Character.associate = (models) =>{
        Character.belongsToMany(models.movies,{
            as : "movies",
            through : "characterMovie",
            foreignKey : "characterId",
            otherKey : "movieId"
        })
    }

    return Character
}