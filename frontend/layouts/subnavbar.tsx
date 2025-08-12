import { Button } from "@/components/button/button";
import { FaPlus } from "react-icons/fa";
import { Dropdown } from "@/components/dropdown/dropdown";
import { FaFilter } from "react-icons/fa";
import styles from "@/styles/layouts/subnavbar.module.css";
import { poppins } from "@/components/fonts/poppins";
import { optionStatus } from "@/libs/status-dummy";

interface Props{
    jumlah:number;
    open: () => void;
}

export default function Subnavbar({jumlah, open}: Props){
    return(
        <div className={styles.container}>
            <div className={`${poppins.variable} ${styles.left}`}>
                <p>{jumlah} <span>supir</span></p>
                <div>
                    <Dropdown options={optionStatus} placeholder="All" customSize="sm" variant="solid" iconLeft={<FaFilter size={10} color="black"/>}></Dropdown>
                </div>
            </div>
            <div>
                <Button size="sm" iconLeft={<FaPlus size={12} color="white"/>} onClick={open}>Tambah</Button>
            </div>
        </div>
    )
}