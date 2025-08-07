import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { TravelService } from "./travel.service";
import { AddTravelDto } from "./dto/add-travel.dto";
import { EditTravelDto } from "./dto/edit-travel.dto";

@Controller('travel')
export class TravelController{
    constructor(
        private readonly travelService:TravelService
    ){}

    @Post('add')
    async addTravel(@Body() dto:AddTravelDto){
        return await this.travelService.addTravel(dto);
    }

    @Patch('edit/:license_plate')
    async editTravel(
        @Body() dto:EditTravelDto,
        @Param('license_plate') license_plate:string
    ){
        return await this.travelService.editTravel(dto, license_plate);
    }

    @Delete('delete/:license_plate')
    async deleteTravel(@Param('license_plate') license_plate:string){
        return await this.travelService.deleteTravel(license_plate);
    }
}