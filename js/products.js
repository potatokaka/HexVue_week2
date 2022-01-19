import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "filter117",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          this.getProducts();
        })
        .catch((error) => {
          console.log(error.response.data);
          window.location = "index.html";
        });
    },
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    renderProdutDetail(item) {
      this.tempProduct = item;
      console.log(this.tempProduct);
    },
  },
  mounted() {
    // 取得 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    axios.defaults.headers.common.Authorization = token;

    // 檢查是否登入
    this.checkLogin();
  },
});

app.mount("#app");
