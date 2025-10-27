/**
 * Cookie utilities for secure token storage
 */

export const cookieUtils = {
  /**
   * Set a cookie with security flags
   */
  setCookie: (name: string, value: string, days: number = 7) => {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    // Note: HttpOnly cookies can only be set from the server
    // This is a client-side cookie, but still more secure than localStorage
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${
      window.location.protocol === "https:" ? "; Secure" : ""
    }`;
  },

  /**
   * Get a cookie value
   */
  getCookie: (name: string): string | null => {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },

  /**
   * Remove a cookie
   */
  removeCookie: (name: string) => {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
