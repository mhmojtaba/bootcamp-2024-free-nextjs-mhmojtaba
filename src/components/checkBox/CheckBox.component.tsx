"use client";
import React from "react";
import { useFilters } from "@/providers/filters.provider";

import styles from "./checkbox.module.css";

type CheckBoxProps = {
  label: string;
  value: string;
};

function CheckBoxComponent({ label, value }: CheckBoxProps) {
  const { filters, dispatch } = useFilters();

  const handleCheckboxChange = (badge: string) => {
    const selectedBadges = filters.selectedBadges || [];

    const isSelected = selectedBadges.includes(badge);
    const updatedBadges = isSelected
      ? selectedBadges.filter((b) => b !== badge) // Remove badge
      : [...selectedBadges, badge]; // Add badge

    dispatch({
      type: "updated_filter",
      key: "selectedBadges",
      value: updatedBadges,
    });
  };

  return (
    <div className={styles.container}>
      <label htmlFor={value} className={styles.mainLabel}>
        {label}
      </label>
      <div className={styles["checkbox-wrapper"]}>
        <input
          className={`${styles["tgl"]} ${styles["tgl-flat"]}`}
          id={value}
          checked={filters.selectedBadges?.includes(value) || false}
          type="checkbox"
          onChange={() => handleCheckboxChange(value)}
        />
        <label className={styles["tgl-btn"]} htmlFor={value}></label>
      </div>
    </div>
  );
}

export default CheckBoxComponent;
