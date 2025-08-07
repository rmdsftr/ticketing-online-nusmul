import { Module } from "@nestjs/common";
import { TypeService } from "./type.service";
import { TypeController } from "./type.controller";
import { PrismaModule } from "../../prisma/prisma.controller";

@Module({
    providers: [TypeService],
    controllers: [TypeController],
    imports: [PrismaModule]
})
export class TypeModule{}