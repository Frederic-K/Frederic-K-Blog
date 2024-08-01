// Axios
import axios from "axios"
// Redux
import { clearUser } from "../../../services/slices/userSlice"

export const handleSignout = async (dispatch) => {
  try {
    await axios.post("/api/user/signout")
    dispatch(clearUser())
  } catch (error) {
    console.error(error.message)
  }
}
