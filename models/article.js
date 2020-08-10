const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ArticleSchema = new Schema({
    title : {
        type : String ,
        required : true ,
        trim : true
    },
    abstract : {
        type : String ,
        required : true ,
        trim : true,
        maxlength : 150
    },
    article : {
        type : String
    },
    author : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
});

module.exports = Mongoose.model('Article', ArticleSchema);