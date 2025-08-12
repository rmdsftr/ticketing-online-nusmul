import { Input } from "./input";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/components/search.module.css";

interface Props{
    placeholder:string;
}

export default function SearchInput({placeholder} : Props){
    return(
        <div className={styles.width}>
            <Input
                iconRight={<FaSearch size={20} color="gray"/>}
                placeholder={placeholder}
                variant="solid"
                color="primary"
                type="search"
                className={styles.webkit}
            />
        </div>
    )
}