import Image, { StaticImageData } from "next/image";
import styles from "@/styles/components/sidebar.module.css";
import { poppins } from "@/components/fonts/poppins";
import { BiChevronDown } from "react-icons/bi";

interface Props{
    foto:StaticImageData;
    name:string;
}

export default function ProfilSidebar({foto, name}: Props){
    return(
        <div className={`${poppins.variable} ${styles.profil}`}>
            <Image
                src={foto}
                alt="profil picture"
                width={20}
                height={20}
            />
            <h5>{name}</h5>
            <BiChevronDown size={20} color="black"/>
        </div>
    )
}