import { useAuth } from "./auth";


export function apiRequest(path: string, method: string = "GET", data: any, token: string) {
  return fetch(`${import.meta.env.VITE_REACT_API_URL}/api/v1/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === "error") {
        // Automatically signout user if accessToken is no longer valid
        if (response.code === "auth/invalid-user-token") {
		  // TODO sign out
        }
        throw CustomError(response.statusCode, response.message);
      } else {
        return response.data;
      }
    });
}

interface CustomErrorType {
	code: string;
	name: string;
	message: string;
	stack?: string | undefined;
}
// Create an Error with custom message and code
export function CustomError(code: string, message: string): CustomErrorType {
  return { ...(new Error(message)), code }
}
