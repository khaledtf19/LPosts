const Joi = require("joi");

const postValidation = (data) => {
  const schema = Joi.object({
    postContent: Joi.string().min(1).max(300).required(),
    postTitle: Joi.string().min(1).max(100).required(),
  });

  return schema.validate(data);
};

module.exports.postValidation = postValidation;
