module.exports = function(mongoose) {

  var basicUserInfo = {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    username: {
      type: String,
      require: true
    },
    role: {
      type: Number,
      default: 0
    }
  };

  var basicUserInfoSchema = new mongoose.Schema(basicUserInfo);

  var comment = new mongoose.Schema({
    content: {
      type: String,
      require: true
    },
    author: basicUserInfo
  });

  var article = new mongoose.Schema({
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    author: basicUserInfo,
    comments: [ comment ]
  });

  var blog = new mongoose.Schema({
      name: {
        type: String,
        require: true,
        // TODO reg-ex url
        index: { unique: true }
      },
      subDomain: { // find real var name
        type: String,
        require: true,
        index: { unique: true }
      },
      articles: [ article ],
      followers:[ basicUserInfo ],
      managers: [ basicUserInfo ]
    }
  );
  return mongoose.model('blogs', blog);
};