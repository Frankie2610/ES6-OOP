import axios from "/node_modules/axios/dist/esm/axios.min.js";
const URL = "https://63f87d376978b1f9105a7dd0.mockapi.io/Person";

function getPersonAPI(user) {
  return axios({
    method: "GET",
    url: URL,
    //Thêm vào Đường link URL đoạn sau: "key = ? + Từ khóa muốn tìm kiếm"
    //Từ khóa hay obj params hỗ trợ cho việc đó, với key = userType, Từ khóa muốn tìm kiếm: user
    params: {
      //Nếu vế bên tay trái thuộc 1 trong 6 giá trị Falsy value thì sẽ lấy giá trị bên vế phải, ta gán giá trị đó undefined
      //Nếu giá trị undefined thì chương trình sẽ bỏ qua, ko thực hiện nối chuỗi
      //Những cặp key-value được khai báo trong obj params sẽ được đưa lên url theo dạng: example.com/products?key1=value1&key2=value2
      userType: user || undefined,
      // name: name || undefined,
      // key2: value2
    },
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

// Lấy thông tin người dùng theo Id
function getPersonAPIByID(personId) {
  return axios({
    method: "GET",
    url: `${URL}/${personId}`,
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

// Xóa thông tin người dùng khỏi server
function deletePersonAPI(personId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${personId}`,
  });
}

export {
  getPersonAPI,
  deletePersonAPI,
  createPersonAPI,
  getPersonAPIByID,
  updatePersonAPI,
};
