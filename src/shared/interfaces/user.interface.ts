import { Document, Types } from 'mongoose';
import { Client } from './client.interface';

export interface User extends Document{
  username: string;
  email: string;
  password: string;
  role: string;
  clients: Types.DocumentArray<Client>;
}
