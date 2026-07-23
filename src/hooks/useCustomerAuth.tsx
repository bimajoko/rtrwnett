import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import subscribersData from "../data/subscribers.json";
import type { Subscriber } from "../utils/types";

const SESSION_KEY = "isp_customer_session";

interface CustomerAuthValue {
  subscriber: Subscriber | null;
  error: string | null;
  login: (id: string, phone: string) => boolean;
  logout: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthValue | null>(null);

/**
 * Login pelanggan versi demo: cocokkan ID Pelanggan + 4 digit terakhir nomor HP.
 * Di production, ganti `login()` dengan pemanggilan endpoint backend yang
 * memverifikasi ke database pelanggan / sistem billing sungguhan.
 */
export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const subscribers = subscribersData as Subscriber[];

  const [subscriber, setSubscriber] = useState<Subscriber | null>(() => {
    const savedId = sessionStorage.getItem(SESSION_KEY);
    return subscribers.find((s) => s.id === savedId) ?? null;
  });
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    (id: string, phoneLast4: string) => {
      const found = subscribers.find(
        (s) => s.id.toLowerCase() === id.trim().toLowerCase() && s.phone.slice(-4) === phoneLast4.trim()
      );
      if (found) {
        sessionStorage.setItem(SESSION_KEY, found.id);
        setSubscriber(found);
        setError(null);
        return true;
      }
      setError("ID Pelanggan atau 4 digit HP tidak cocok.");
      return false;
    },
    [subscribers]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setSubscriber(null);
  }, []);

  return (
    <CustomerAuthContext.Provider value={{ subscriber, error, login, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
