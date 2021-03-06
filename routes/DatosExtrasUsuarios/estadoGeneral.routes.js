const Usuarios = require("../models/Usuarios");
const EstadoGeneral = require("../../models/DatosExtrasUsuarios/EstadoGeneral");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { buscarUsuario } = require("../../constants/index");

router.get("/", async (req, res) => {
  const listaDSUsuarios = await EstadoGeneral.find();

  if (listaDSUsuarios.length <= 0)
    return res.status(500).json({
      success: false,
      message:
        "No se encontro ninguna información de estado general de los usuarios",
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
      const datosDeUsuario = await EstadoGeneral.findOne({
        usuario: req.query.usuario,
      });
      console.log(datosDeUsuario);
      if (!datosDeUsuario)
        return res.status(500).json({
          success: true,
          message: "El usuario no tiene datos de estado general todavia",
        });

      res.send(datosDeUsuario);
    } catch (err) {
      return res.status(500).json({
        success: true,
        message: "Ocurrio un error al guardar los datos de estado general",
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
      const infoUsuario = await EstadoGeneral.findOne({
        usuario: req.query.usuario,
      });
      try {
        if (infoUsuario)
          return res.status(500).json({
            success: false,
            message: "Datos de estado general de Usuario ya registrados",
          });
      } catch (err) {
        return res.status(500).json({
          success: false,
          message:
            "Ocurrió un error al buscar los datos de estado general del usuario",
        });
      }
    } else console.log("El usuario no existe");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al buscar al usuario",
    });
  }

  let dEstadoGeneral = new EstadoGeneral({
    usuario: req.query.usuario,
    muchoCansancio: req.body.muchoCansancio,
    mareos: req.body.mareos,
    muchaSed: req.body.muchaSed,
    muchasGanasDeOrinar: req.body.muchasGanasDeOrinar,
    muchaHambre: req.body.muchaHambre,
    piesYmanos: req.body.piesYmanos,
    nariz: req.body.nariz,
    piel: req.body.piel,
    unas: req.body.unas,
    cabello: req.body.cabello,
    boca: req.body.boca,
    tipoDeNacimiento: req.body.tipoDeNacimiento,
  });

  try {
    dEstadoGeneral = await dEstadoGeneral.save();

    if (!dEstadoGeneral)
      return res
        .status(400)
        .send("No se pudieron agregar datos de estado general");
    res.send(dEstadoGeneral);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al guardar los datos de estado general",
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
      editarInformacionS = await EstadoGeneral.findOneAndUpdate(
        { usuario: existeUsuario.usuario },
        {
          muchoCansancio: req.body.muchoCansancio,
          mareos: req.body.mareos,
          muchaSed: req.body.muchaSed,
          muchasGanasDeOrinar: req.body.muchasGanasDeOrinar,
          muchaHambre: req.body.muchaHambre,
          piesYmanos: req.body.piesYmanos,
          nariz: req.body.nariz,
          piel: req.body.piel,
          unas: req.body.unas,
          cabello: req.body.cabello,
          boca: req.body.boca,
          tipoDeNacimiento: req.body.tipoDeNacimiento,
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
        message:
          " Ocurrió un error al actualizar los datos de estado general- ",
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
