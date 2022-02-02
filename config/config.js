// MongoDB configs
const Configuration = {
  Port: process.env.PORT || 3000,
  db_url: process.env.dev_atlas_url,
  db_config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = Configuration;
