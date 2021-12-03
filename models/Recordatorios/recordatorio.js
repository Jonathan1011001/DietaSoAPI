const { Schema, model } = require('mongoose');

const recordatorioModel = new Schema({

    usuarios: [{
        type: Schema.Types.ObjectId,
        ref: "InformacionUsuarios",
        required: false,
    }],
    metas: {
        type: Schema.Types.ObjectId,
        ref: "Metas",
        required: false,
    },
    titulo: {
        type: String,
        required: true,
    },
    mensaje: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: false,
    },
    expoTokens: [{
        type: String
    }
    ],
    fecha: [{
        type: Date,
    }],
    hora: [{
        type: String,
    }],
    // dias: [{ 
    //     day: {
    //         type: String,
    //         required: true,
    //     },
    //     dias: [
    //         {
    //             day: {
    //                 type: String,
    //                 required: true,
    //             },
    //             activo: {
    //                 type: Boolean,
    //                 default: false,
    //             },
    //         },
    //     ],
    //     // horario: {
    //     //     type: String,
    //     //     required: false, // Para prueba en false
    //     // },

    //     global: {
    //         type: Boolean,
    //         default: false,
    //     }
    // }],
    // horario: {
    //     type: String,
    //     required: false, // Para prueba en false
    // },

    global: {
        type: Boolean,
        default: false,
    },

}, { timestamp: true });

module.exports = model('Recordatorio', recordatorioModel);
