module.exports = function validate(schema) {
  function check(req, res, next) {
    schema
      .validate(req.body, { abortEarly: false })
      .then(() => {
        next();
      })
      .catch((Err) => {
        console.log(Err);
        return res.status(500).send(Err.errors[0]);
      });
  }
  return check;
};
