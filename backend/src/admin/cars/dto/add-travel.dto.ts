import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class AddTravelDto{
    @IsNotEmpty()
    @IsString()
    license_plate:string;

    @IsNotEmpty()
    @IsString()
    car_name:string;

    @IsNotEmpty()
    @IsString()
    color:string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["aktif", "maintanance", "rusak"])
    car_status: 'aktif' | 'maintanance' | 'rusak';

    @IsNotEmpty()
    @IsString()
    travel_type_id:string;
}