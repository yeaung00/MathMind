import axios from "axios"
const url = 'http://169.233.206.193:3001/api/courses'
const getAllCourses = async () => {
  const { data } = await axios.get(url);
  return data;
}

const courseServices = {
  getAllCourses,
}

export default courseServices;