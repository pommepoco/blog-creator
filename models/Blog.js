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

  // TODO: not use yet, but could be great to have a global basicUserInfoSchema
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
      subDomain: {
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