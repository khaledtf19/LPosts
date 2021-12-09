const Joi = require("joi");

const commentValidation = (data) => {
  const schema = Joi.object({
    commentContent: Joi.string().min(1).required(),
    postId: Joi.any(),
  });

  return schema.validate(data);
};

module.exports.commentValidation = commentValidation;
