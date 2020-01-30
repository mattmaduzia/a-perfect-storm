import { TopCountySummary } from "../types/weather";
import { TopCounties } from "../types/counties";
import { useEffect } from "react";

/**
 * Filters the top county list based on a search string
 * @param topCounties
 * @param setFiltered
 * @param search
 */
export function useSearch({ type, period, sortAsc, summary}: TopCounties, setFiltered: Function, search: string = "") {
  useEffect(() => {
    const searchAsInt = parseInt(search);
    const searchAsFloat = parseFloat(search);
    const filtered = summary.filter((value: TopCountySummary) => {
      return value.name.toLowerCase()
        .indexOf(search) > -1 || value.value === searchAsFloat || value.rank === searchAsInt;
    });
    setFiltered(filtered);
  }, [type, period, sortAsc, search, summary, setFiltered]);
}
