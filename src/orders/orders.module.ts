import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersGateway } from './orders.gateway';
import { OrderConsumer } from './orders.consumer';
import { Trade, TradeSchema } from './entities/trade.entity';
import { Asset, AssetSchema } from 'src/assets/entities/asset.entity';
import {
  AssetDaily,
  AssetDailySchema,
} from 'src/assets/entities/asset-daily.entity';
import { Wallet, WalletSchema } from 'src/wallets/entities/wallet.entity';
import {
  WalletAsset,
  WalletAssetSchema,
} from 'src/wallets/entities/wallet-asset.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
      {
        name: Trade.name,
        schema: TradeSchema,
      },
      {
        name: Asset.name,
        schema: AssetSchema,
      },
      {
        name: AssetDaily.name,
        schema: AssetDailySchema,
      },
      {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: WalletAsset.name,
        schema: WalletAssetSchema,
      },
    ]),
  ],
  controllers: [OrdersController, OrderConsumer],
  providers: [OrdersService, OrdersGateway],
})
export class OrdersModule {}
