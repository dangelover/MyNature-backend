const { validationResult } = require("express-validator");
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //si no hay errores entonces sigue con los siguientes middlewares y si no hay sigue con el controlador
  next();
};
module.exports = {
  validarCampos,
};
