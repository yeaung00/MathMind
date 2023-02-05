import axios from "axios";

const url = 'http://169.233.206.193:3001/api/users';
//http://localhost:3001/api/users/me/courses
let token = '';
const config = {
  headers: { Authorization: '' }
}
const setToken = newToken => {
  token = `bearer ${newToken}`
  config.headers.Authorization = token;
}
const getConfig = () => {
  return config;
}
const getAllCourses = async username => {
  const { data } = await axios.get(`${url}/${username}`);
  //console.log('data', data)
  return data.courses;
}
const postCourse = async (courseName, username) => {
  const { data } = await axios.post(`${url}/${username}/courses`, { courseName }, config);
  return data;
}
const getAllAssignments = async username => {
  const { data } = await axios.get(`${url}/${username}`);
  return data.assignments;
}
const userServices = {
  postCourse,
  setToken,
  getAllCourses,
  getConfig,
  getAllAssignments
}

export default userServices;