import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class AddDriverDto{
    @IsNotEmpty()
    @IsString()
    fullname:string;

    @IsNotEmpty()
    @IsString()
    phone_number:string;

    @IsString()
    @IsIn(["aktif", "cuti", "berhenti"])
    driver_status:'aktif' | 'cuti' | 'berhenti';
}