import { ReactElement } from "react";

import FilterComponent from "@/components/filterComponent/filterComponent.component";
import DoctorsComponent from "@/components/doctorsComponent/doctorsComponent.component";
import GlobalSearchBoxComponent from "@/components/global-search-box/globalSearchBoxComponent";
import FiltersProvider from "@/providers/filters.provider";
import DoctorsProvider from "@/providers/doctorsProvider";
import { doctorData } from "@/constants/doctors";
import { SearchParams } from "@/types/types";
import { generateDefaultFilters } from "@/utils/utils";

import styles from "./page.module.css";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({
  searchParams,
}: Props): Promise<ReactElement> {
  const defaultFilters = generateDefaultFilters(await searchParams);
  return (
    <FiltersProvider defaultFilters={defaultFilters}>
      <DoctorsProvider doctors={doctorData}>
        <div className={styles.search}>
          <GlobalSearchBoxComponent />
          <div className={styles.container}>
            <div className={styles.filters}>
              <FilterComponent />
            </div>
            <div className={styles.results}>
              <DoctorsComponent />
            </div>
          </div>
        </div>
      </DoctorsProvider>
    </FiltersProvider>
  );
}
