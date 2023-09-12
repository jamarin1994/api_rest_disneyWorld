

module.exports = (sequelize,dataTypes) =>{

    const alias = "movies";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        image : {
            type : dataTypes.STRING,
            allowNull : false,
        },
        title : {
            type : dataTypes.STRING,
            allowNull : false,
        },
        creationDate : {
            type : dataTypes.DATE,
            allowNull : false,
        },
        rating : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
        genderId : {
            type : dataTypes.INTEGER,
            allowNull : false,
        }

    };

    const config = {
        timestamps : false,
        tableName : "movies"
    };

    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = (models) =>{

        Movie.belongsTo(models.genders,{
            as : "gender",
            foreignKey : "genderId",
        })

        Movie.belongsToMany(models.characters,{
            as : "characters",
            through : "characterMovie",
            foreignKey : "movieId",
            otherKey : "characterId"
        })
    }

    return Movie
}