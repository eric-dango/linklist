module.exports = {
  "development": {
    "db": {
      "mongodb": "mongodb://localhost/linklist"
    },
    "logger": {
      "api": "logs/api.log",
      "exception": "logs/exceptions.log"
    }
  },
  "test": {
    "db": {
      "mongodb": process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/linklist"
    },
    "logger": {
      "api": "logs/api.log",
      "exception": "logs/exceptions.log"
    }
  },
  "production": {
    "db": {
      "mongodb": "mongodb://localhost/linklist"
    },
    "logger": {
      "api": "logs/api.log",
      "exception": "logs/exceptions.log"
    }
  }
};
