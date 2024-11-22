import getApartmentsData from "@/services";
import { useEffect, useState } from "react";

export const useApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const data = await getApartmentsData();
        setApartments(data);
      } catch {
        setError("Failed to load apartments");
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  return { apartments, loading, error };
};
