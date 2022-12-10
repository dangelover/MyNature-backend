const { response } = require("express");
const usuariosGet = (req, res = response) => {
  const { nombre = "no name", apikey, page = 1, limit } = req.query;
  res.json({
    ok: true,
    msg: "GET API-CONTROLLER",
    nombre,
    apikey,
    page,
    limit,
  });
};
const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.json({
    ok: true,
    msg: "POST API-CONTROLLER",
    nombre,
    edad,
  });
};
const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: "PUT API-CONTROLLER",
    id,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "PATCH API-CONTROLLER",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "DELETE API-CONTROLLER",
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
