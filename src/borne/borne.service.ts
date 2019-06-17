import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Borne } from './interfaces/borne.interface';
import { CreateBorneDto } from './dto/create-borne.dto';
import { UpdateBorneDto } from './dto/update-borne.dto';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class BorneService {
  private readonly authService: AuthService;

  constructor(
    @InjectModel('bornes')
    private readonly borneModel: Model<Borne>,
  ) {
  }

  async findAll(): Promise<Borne[]> {
    return await this.borneModel.find();
  }

  async findOne(id: string): Promise<Borne> {
    const borne = await this.borneModel.findOne({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  async create(borneData: CreateBorneDto): Promise<Borne> {
    const bornes = new (this.borneModel)(borneData);
    return await bornes.save();
  }

  async update(id: string, borneData: UpdateBorneDto): Promise<Borne> {
    const borne = await this.borneModel.findByIdAndUpdate(id, borneData);
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

  async delete(id: string): Promise<Borne> {
    // recupere les valeur de la personne connecter et verifier son role avant de suprimer
    // console.log(this.validate({ email: 'mame@gmail.com', password: 'mamemame' }));
    // if (user.role === 'ADMINISTRATEUR') {}
    // console.log(this.authService.validateUser(
    // { email: 'mame@gmail.com', password: 'mamemame' }));
    const borne = await this.borneModel.findByIdAndRemove({ _id: new ObjectId(id) });
    if (!borne) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return borne;
  }

}
