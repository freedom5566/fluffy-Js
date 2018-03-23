const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let BookInstanceSchema = new Schema(
    {
        // 書 
        book: { type: Schema.ObjectId, ref: "Book", required: true }, //reference to the associated book
        // 版本
        imprint: {type: String, required: true},        
        // 書四種狀態    
        status: {type: String, required: true, enum: ["Available", "Maintenance", "Loaned", "Reserved"], default: "Maintenance"},
        // 還書哦！ 
        due_back: {type: Date, default: Date.now}
    }
);

// Virtual for bookinstance's URL
BookInstanceSchema
    .virtual("url")
    .get(function () {
        return "/catalog/bookinstance/" + this._id;
    });

//Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);