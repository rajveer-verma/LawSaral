import axios from "axios";
import { auth } from "../firebase";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


API.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const token =
          await user.getIdToken();

        config.headers =
          config.headers || {};

        config.headers.Authorization =
          "Bearer " + token;

      } catch (error) {
        console.error(
          "Firebase token error:",
          error
        );
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export const saveUser = () =>
  API.post("/users/login");


export const uploadDocument = (
  formData
) =>
  API.post(
    "/documents/upload",
    formData
  );


export const getUploadHistory = () =>
  API.get("/documents/history");


export const generateDocumentSummary = (
  documentId
) =>
  API.post(
    "/documents/" +
      documentId +
      "/summary"
  );


export const deleteDocument = (
  documentId
) =>
  API.delete(
    "/documents/" +
      documentId
  );


export const chatWithDocument = (
  message,
  documentId
) =>
  API.post(
    "/chat",
    {
      message: message,
      document_id: documentId,
    }
  );


export const getDocumentChatHistory = (
  documentId
) =>
  API.get(
    "/chat/history/" +
      documentId
  );


export const analyzeDocumentRisk = (
  documentId
) =>
  API.post(
    "/risk/analyze",
    {
      document_id: documentId,
    }
  );


export const getRiskHistory = (
  documentId
) =>
  API.get(
    "/risk/history/" +
      documentId
  );


export const runAgent = (
  message,
  documentId
) =>
  API.post(
    "/agent",
    {
      message: message,
      document_id: documentId,
    }
  );


export const chatWithAI = (
  message
) =>
  API.post(
    "/general/chat",
    {
      message: message,
    }
  );


export const getGeneralChatHistory = () =>
  API.get("/general/history");


export default API;