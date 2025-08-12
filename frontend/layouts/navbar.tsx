import SearchInput from "@/components/input/search"
import styles from "@/styles/layouts/navbar.module.css";
import ProfilSidebar from "@/components/sidebar/profil";
import img from "@/assets/images/profilempty.png"
import Link from "next/link";
import { FaBell } from "react-icons/fa";

export default function Navbar(){
    return(
        <div className={styles.layoutsupir}>
            <div className={styles.cari}>
                <SearchInput placeholder="Pencarian"/>
            </div>
            <div className={styles.right}>
                <Link href={""}>
                    <FaBell size={20} color="black"/>
                </Link>
                <ProfilSidebar foto={img} name="Admin"/>
            </div>
        </div>
    )
}