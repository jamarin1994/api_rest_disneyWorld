

module.exports = (sequelize,dataTypes) =>{

    const alias = "characterMovie";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        characterId : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        movieId : {
            type : dataTypes.INTEGER,
            allowNull : false
        }

    };

    const config = {
        timestamps : false,
        tableName : "characterMovie"
    };

    const CharacterMovie = sequelize.define(alias,cols,config);

    return CharacterMovie
}