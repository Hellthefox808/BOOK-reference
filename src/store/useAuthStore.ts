import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "USER" | "ADMIN";
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  favorites: string[]; // Book IDs
  
  // Actions
  login: (email: string, name?: string, role?: "USER" | "ADMIN") => void;
  logout: () => void;
  toggleFavorite: (bookId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: "usr-demo",
        name: "Alexander Wright",
        email: "alexander@bookverse.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "USER",
      },
      isAuthenticated: true,
      favorites: ["book-1", "book-3", "book-11", "book-21"],

      login: (email, name = "Book Reader", role = "USER") =>
        set({
          isAuthenticated: true,
          user: {
            id: `usr-${Date.now()}`,
            name,
            email,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            role,
          },
        }),

      logout: () => set({ isAuthenticated: false, user: null }),

      toggleFavorite: (bookId) => {
        const { favorites } = get();
        if (favorites.includes(bookId)) {
          set({ favorites: favorites.filter((id) => id !== bookId) });
        } else {
          set({ favorites: [...favorites, bookId] });
        }
      },
    }),
    {
      name: "bookverse-auth-storage",
    }
  )
);
