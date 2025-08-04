type PrivacyConsentValue = boolean | null;

interface PrivacyConsentComposable {
  setPrivacyConsent: (accepted: boolean) => void;
  getPrivacyConsent: () => PrivacyConsentValue;
  hasPrivacyConsent: () => boolean;
  isPrivacyAccepted: () => boolean;
  clearPrivacyConsent: () => void;
}

export function usePrivacyConsent(): PrivacyConsentComposable {
  const COOKIE_NAME: string = "privacy-consent";
  const COOKIE_EXPIRES_DAYS: number = 365;

  const setPrivacyConsent = (accepted: boolean): void => {
    const expires: Date = new Date();
    expires.setTime(expires.getTime() + (COOKIE_EXPIRES_DAYS * 24 * 60 * 60 * 1000));

    document.cookie = `${COOKIE_NAME}=${accepted ? "accepted" : "rejected"}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
  };

  const getPrivacyConsent = (): PrivacyConsentValue => {
    if (import.meta.server)
      return null;

    const cookies: string[] = document.cookie.split(";");
    const consentCookie: string | undefined = cookies.find((cookie: string) =>
      cookie.trim().startsWith(`${COOKIE_NAME}=`),
    );

    if (!consentCookie)
      return null;

    const value: string = consentCookie.split("=")[1]?.trim() || "";
    return value === "accepted" ? true : value === "rejected" ? false : null;
  };

  const hasPrivacyConsent = (): boolean => {
    return getPrivacyConsent() !== null;
  };

  const isPrivacyAccepted = (): boolean => {
    return getPrivacyConsent() === true;
  };

  const clearPrivacyConsent = (): void => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return {
    setPrivacyConsent,
    getPrivacyConsent,
    hasPrivacyConsent,
    isPrivacyAccepted,
    clearPrivacyConsent,
  };
}
