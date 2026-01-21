import axios from "axios";

export const fetchData = async (pageNo:  number) => {
  try {
    const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNo}`);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    } else if (!response.data || !response.data.data) {
      throw new Error("No data found");
    }
    
    return response.data;
  } catch (error) {
    console.log("Error fetching Data", error)
  }
}