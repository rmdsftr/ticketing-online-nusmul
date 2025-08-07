import { IsIn, IsOptional, IsString } from "class-validator";

export class EditTravelDto{
    @IsOptional()
    @IsString()
    car_name:string;

    @IsOptional()
    @IsString()
    color:string;

    @IsOptional()
    @IsString()
    @IsIn(["aktif", "maintanance", "rusak"])
    car_status: 'aktif' | 'maintanance' | 'rusak';

    @IsOptional()
    @IsString()
    travel_type_id:string;
}