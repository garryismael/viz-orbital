import getApartmentsData from "@/services";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export const useApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { lastJsonMessage } = useWebSocket(
    `${import.meta.env.VITE_WS_API_URL}/api/ws/apartments`,
    {
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    try {
      setApartments(lastJsonMessage);
    } catch(e) {
      console.error(e);
      setError('Error parsing apartments data');
    }
  }, [lastJsonMessage])

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
