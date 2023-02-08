const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    appid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    }
});
const  GameDB= mongoose.models.GDBSteams || mongoose.model("GDBSteams", Schema);
mongoose.connection.close
module.exports = GameDB;
