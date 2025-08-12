"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCalendar,
  FaUser,
  FaUserTie,
  FaCar,
  FaMoneyBill,
} from "react-icons/fa";

import styles from "@/styles/components/sidebar.module.css";
import { poppins } from "@/components/fonts/poppins";

interface HrefProps {
  icon: (color: string) => React.ReactNode;
  text: string;
  link: string;
}

function Href({ icon, text, link }: HrefProps) {
  const pathname = usePathname();
  const isActive = pathname === link;
  const [hover, setHover] = useState(false);

  const iconColor = isActive || hover ? "white" : "black";

  return (
    <div>
      <Link href={link} className={styles.linkwrap}>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={`${poppins.variable} ${styles.href} ${
            isActive ? styles.active : ""
          }`}
        >
          <div>{icon(iconColor)}</div>
          <p>{text}</p>
        </div>
      </Link>
    </div>
  );
}

export default function ContentSidebar() {
  return (
    <div>
      <Href icon={(color) => <FaHome size={15} color={color} />} text="Dashboard" link="/dashboard" />
      <Href icon={(color) => <FaCalendar size={15} color={color} />} text="Jadwal Travel" link="/jadwal" />
      <Href icon={(color) => <FaUser size={15} color={color} />} text="Pelanggan" link="/pelanggan" />
      <Href icon={(color) => <FaUserTie size={15} color={color} />} text="Supir" link="/supir" />
      <Href icon={(color) => <FaCar size={15} color={color} />} text="Armada Travel" link="/armada" />
      <Href icon={(color) => <FaMoneyBill size={15} color={color} />} text="Layanan & Harga" link="/layanan" />
    </div>
  );
}
