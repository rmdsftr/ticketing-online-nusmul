import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditTravelType{
    @IsOptional()
    @IsString()
    travel_type:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    normal_price:number;

    @IsOptional()
    @IsNumber()
    max_passengers:number;

    @IsOptional()
    @IsNumber()
    total_cars:number;
}