import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AddDriverDto } from "./dto/add-driver.dto";
import {v4 as uuidv4} from "uuid";
import { toTitleCase } from "../../utils/typing";
import { failed, success } from "../../utils/response";
import { supabase } from "../../config/supabase";
import { EditDriverDto } from "./dto/edit-driver";
import { getCurrentDateTime } from "../../utils/datetime";

@Injectable()
export class DriverService{
    constructor(
        private readonly prisma: PrismaService
    ){}

    async addDriver(dto:AddDriverDto, photo?: Express.Multer.File){
        try {
            const cek = await this.prisma.drivers.findFirst({
                where: {
                    fullname: toTitleCase(dto.fullname)
                }
            })

            if(cek){
                return failed("Supir sudah ditambahkan")
            }

            const id = uuidv4();
            let photoUrl: string | null = null;

            if(photo){
                if(photo.size > 10_000_000){
                    return failed("Ukuran foto terlalu besar (max 10 mb)")
                }

                if(!['image/jpeg', 'image/png', 'image/jpg'].includes(photo.mimetype)){
                    return failed("Format foto harus jpeg/jpg/png")
                }

                const fileExt = photo.originalname.split('.').pop()?.toLowerCase();
                const fileName = `drivers/${id}.${fileExt}`;

                try {
                    await supabase.storage
                        .from('nusmul')
                        .upload(fileName, photo.buffer, {
                            contentType: photo.mimetype,
                            upsert: false
                        })
                } catch (error) {
                    return failed("Gagal mengupload foto", error)
                }

                const { data } = supabase.storage.from('nusmul').getPublicUrl(fileName)
                photoUrl = data.publicUrl;
            }

            const newDriver = await this.prisma.drivers.create({
                data: {
                    driver_id: id,
                    fullname: toTitleCase(dto.fullname),
                    phone_number: dto.phone_number,
                    driver_status: dto.driver_status,
                    photo: photoUrl
                }
            })

            return success("Berhasil menambahkan supir baru", newDriver);
        } catch (error) {
            return failed("Terjadi kesalahan pada server", error);
        }
    }

    async editDriver(dto: EditDriverDto, driver_id:string){
        try {
            const cek = await this.prisma.drivers.findUnique({
                where: {
                    driver_id: driver_id
                }
            })

            if(!cek){
                return failed("Supir tidak ditemukan")
            }

            const changed = await this.prisma.drivers.update({
                where: {driver_id: driver_id},
                data: {
                    fullname: dto.fullname ? toTitleCase(dto.fullname):cek.fullname,
                    phone_number: dto.phone_number,
                    driver_status: dto.driver_status,
                    updated_at: getCurrentDateTime()
                }
            })

            return success("Berhasil mengupdate data supir", changed)
        } catch (error) {
            console.error(error);
            return failed("Gagal mengubah data supir" , error);
        }
    }

    async changePhoto(driver_id: string, photo: Express.Multer.File) {
        try {
            const cek = await this.prisma.drivers.findUnique({
                where: { driver_id: driver_id }
            })
            
            if (!cek) {
                return failed("Data supir tidak ditemukan")
            }

            const fileExt = photo.originalname.split('.').pop()?.toLowerCase();
            const timestamp = Date.now();
            const photoPath = `drivers/${driver_id}_${timestamp}.${fileExt}`;
            
            let newPhotoUrl: string | null = null;

            try {
                if (cek.photo) {
                    const oldPhotoPath = cek.photo.split('/').pop()?.split('?')[0];
                    if (oldPhotoPath) {
                        const { error: removeError } = await supabase.storage
                            .from('nusmul')
                            .remove([`drivers/${oldPhotoPath}`]);
                        
                        if (removeError) {
                            console.warn("Gagal menghapus foto lama:", removeError);
                        }
                    }
                }

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('nusmul')
                    .upload(photoPath, photo.buffer, {
                        contentType: photo.mimetype,
                        upsert: true 
                    });

                if (uploadError) {
                    console.error("Gagal mengupload foto ke supabase:", uploadError);
                    return failed("Gagal mengupload foto ke supabase", uploadError);
                }

                const { data: urlData } = supabase.storage
                    .from('nusmul')
                    .getPublicUrl(photoPath);
                
                newPhotoUrl = urlData.publicUrl;

            } catch (error) {
                console.error("Gagal menghapus atau mengupload foto ke supabase:", error);
                return failed("Gagal menghapus atau mengupload foto ke supabase", error);
            }

            const updated = await this.prisma.drivers.update({
                where: { driver_id: driver_id },
                data: {
                    photo: newPhotoUrl,
                    updated_at: getCurrentDateTime()
                }
            })

            return success("Berhasil mengubah foto supir", updated)
            
        } catch (error) {
            console.error("Kesalahan pada server:", error);
            return failed("Kesalahan pada server", error);
        }
    }

    async deleteDriver(driver_id:string){
        try {
            const cek = await this.prisma.drivers.findUnique({
                where: {driver_id: driver_id}
            })

            if(!cek){
                return failed("Data supir tidak ditemukan")
            }

            await this.prisma.drivers.delete({
                where: {driver_id: driver_id}
            })

            return success("Berhasil menghapus data supir")
        } catch (error) {
            console.error("Kesalahan saat menghapus data supir : ", error);
            return failed("Kesalahan saat menghapus data supir", error);
        }
    }
}