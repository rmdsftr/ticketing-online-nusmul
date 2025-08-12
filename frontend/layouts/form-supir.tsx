import { Input } from "@/components/input/input";
import { Dropdown } from "@/components/dropdown/dropdown";
import { Button } from "@/components/button/button";
import { StatusSupirOptions } from "@/utils/options";
import styles from "@/styles/layouts/form-supir.module.css";
import { BiChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";
import { FileUpload } from "@/components/input/foto";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddDriver } from "@/services/driver";
import { GetDriverInterface } from "@/types/driver";
import { UpdateDriver } from "@/services/driver";

interface Props{
    isOpen:boolean;
    onClose:() => void;
    onConfirm: (message:string, type: "success" | "error") => void;
    selectedDriver?: GetDriverInterface | null;
    onUpdateDriver?: (updatedDriver: GetDriverInterface) => void;
    isEdit?:boolean;
}

export default function FormSupirLayout({isOpen, onClose, onConfirm, selectedDriver=null, onUpdateDriver, isEdit}: Props){
    if(!isOpen) return null;

    const [fullname, setFullname] = useState("");
    const [nohp, setNohp] = useState("");
    const [status, setStatus] = useState<{label:string, value:string} | null>(
        selectedDriver
        ? {label: selectedDriver.driver_status, value: selectedDriver.driver_status}
        : null
    );
    const [foto, setFoto] = useState<File | undefined>();
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFullname(selectedDriver?.fullname || "");
        setNohp(selectedDriver?.phone_number || "");
        setStatus(selectedDriver 
            ? {label:selectedDriver.driver_status, value:selectedDriver.driver_status}
            :null
        )
        setFoto(undefined)
    }, [selectedDriver])

    const router = useRouter();

    const handleAddDriver = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res;
            if(selectedDriver?.driver_id){
                res = await UpdateDriver(selectedDriver.driver_id, {
                    fullname,
                    phone_number: nohp,
                    driver_status: status?.value || ""
                })
                onConfirm(res.message || "Berhasil mengupdate data supir", "success");
            } else {
                res = await AddDriver({
                    fullname,
                    phone_number: nohp,
                    driver_status: status?.value || "",
                    photo: foto
                })
                onConfirm(res.message || "Berhasil menambahkan supir", "success");
            }

            if(onUpdateDriver && res.data){
                onUpdateDriver(res.data)
            }
            
        } catch (error: any) {
            const errMsg = error?.response?.data?.message || error.message || "Gagal menambahkan supir baru";
            onConfirm(errMsg, "error");
        } finally{
            setLoading(false);
        }
    }

    return(
        <div className={styles.background}>
            <motion.div 
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25
                }}
                className={styles.container}
            >
                <form onSubmit={handleAddDriver}>
                    <Input
                        placeholder="Nama Supir"
                        variant="outline"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />
                    <br />
                    <Input
                        placeholder="No. Hp"
                        variant="outline"
                        value={nohp}
                        onChange={(e) => setNohp(e.target.value)}
                        required
                    />
                    <br />
                    <Dropdown
                        placeholder="Status supir"
                        options={StatusSupirOptions}
                        className={styles.dropdown}
                        customSize="md"
                        iconRight={<BiChevronDown size={15} color="black"/>}
                        onChange={(val) => setStatus({label: val.target.value, value: val.target.value})}
                        value={status?.value || ""}
                        required
                    />
                    {!isEdit &&
                        <div className={styles.foto}>
                            <FileUpload 
                                browseText="Upload foto supir"
                                onFileSelect={(file) => setFoto(file?.[0])}
                            />
                        </div>
                    }
                    <div className={styles.btn}>
                        <Button 
                            className={styles.tmbl} 
                            variant="outline" 
                            color="primary" 
                            size="sm" 
                            type="button" 
                            onClick={onClose}>Batal</Button>
                        <Button 
                            className={styles.tmbl} 
                            variant="solid" 
                            color="primary" 
                            size="sm" 
                            type="submit" 
                            disabled={loading}> {loading ? "Menyimpan..." : "Simpan"}
                            </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}