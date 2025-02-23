import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { Asset } from './asset.entity';

export type AssetDailyDocument = HydratedDocument<AssetDaily>;

@Schema({ timestamps: true })
export class AssetDaily {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.String, ref: Asset.name })
  asset: Asset | string;

  @Prop()
  date: Date;

  @Prop()
  price: number;

  createdAt!: Date;
  updatedAt!: Date;
}

export const AssetDailySchema = SchemaFactory.createForClass(AssetDaily);
