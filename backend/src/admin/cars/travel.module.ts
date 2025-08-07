import { Module } from "@nestjs/common";
import { TravelController } from "./travel.controller";
import { TravelService } from "./travel.service";
import { PrismaModule } from "../../prisma/prisma.controller";

@Module({
    controllers: [TravelController],
    providers: [TravelService],
    imports: [PrismaModule]
})
export class TravelModule{}