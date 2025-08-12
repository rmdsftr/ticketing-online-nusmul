"use client";

import SidebarLayout from "@/layouts/sidebar";
import styles from "@/styles/pages/dashboard.module.css";
import styling from "@/styles/pages/supir.module.css";
import Navbar from "@/layouts/navbar";
import Subnavbar from "@/layouts/subnavbar";
import Table from "@/components/table/table";
import Pagination from "@/components/pagination/pagination";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupDeleteLayout from "@/layouts/popup-delete";
import { FaPen, FaTrash } from "react-icons/fa";
import { Button } from "@/components/button/button";
import FormSupirLayout from "@/layouts/form-supir";
import PopupAlert from "@/layouts/popup-alert";
import { GetDriverInterface } from "@/types/driver";
import { GetDriver } from "@/services/driver";
import { headers } from "@/libs/table-dummy";
import { DeleteDriver } from "@/services/driver";

export default function SupirPage() {
  const [page, setPage] = useState(1);
  const rowPerPage = 10;

  const [drivers, setDrivers] = useState<GetDriverInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pindahkan perhitungan pagination setelah drivers state
  const totalPage = Math.ceil(drivers.length / rowPerPage);
  const startIndex = (page - 1) * rowPerPage;
  const currentData = drivers.slice(startIndex, startIndex + rowPerPage);

  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true);
      setError(null);

      try {
        const res = await GetDriver();
        // Type assertion untuk mengatasi TypeScript error
        if (Array.isArray(res)) {
          setDrivers(res);
        } else if (res && typeof res === 'object') {
          setDrivers((res as any).data || []);
        } else {
          setDrivers([]);
        }
      } catch (error: any) {
        setError(error?.message || "Terjadi kesalahan saat mengambil data");
      } finally {
        setLoading(false);
      }
    }

    fetchDrivers();
  }, []); // Tambahkan dependency array kosong agar hanya run sekali

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupFormOpen, setPopupFormOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const [alert, setAlert] = useState<{message: string, type: "success" | "error"} | null>(null);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({message, type});
  };

  // Handler untuk edit driver
  const handleEdit = (driverId: string) => {
    setSelectedDriverId(driverId);
    setPopupFormOpen(true);
  };

  const handleDelete = (driverId: string) => {
    setSelectedDriverId(driverId);
    setPopupOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedDriverId) {
      try {
        const res = await DeleteDriver(selectedDriverId);
        const refreshed = await GetDriver();
        if (Array.isArray(refreshed)) {
          setDrivers(refreshed);
        } else if (refreshed && typeof refreshed === 'object') {
          setDrivers((refreshed as any).data || []);
        } else {
          setDrivers([]);
        }

        showAlert(res.message || "Data supir berhasil dihapus", "success");
      } catch (error: any) {
        showAlert(error?.message || "Gagal menghapus data", "error");
      }
    }
    setPopupOpen(false);
    setSelectedDriverId(null);
  };


  const tableData = currentData.map(driver => [
    driver.fullname,
    driver.phone_number,
    driver.driver_status,
    driver.average_ratings || "-",
    driver.total_reviews || "-"
  ])

  if (loading) {
    return (
      <div className={styles.background}>
        <div className={styles.sticky}>
          <SidebarLayout />
        </div>
        <div className={styling.tes}>
          <Navbar />
          <div className={styling.main}>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.background}>
        <div className={styles.sticky}>
          <SidebarLayout />
        </div>
        <div className={styling.tes}>
          <Navbar />
          <div className={styling.main}>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.background}>
      <div className={styles.sticky}>
        <SidebarLayout />
      </div>
      <div className={styling.tes}>
        <Navbar />

        <motion.div
          className={styling.main}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Subnavbar 
            jumlah={drivers.length} 
            open={() => {
              setSelectedDriverId(null); // Reset selected driver untuk form tambah baru
              setPopupFormOpen(true);
            }}
          />
        </motion.div>

        <div className={styling.tabel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Table 
                headers={headers} 
                data={tableData}
                aksi1={(i) => (
                  <div className={styling.aksi}>
                    <Button 
                      onClick={() => handleEdit(currentData[i].driver_id)} 
                      color="tersier" 
                      size="sm"
                    >
                      <FaPen size={10} />
                    </Button>
                  </div>
                )}
                aksi2={(i) => (
                  <div className={styling.aksi}>
                    <Button 
                      onClick={() => handleDelete(currentData[i].driver_id)} 
                      color="danger" 
                      size="sm"
                    >
                      <FaTrash size={10} />
                    </Button>
                  </div>
                )}
              />

            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <Pagination
            currentPage={page}
            totalPages={totalPage}
            onPageChange={setPage}
          />
        </div>

        <AnimatePresence>
          {isPopupOpen && (
            <PopupDeleteLayout
              message="Yakin ingin menghapus data supir?"
              cancel="Batal"
              confirm="Ya, Hapus"
              isOpen={isPopupOpen}
              onClose={() => {
                setPopupOpen(false);
                setSelectedDriverId(null);
              }}
              onConfirm={confirmDelete}
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {isPopupFormOpen && (
            <FormSupirLayout
              isOpen={isPopupFormOpen}
              isEdit={selectedDriverId !== null}
              onClose={() => {
                setPopupFormOpen(false);
                setSelectedDriverId(null);
              }}
              selectedDriver={drivers.find((d) => d.driver_id === selectedDriverId) || null}
              onConfirm={async (msg, type) => {
                setPopupFormOpen(false);
                setSelectedDriverId(null);
                showAlert(msg, type);
                
                // Refresh data setelah form submit
                if (type === "success") {
                  try {
                    const res = await GetDriver();
                    if (Array.isArray(res)) {
                      setDrivers(res);
                    } else if (res && typeof res === 'object') {
                      setDrivers((res as any).data || []);
                    } else {
                      setDrivers([]);
                    }
                  } catch (error) {
                    console.error("Error refreshing data:", error);
                  }
                }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {alert && (
            <PopupAlert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)} 
            />
          )}
        </AnimatePresence>  
      </div>
    </div>
  );
}