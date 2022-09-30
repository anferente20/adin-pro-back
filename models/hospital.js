const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }
});

//Format JSON output
HospitalSchema.method('toJSON', function() {
    const {__v, ...object} =  this.toObject();
    return object;
})
module.exports = model( 'Hospitals', HospitalSchema);