import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PlayerModule} from "./player.module";
import {MatchModule} from "./match.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: 'postgres://neondb_owner:npg_OvM8gpBkWq7C@ep-curly-queen-aew5stz7-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require',
        ssl: {
            rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true
      }),
      PlayerModule,
      MatchModule,
  ],
})
export class AppModule {}
