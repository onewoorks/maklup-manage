var env = {
  development: {
    baseurl: "http://localhost/pulkam-api/"
  },
  production: {
    baseurl: "//api-ls.onewoorks-solutions.com/pulkam/"
  }
};

export const API = env.production;
