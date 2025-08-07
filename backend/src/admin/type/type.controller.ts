import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { TypeService } from "./type.service";
import { AddTravelType } from "./dto/add-type.dto";
import { EditTravelType } from "./dto/edit-type.dto";

@Controller('travel-type')
export class TypeController{
    constructor(
        private readonly typeService:TypeService
    ){}

    @Post('add')
    async addTravelType(@Body() dto:AddTravelType){
        return await this.typeService.addTravelType(dto);
    }

    @Patch('edit/:travel_type_id')
    async editTravelType(
        @Body() dto:EditTravelType,
        @Param('travel_type_id') travel_type_id:string
    ){
        return await this.typeService.editTravelType(dto, travel_type_id);
    }

    @Delete('delete/:travel_type_id')
    async deleteType(@Param('travel_type_id') travel_type_id:string){
        return await this.typeService.deleteType(travel_type_id);
    }
}