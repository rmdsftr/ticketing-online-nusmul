import SidebarLayout from "@/layouts/sidebar";
import styles from "@/styles/pages/dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.background}>
      <SidebarLayout/>
    </div>
  );
}
