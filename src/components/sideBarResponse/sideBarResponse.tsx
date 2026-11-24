import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import styles from "./sideBarResponse.module.css";

export default function SideBarResponse() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSquare}></div>

      <div className={styles.rightSquare}></div>
    </div>
  );
}