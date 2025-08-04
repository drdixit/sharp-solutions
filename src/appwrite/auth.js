import conf from "../conf/config.js";
import { Client, Account, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  oAuth2Login() {
    this.account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:5173/login", // success URL
      "http://localhost:5173/login" // failure URL
    );
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout() :: ", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      // Silently handle expected 401 errors when user is not logged in
      return null;
    }
  }

}

const authService = new AuthService()
export default authService
