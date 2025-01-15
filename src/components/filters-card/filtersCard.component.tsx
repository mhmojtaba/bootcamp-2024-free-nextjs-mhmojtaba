"use client";

import { ReactElement, useMemo } from "react";

import CardComponent from "@/components/card/card.component";
import { FiltersType } from "@/types/types";
import { useFilters } from "@/providers/filters.provider";

import styles from "./filtersCard.module.css";

export default function FiltersCardComponent(): ReactElement | null {
  const { filters, dispatch } = useFilters();

  const isEmpty = useMemo(() => {
    return (
      !filters.query &&
      !filters.expertise &&
      !filters.gender &&
      !filters.degree &&
      !filters.selectedBadges?.length
    );
  }, [filters]);

  const removeAllButtonClickHandler = (): void => {
    dispatch({ type: "removed_all" });
  };

  const filterClickHandler = (key: keyof FiltersType): void => {
    dispatch({ type: "removed_filter", key });
  };

  if (isEmpty) {
    return null;
  }

  return (
    <CardComponent>
      <div className={styles["filters-summary"]}>
        <div className={styles.title}>فیلترهای انتخاب‌شده</div>

        <button type="button" onClick={removeAllButtonClickHandler}>
          حذف همه
        </button>

        <ul className={styles.filters}>
          {filters.query && (
            <li onClick={() => filterClickHandler("query")}>{filters.query}</li>
          )}
          {filters.expertise && (
            <li onClick={() => filterClickHandler("expertise")}>
              {filters.expertise}
            </li>
          )}
          {filters.gender && (
            <li onClick={() => filterClickHandler("gender")}>
              {filters.gender}
            </li>
          )}
          {filters.degree && (
            <li onClick={() => filterClickHandler("degree")}>
              {filters.degree}
            </li>
          )}
          {filters.selectedBadges?.length &&
            filters.selectedBadges.map((badge) => (
              <li
                onClick={() => filterClickHandler("selectedBadges")}
                key={badge}
              >
                {badge}
              </li>
            ))}
        </ul>
      </div>
    </CardComponent>
  );
}
