const API_URL = `${import.meta.env.VITE_API_URL}/api/apartments`;

const getApartmentsData = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch apartments data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching apartments data:", error);
    throw error;
  }
};

export default getApartmentsData;
