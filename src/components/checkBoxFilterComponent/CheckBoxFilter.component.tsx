import React from "react";

import CheckBoxComponent from "../checkBox/CheckBox.component";
import { filterItems } from "@/constants/constants";
import CardComponent from "../card/card.component";

import styles from "./checkBoxFilter.module.css";

function CheckBoxFilterComponent() {
  return (
    <CardComponent>
      {filterItems.map((item, index) => (
        <div className={styles.option} key={index}>
          <CheckBoxComponent label={item.label} value={item.value} />
        </div>
      ))}
    </CardComponent>
  );
}

export default CheckBoxFilterComponent;
