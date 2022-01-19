import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const apiUrl = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(apiUrl, this.user)
        .then((res) => {
          // console.log(res.data);
          const { token, expired } = res.data; // 使用解構的方式取得 token, expired
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(
            expired
          )};path=/`;
          //　轉址到 product 頁面
          window.location = "products.html";
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
});

app.mount("#app");
