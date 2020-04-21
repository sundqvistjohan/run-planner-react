import axios from "axios"

const getActivities = async () => {
  const response = await axios.get("activities")
  return response.data
}

export { getActivities }