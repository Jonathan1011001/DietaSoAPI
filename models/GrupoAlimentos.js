const { Schema, model } = require('mongoose');

const grupoAlimentosSchema = new Schema(
    {
        grupoDeAlimento: { type: String, required: true, unique: true },
        src: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

grupoAlimentosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

grupoAlimentosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = model('grupoAlimentos', grupoAlimentosSchema);
