import axios from "axios"
import userServices from './user';
const url = 'http://169.233.206.193:3001/api/assignments';
//http://localhost:3001/api/assignments/problems/63dea28786448290b9292ce5

const config = userServices.getConfig();

const postAssignment = async assignment => {
  const { data } = await axios.post(url, assignment, config);
  return data.assignments;
}
const postProblems = async (problems,id) => {
  const { data } = await axios.post(`${url}/problems/${id}`, problems);
  return data;
}
const assignmentServices = {
  postAssignment,
  postProblems,
}

export default assignmentServices;