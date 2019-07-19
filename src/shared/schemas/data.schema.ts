import * as mongoose from 'mongoose';

export const dataSchema = new mongoose.Schema({
  type: String,
  date: String,
  borne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bornes',
  },
  plastique: Number,
  metal: Number,
});
