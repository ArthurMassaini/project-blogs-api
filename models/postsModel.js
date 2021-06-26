const definePostsModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    { timestamps: true, createdAt: 'published', updatedAt: 'updated' },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return BlogPost;
};

module.exports = definePostsModel;
