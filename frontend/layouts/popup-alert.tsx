import Image from "next/image";
import success from "@/assets/icons/success-alert.png";
import failed from "@/assets/icons/error-alert.png";
import { useEffect } from "react";
import styles from "@/styles/layouts/popup-alert.module.css";
import { poppins } from "@/components/fonts/poppins";
import { motion } from "framer-motion";

interface Props{
    message:string;
    type: 'success' | 'error';
    onClose:() => void;
    duration?:number;
}

export default function PopupAlert({message, type, onClose, duration=2000}: Props){
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const renderContent = () => (
        <motion.div 
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 25
            }}
            className={styles.background}
        >
            <div className={`${poppins.variable} ${styles.container}`}>
                <Image
                    src={type === 'success' ? success : failed}
                    alt={type === 'success' ? 'Success' : 'Error'}
                    height={60}
                />
                <p className={styles.pesan}>{message}</p>
            </div>
        </motion.div>
    );

    return renderContent();
}