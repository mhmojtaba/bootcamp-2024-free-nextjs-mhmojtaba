import { DoctorModel, FiltersType, SearchParams } from "@/types/types";

export function generateDefaultFilters(
  searchParams: SearchParams,
): FiltersType {
  const { query, expertise, gender, degree, option } = searchParams;

  return {
    query: normalizeFilter(query),
    expertise: normalizeFilter(expertise),
    gender: normalizeFilter(gender),
    degree: normalizeFilter(degree),
    selectedBadges: normalizeFilterArray(option),
  };
}

export function normalizeFilterArray(
  value: string | string[] | undefined,
): string[] | undefined {
  if (Array.isArray(value)) {
    return value;
  }

  return value ? [value] : undefined;
}

export function normalizeFilter(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

// Helper function to filter doctors
export function filterDoctors(
  doctors: DoctorModel[],
  filters: FiltersType,
): DoctorModel[] {
  return doctors.filter((doctor) => isVisible(doctor, filters));
}

// Helper function to determine doctor visibility based on filters
export function isVisible(doctor: DoctorModel, filters: FiltersType): boolean {
  return (
    doesDoctorInclude(doctor, filters.query) &&
    doesInclude(doctor.expertise, filters.expertise) &&
    doesInclude(doctor.gender, filters.gender) &&
    doesInclude(doctor.degree, filters.degree) &&
    doesBadgesMatch(doctor.badges, filters.selectedBadges)
  );
}

export function doesBadgesMatch(
  badges: string[],
  selectedBadges?: string[],
): boolean {
  if (!selectedBadges || selectedBadges.length === 0) {
    return true; // No badge filter applied
  }
  return selectedBadges.some((badge) => badges.includes(badge));
}

export function doesDoctorInclude(
  doctor: DoctorModel,
  query?: string,
): boolean {
  if (!query) {
    return true;
  }

  return doesSomeInclude([doctor.name, doctor.brief, doctor.address], query);
}

export function doesSomeInclude(items: string[], query?: string): boolean {
  if (!query) {
    return true;
  }

  return items.some((item) => doesInclude(item, query));
}

export function doesInclude(item: string, query?: string): boolean {
  if (!query) {
    return true;
  }

  return item.toLowerCase().includes(query.toLowerCase());
}
