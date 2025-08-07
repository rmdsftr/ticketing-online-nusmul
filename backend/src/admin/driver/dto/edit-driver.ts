import { IsIn, IsOptional, IsString } from "class-validator";

export class EditDriverDto{
    @IsOptional()
    @IsString()
    fullname:string;

    @IsOptional()
    @IsString()
    phone_number:string;

    @IsOptional()
    @IsString()
    @IsIn(["aktif", "cuti", "berhenti"])
    driver_status:'aktif' | 'cuti' | 'berhenti';
}