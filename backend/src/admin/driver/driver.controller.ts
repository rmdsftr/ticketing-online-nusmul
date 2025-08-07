import { Body, Controller,  Delete,  FileTypeValidator,  MaxFileSizeValidator,  Param,  ParseFilePipe,  Patch,  Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DriverService } from "./driver.service";
import { AddDriverDto } from "./dto/add-driver.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { EditDriverDto } from "./dto/edit-driver";

@Controller('driver')
export class DriverController{
    constructor(
        private readonly driverService: DriverService
    ){}

    @Post('add')
    @UseInterceptors(FileInterceptor('photo'))
    async addDriver(
        @Body() dto:AddDriverDto, 
        @UploadedFile() photo?: Express.Multer.File){
        return await this.driverService.addDriver(dto, photo);
    }

    @Patch('edit/:driver_id')
    async editDriver(@Body() dto:EditDriverDto, @Param('driver_id') driver_id:string){
        return await this.driverService.editDriver(dto, driver_id);
    }

    @Patch('edit/photo/:driver_id')
    @UseInterceptors(FileInterceptor('photo'))
    async changePhoto(
        @Param('driver_id') driver_id:string,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize:10_000_000}),
                new FileTypeValidator({fileType: 'image/jpg|image/png|image/jpeg'})
            ]
        })) photo: Express.Multer.File
    ){
        return await this.driverService.changePhoto(driver_id, photo)
    }

    @Delete('delete/:driver_id')
    async deleteDriver(@Param('driver_id') driver_id:string){
        return await this.driverService.deleteDriver(driver_id);
    }
}