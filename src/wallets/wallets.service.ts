import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from './entities/wallet.entity';
import { Model } from 'mongoose';
import { WalletAsset } from './entities/waller-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private walletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.walletSchema.create(createWalletDto);
  }

  findAll() {
    return this.walletSchema.find().exec();
  }

  findOne(id: string) {
    return this.walletSchema.findById(id).exec();
  }

  createWalletAsset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    return this.walletAssetSchema.create({
      wallet: data.walletId,
      asset: data.assetId,
      shares: data.shares,
    });
  }
}
