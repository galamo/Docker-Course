const mongoose = require("mongoose")

module.exports = async function createConnection() {
    try {
        await mongoose.connect('mongodb://localhost/');
        console.log("working")
        const Schema = mongoose.Schema;
        const ObjectId = Schema.ObjectId;

        const BlogPost = new Schema({
            author: ObjectId,
            title: String,
            body: String,
            date: Date
        });
        const Model = mongoose.model('blogs', BlogPost)
        const instance = new Model();
        instance.title = 'new title'
        instance.save(function (err) {
            console.log(err, "err")
        });

        Model.find({}, function (err, docs) {
            console.log(docs)
        });



    }
    catch (ex) {
        console.log(ex)
    }
}