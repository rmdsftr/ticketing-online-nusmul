import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddTravelType{
    @IsNotEmpty()
    @IsString()
    travel_type:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsNumber()
    normal_price:number;

    @IsNotEmpty()
    @IsNumber()
    max_passengers:number;

    @IsNotEmpty()
    @IsNumber()
    total_cars:number;
}