import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AddTravelDto } from "./dto/add-travel.dto";
import { failed, success } from "../../utils/response";
import { toTitleCase } from "../../utils/typing";
import { EditTravelDto } from "./dto/edit-travel.dto";
import { getCurrentDateTime } from "../../utils/datetime";

@Injectable()
export class TravelService{
    constructor(
        private readonly prisma:PrismaService
    ){}

    async addTravel(dto:AddTravelDto){
        try {
            const cek = await this.prisma.cars.findUnique({
                where: {license_plate: dto.license_plate.replace(/\s+/g, '')}
            })

            if(cek){
                return failed("Mobil sudah pernah ditambahkan")
            }

            const cek2 = await this.prisma.travel_type.findUnique({
                where: {travel_type_id: dto.travel_type_id}
            })

            if(!cek2){
                return failed("Tipe travel tidak valid")
            }

            const newCar = await this.prisma.cars.create({
                data: {
                    license_plate: dto.license_plate.replace(/\s+/g, ''),
                    car_name: toTitleCase(dto.car_name),
                    color: dto.color,
                    car_status: dto.car_status,
                    travel_type_id: dto.travel_type_id
                }
            })

            return success("Berhasil menambahkan travel baru", newCar);
        } catch (error) {
            console.error("Kesalahan saat menambahkan travel baru :", error);
            return failed("Kesalahan saat menambahkan travel baru", error);
        }
    }

    async editTravel(dto:EditTravelDto, license_plate:string){
        try {
            const cek = await this.prisma.cars.findUnique({
                where: {license_plate: license_plate.replace(/\s+/g, '')}
            })

            if(!cek){
                return failed("Data dengan plat mobil tersebut tidak ada")
            }

            const updated = await this.prisma.cars.update({
                where: {license_plate: license_plate.replace(/\s+/g, '')},
                data: {
                    car_name: dto.car_name ? toTitleCase(dto.car_name):cek.car_name,
                    color: dto.color,
                    car_status: dto.car_status,
                    travel_type_id: dto.travel_type_id,
                    updated_at: getCurrentDateTime()
                }
            })

            return success("Berhasil mengedit data travel", updated)
        } catch (error) {
            console.error("Kesalahan saat mengupdate data travel : ", error);
            return failed("Kesalahan saat mengupdate data travel", error);
        }
    }

    async deleteTravel(license_plate:string){
        try {
            const cek = await this.prisma.cars.findUnique({
                where: {license_plate: license_plate.replace(/\s+/g, '')}
            })

            if(!cek){
                return failed("Data mobil tidak ditemukan")
            }

            await this.prisma.cars.delete({
                where: {license_plate: license_plate.replace(/\s+/g, '')}
            })

            return success("Berhasil menghapus data mobil travel")
        } catch (error) {
            console.error("Kesalahan saat menghapus data mobil : ", error);
            return failed("Kesalahan saat menghapus data mobil", error);
        }
    }
}