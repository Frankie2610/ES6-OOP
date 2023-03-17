import axios from "/node_modules/axios/dist/esm/axios.min.js";
const URL = "https://63f87d376978b1f9105a7dd0.mockapi.io/Person";

function getPersonAPI(user) {
  return axios({
    method: "GET",
    url: URL,
    params: {
      userType: user || undefined,
    },
  });
}

// Lấy thông tin người dùng theo Id
function getPersonAPIByID(personId) {
  return axios({
    method: "GET",
    url: `${URL}/${personId}`,
  });
}

// Xóa thông tin người dùng khỏi server
function deletePersonAPI(personId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${personId}`,
  });
}

// Tạo thông tin người dùng mới lên server
function createPersonAPI(person) {
  return axios({
    method: "POST",
    url: URL,
    data: person,
  });
}

// Cập nhật thông tin người dùng lên server
function updatePersonAPI(person, personId) {
  return axios({
    method: "PUT",
    url: `${URL}/${personId}`,
    data: person,
  });
}
export {
  getPersonAPI,
  deletePersonAPI,
  createPersonAPI,
  getPersonAPIByID,
  updatePersonAPI,
};
