import Image from "next/image";
import warn from "@/assets/icons/warning-delete.png";
import { motion } from 'framer-motion';
import styles from "@/styles/layouts/popup-delete.module.css";
import { Button } from "@/components/button/button";
import { poppins } from "@/components/fonts/poppins";

interface Props{
    message:string;
    cancel:string;
    confirm:string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function PopupDeleteLayout({ message, cancel, confirm, isOpen, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
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
                className={`${poppins.variable} ${styles.container}`}
            >
                <Image src={warn} alt="" height={60} />
                <p className={styles.pesan}>{message}</p>
                <div className={styles.btn}>
                    <Button variant="outline" color="danger" size="sm" onClick={onClose} type="button">{cancel}</Button>
                    <Button variant="solid" color="danger" size="sm" onClick={onConfirm} type="submit">{confirm}</Button>
                </div>
            </motion.div>
        </div>
    );
}
