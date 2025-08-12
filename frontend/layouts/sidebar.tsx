import TitleSidebar from "@/components/sidebar/title"
import ContentSidebar from "@/components/sidebar/content"
import styles from "@/styles/layouts/sidebar.module.css";

export default function SidebarLayout(){
    return(
        <div className={styles.background}>
            <div>
                <TitleSidebar/>
                <ContentSidebar/>
            </div>
        </div>
    )
}