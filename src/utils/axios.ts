import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const accessToken: string =
  "BQDOO22x4VFb4Q2NyPS72D-XJSuOI2YeDui6A9fjTsugnGRM8XtKPhJbykKbkcOikBfIolttm-cnnauCG4dqFr-IMNZ4GzPNTGGyEwtLxjJJm8Vxe-BiFQ6mhNIumfB8HTtJ-R9bAzDo-WJNcLiiS_IDjDsDELmKvzleUZQNNNV_vWEBrJwd4_zkaQnzDmW_DtT3UGzOwNZU4GlwTDH5_4GpI9GMa0G__8HOkd3KOLxvRc8UuaVKkHRkfbIaHH4";

const instance: AxiosInstance = Axios.create({
  baseURL: "https://api.spotify.com/v1/",
});
instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

export default instance;
