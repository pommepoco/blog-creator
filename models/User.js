module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
            /*
            **	USER
            */
            "username": {
                type: String,
                required: true,
                index: { unique: true }
            },
            "name": {
                type: String,
                required: true
            },
            "firstname": {
                type: String,
                required: true
            },
            "password": {
                type: String,
                required: true
            },
            "address": {
                "street": {
                    type: String,
                    required: false
                },
                'town': {
                    type: String,
                    required: false
                },
                "country": {
                    type: String,
                    required: false
                }
            },
            "email": {
                type: String,
                required: true
            },
            "admin": {
                type: Boolean,
                default: false
            },
            "activ": {
                type: Boolean,
                default: true
            },
            "authentificated": {
                type: Boolean,
                default: true
            },
            "blogs": [
              {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Blog'
            }]
        }
    );
    return mongoose.model('User', schema);
};