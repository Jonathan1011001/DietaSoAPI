const Usuarios = require("../models/Usuarios");
const LactanciaUsuarios = require("../../models/DatosExtrasUsuarios/LactanciaUsuarios");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { buscarUsuario } = require("../../constants/index");

router.get("/", async (req, res) => {
  const listaDSUsuarios = await LactanciaUsuarios.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message:
        "No se encontro ninguna información de lactancia de los usuarios",
    });
  res.send(listaDSUsuarios);
});

router.get("/individual", async (req, res) => {
  try {
    const usuarioCreado = await buscarUsuario(req.query.usuario);
    console.log(usuarioCreado);

    if (!usuarioCreado) {
      return res.status(500).json({
        success: false,
        message: "El usuario no existe",
      });
    } else console.log("El usuario existe");

    try {
      const datosDeUsuario = await LactanciaUsuarios.findOne({
        usuario: req.query.usuario,
      });
      console.log(datosDeUsuario);
      if (!datosDeUsuario)
        return res.status(500).json({
          success: true,
          message: "El usuario no tiene datos de lactancia todavia",
        });

      res.send(datosDeUsuario);
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: "Ocurrio un error al guardar los datos de lactancia",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Ocurrio un error al buscar usuario",
    });
  }
});

router.post("/individual", async (req, res) => {
  try {
    const usuarioCreado = await Usuarios.findOne({
      usuario: req.query.usuario,
    });
    if (usuarioCreado) {
      const infoUsuario = await LactanciaUsuarios.findOne({
        usuario: req.query.usuario,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Datos de lactancia de Usuario ya registrados",
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message:
            "Ocurrió un error al buscar los datos de lactancia del usuario",
        });
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar al usuario",
    });
  }

  let dLactancia = new LactanciaUsuarios({
    usuario: req.query.usuario,
    horasDeSueño: req.body.horasDeSueño,
    estadoDeDescanso: req.body.estadoDeDescanso,
    despiertaPorLaNoche: req.body.despiertaPorLaNoche,
    frecuencia: req.body.frecuencia,
  });

  try {
    dLactancia = await dLactancia.save();

    if (!dLactancia)
      return res.status(400).send("No se pudieron agregar datos de lactancia");
    res.send(dLactancia);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al guardar los datos de lactancia",
    });
  }
});

router.patch("/individual", async (req, res) => {
  try {
    const existeUsuario = await buscarUsuario(req.query.usuario);
    let editarInformacionS;
    if (!existeUsuario)
      return res
        .status(500)
        .json({ success: false, message: "El usuario no existe." });

    try {
      editarInformacionS = await LactanciaUsuarios.findOneAndUpdate(
        { usuario: existeUsuario.usuario },
        {
          horasDeSueño: req.body.horasDeSueño,
          estadoDeDescanso: req.body.estadoDeDescanso,
          despiertaPorLaNoche: req.body.despiertaPorLaNoche,
          frecuencia: req.body.frecuencia,
        }
      );

      editarInformacionS = editarInformacionS
        .save()
        .then((response) => res.status(200).json({ message: "ok" }))
        .catch((err) =>
          res.status(500).json({
            success: false,
            message: "No se pudo guardar - ",
            err,
          })
        );
    } catch (err) {
      res.status(500).json({
        success: false,
        message: " Ocurrió un error al actualizar los datos de lactancia- ",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: " Ocurrió un error al buscar el usuario- ",
    });
  }
});

module.exports = router;
