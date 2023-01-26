const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
  usuariosPut,
} = require("../controllers/usuarios");
const {
  esRolValido,
  emailExiste,
  existeUsuarioPorID,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();
router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check(
      "password",
      "El password debe ser obligatorio y mas de 6 letras"
    ).isLength({ min: 6 }),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol valido").isIn("ADMIN_ROLE"),
    check("rol").custom(esRolValido),
    validarCampos,
  ],
  usuariosPost
);
router.patch("/", usuariosPatch);
router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
