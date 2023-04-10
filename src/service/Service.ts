// axios
import axios, { AxiosInstance, AxiosResponse } from "axios";

// router
import { getToken, getSpotifyAuthUrl, removeAuthToken } from "../utils/auth";

export default class Service {
  service: AxiosInstance;

  constructor({ baseURL = "https://api.spotify.com/v1/" } = {}) {
    this.service = axios.create({
      baseURL,
    });

    this.service.interceptors.request.use(
      Service.handleRequest,
      Service.handleRequestError
    );

    this.service.interceptors.response.use(
      Service.handleResponse,
      Service.handleResponseError
    );
  }

  static handleRequest(request: any) {
    const accessToken = getToken();

    if (!accessToken) {
      // accessToken 없으면 - authUrl로 redirect
      window.location.replace(getSpotifyAuthUrl());
    }

    // accessToken 있으면 - 헤더에 토큰 실어서 보냄
    request.headers.Authorization = "Bearer " + accessToken;
    return request;
  }

  static handleRequestError(error: any) {
    return Promise.reject(error);
  }

  static handleResponse<T>(response: AxiosResponse<T>) {
    return response.data;
  }

  static handleResponseError(error: any) {
    switch (error.response.status) {
      case 404:
        window.location.replace("/404");
        break;
      case 401: // 리소스 접근 자격 없음 (Unauthorized)
        removeAuthToken(); // localStorage 토큰정보 제거
        window.location.replace(getSpotifyAuthUrl()); // 다시 인증페이지로 이동
        break;
      case 403: // 클라이언트에서 유효한 URL에 액세스하는 것이 금지됨 -> 계정이 Developer에 등록되지 않음
        removeAuthToken();
        window.location.replace(getSpotifyAuthUrl()); // 다시 인증페이지로 이동
        break;
      default:
        return Promise.reject(error);
    }
  }
}
