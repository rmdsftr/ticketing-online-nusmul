import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AddTravelType } from "./dto/add-type.dto";
import { toTitleCase } from "../../utils/typing";
import { failed, success } from "../../utils/response";
import { v4 as uuidv4 } from "uuid";
import { EditTravelType } from "./dto/edit-type.dto";
import { getCurrentDateTime } from "../../utils/datetime";

@Injectable()
export class TypeService{
    constructor(
        private readonly prisma:PrismaService
    ){}

    async addTravelType(dto:AddTravelType){
        try {
            const cek = await this.prisma.travel_type.findFirst({
                where: {
                    travel_type: toTitleCase(dto.travel_type)
                }
            })

            if(cek){
                return failed("Jenis travel sudah pernah dibuat")
            }

            const newType = await this.prisma.travel_type.create({
                data: {
                    travel_type_id: uuidv4(),
                    travel_type: toTitleCase(dto.travel_type),
                    max_passengers: dto.max_passengers,
                    total_cars: dto.total_cars,
                    normal_price: dto.normal_price,
                    description: dto.description
                }
            })

            return success("Berhasil menambahkan jenis layanan travel", newType)
        } catch (error) {
            console.error("Kesalahan saat menambahkan jenis travel : ", error);
            return failed("Kesalahan saat menambahkan jenis travel baru", error);
        }
    }

    async editTravelType(dto:EditTravelType, travel_type_id:string){
        try {
            const cek = await this.prisma.travel_type.findUnique({
                where: {
                    travel_type_id: travel_type_id
                }
            })

            if(!cek){
                return failed("ID tidak valid")
            }

            const updated = await this.prisma.travel_type.update({
                where: {travel_type_id: travel_type_id},
                data: {
                    travel_type: dto.travel_type ? toTitleCase(dto.travel_type): cek.travel_type,
                    description: dto.description,
                    max_passengers: dto.max_passengers,
                    normal_price: dto.normal_price,
                    total_cars: dto.total_cars,
                    updated_at: getCurrentDateTime()
                }
            })

            return success("Berhasil mengupdate jenis layanan travel", updated);
        } catch (error) {
            console.error("Kesalahan saat mengedit jenis layanan travel : ", error);
            return failed("Kesalahan saat mengedit jenis layanan travel", error);
        }
    }

    async deleteType(travel_type_id:string){
        try {
            const cek = await this.prisma.travel_type.findUnique({
                where: {
                    travel_type_id: travel_type_id
                }
            })

            if(!cek){
                return failed("ID travel type tidak valid")
            }

            await this.prisma.travel_type.delete({
                where: {travel_type_id:travel_type_id}
            })

            return success("Berhasil menghapus data jenis layanan travel")
        } catch (error) {
            console.error("Kesalahan saat menghapus jenis layanan travel : ", error);
            return failed("Kesalahan saat menghapus jenis layanan travel", error);
        }
    }
}