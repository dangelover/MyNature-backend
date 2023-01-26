const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const usuariosGet = async (req, res = response) => {
  // const { nombre = "no name", apikey, page = 1, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  return res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });
  //Verificar si el correo existe
  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en BD

  await usuario.save();
  res.json({
    msg: "Creado con exito",
    condicion: true,
    usuario,
  });
};
const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;
  //TODO VALIDAR CONTRA BASE DE DATOS
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    msg: "PUT API-CONTROLLER",
    usuario,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "PATCH API-CONTROLLER",
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  //Fisicamente borrado
  // const usuario = await Usuario.findByIdAndDelete(id);
  //Cambiar estado de usuario
  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false,
  });
  res.json({
    condicion: true,
    msg: "Usuario eliminado",
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
