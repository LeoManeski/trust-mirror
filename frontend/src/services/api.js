import axios from 'axios'

const API_BASE_URL = '/api'

export const api = {
  getScenarios: () => axios.get(`${API_BASE_URL}/scenarios`),
  getScenario: (id) => axios.get(`${API_BASE_URL}/scenarios/${id}`),
  getScenariosByType: (type) => axios.get(`${API_BASE_URL}/scenarios/type/${type}`),
  getScenariosByCategory: (category) => axios.get(`${API_BASE_URL}/scenarios/category/${category}`),
  
  submitAttempt: (attempt) => axios.post(`${API_BASE_URL}/attempts`, attempt),
  getMyAttempts: () => axios.get(`${API_BASE_URL}/attempts/my-attempts`),
  
  getMyProfile: () => axios.get(`${API_BASE_URL}/vulnerability/my-profile`),
  
  getStudentProgress: () => axios.get(`${API_BASE_URL}/teacher/students`)
}
