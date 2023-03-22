import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.sfd.interview.ovckd.dev/v1",
  timeout: 1000,
  headers: {
    Authorization:
      "1251a1de9906a858d1fc697792a5f5a7065a5fe984a159b1d3c3bbea160aa39b"
  }
});

const onRequestSuccess = async (config: any) => {
  const res = await axios.get("https://api.sfd.interview.ovckd.dev/v1/ping", {
    headers:{
      Authorization:
      "1251a1de9906a858d1fc697792a5f5a7065a5fe984a159b1d3c3bbea160aa39b"
    }
  })

  if(res.status === 200){
    return config;
  }
  return Promise.reject("Ping error");
};

const onRequestError = (error:any) => {
  // Do something with request error
  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(onRequestSuccess, onRequestError);
