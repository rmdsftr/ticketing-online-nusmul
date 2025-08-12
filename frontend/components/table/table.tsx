import styles from "@/styles/components/table.module.css";

interface TableProps {
  headers: string[];
  data: (string | number)[][];
  aksi1: (index: number) => React.ReactNode; 
  aksi2: (index: number) => React.ReactNode;  
}

export default function Table({ headers, data, aksi1, aksi2 }: TableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                {row.map((cell, j) => {
                    if (headers[j] === "Status") {
                    return (
                        <td
                        key={j}
                        className={
                            cell === "aktif"
                            ? styles.statusAktif
                            : styles.statusNonaktif
                        }
                        >
                        {cell}
                        </td>
                    );
                    }
                    return <td key={j}>{cell}</td>;
                })}
                <td className={styles.aksi}>
                    <div>{aksi1(i)}</div>
                    <div>{aksi2(i)}</div>
                </td>
                </tr>
            ))}
            </tbody>

      </table>
    </div>
  );
}
