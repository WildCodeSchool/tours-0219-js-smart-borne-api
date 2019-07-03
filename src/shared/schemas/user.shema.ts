import * as mongoose from 'mongoose';
import { clientSchema } from './client.schema';

export const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  clients: [clientSchema],
},                                            {
  versionKey: false,
});
