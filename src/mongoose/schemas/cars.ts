import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.UUID,
        required: true,
        unique: true
    },
    plate: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    transmission: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    manufacture: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    model: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    available: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    year: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    options: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    specs: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    deleted: {
        type: mongoose.Schema.Types.Boolean,
    }
});

CarSchema.set('toObject', { getters: true, virtuals: false });
const CarsModel = mongoose.model('Car', CarSchema, 'Cars');

export default CarsModel;