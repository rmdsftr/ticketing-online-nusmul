import Image from "next/image";
import { poppins } from "@/components/fonts/poppins";
import logo from "@/assets/images/logo-nusmul.png";
import styles from "@/styles/components/sidebar.module.css";

export default function TitleSidebar(){
    return(
        <div className={`${poppins.variable} ${styles.align}`}>
            <Image
                src={logo}
                alt="logo nusmul"
                width={30}
                height={30}
            />
            <h5>NUSA <span>MULYA</span></h5>
        </div>
    )
}