import { DoctorModel, FiltersType } from "@/types/types";
import { filterDoctors } from "@/utils/utils";

export type Action =
  | { type: "SET_DOCTORS"; payload: DoctorModel[] }
  | { type: "SET_FILTERS"; payload: FiltersType };

type State = {
  allDoctors: DoctorModel[];
  filteredDoctors: DoctorModel[];
  filters: FiltersType;
};

export function doctorsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DOCTORS":
      return {
        ...state,
        allDoctors: action.payload,
        filteredDoctors: filterDoctors(action.payload, state.filters),
      };

    case "SET_FILTERS":
      return {
        ...state,
        filters: action.payload,
        filteredDoctors: filterDoctors(state.allDoctors, action.payload),
      };

    default:
      return state;
  }
}
