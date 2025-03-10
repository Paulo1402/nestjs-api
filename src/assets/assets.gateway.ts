import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AssetsService } from './assets.service';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { AssetPresenter } from './asset.presenter';
import { AssetDailiesService } from './asset-dailies.service';
import { AssetDailyPresenter } from './asset-dailies.presenter';

@WebSocketGateway({
  cors: true,
})
export class AssetsGateway implements OnGatewayInit {
  constructor(
    private assetsService: AssetsService,
    private assetsDailiesService: AssetDailiesService,
  ) {}

  logger = new Logger(AssetsGateway.name);

  afterInit(server: Server) {
    this.assetsService.subscribeNewPriceChangedEvents().subscribe((asset) => {
      console.log(asset);
      server
        .to(asset.symbol)
        .emit('assets/priceChanged', new AssetPresenter(asset).toJSON());
    });

    this.assetsDailiesService
      .subscribeCreatedEvents()
      .subscribe((assetDaily) => {
        server
          .to(assetDaily.asset.symbol)
          .emit(
            'assets/dailyCreated',
            new AssetDailyPresenter(assetDaily).toJSON(),
          );
      });
  }

  @SubscribeMessage('joinAssets')
  handleJoinAssets(client: any, payload: { symbols: string[] }) {
    if (payload.symbols?.length === 0) {
      return;
    }

    payload.symbols.forEach((symbol) => {
      client.join(symbol);
    });
    this.logger.log(
      `Client ${client.id} joined asset: ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('joinAsset')
  handleJoinAsset(client: any, payload: { symbol: string }) {
    client.join(payload.symbol);
    this.logger.log(`Client ${client.id} joined asset: ${payload.symbol}`);
  }

  @SubscribeMessage('leaveAssets')
  handleLeaveAssets(client: any, payload: { symbols: string[] }) {
    if (payload.symbols?.length === 0) {
      return;
    }

    payload.symbols.forEach((symbol) => {
      client.leave(symbol);
    });
    this.logger.log(
      `Client ${client.id} left asset: ${payload.symbols.join(', ')}`,
    );
  }

  @SubscribeMessage('leaveAsset')
  handleLeaveAsset(client: any, payload: { symbol: string }) {
    client.leave('assets');
    this.logger.log(`Client ${client.id} left asset: ${payload.symbol}`);
  }
}
