"use client";

import { getMe, updateProfile } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfile() {
  const [user, setUserLocal] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const setAuthUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data) setUserLocal(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const username = (formData.get("username") as string) || "";
      if (!username.trim()) {
        setError("Username cannot be empty");
        return;
      }

      if (!user?.email) {
        setError("User email missing");
        return;
      }

      const updated = await updateProfile({
        email: user.email,
        username,
      });


      if (updated && typeof updated === "object") {
        setAuthUser(updated as User);
      } else {
        setAuthUser({ ...user, username });
      }

      setUserLocal((prev) => (prev ? { ...prev, username } : prev));

      router.push("/profile");
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        const msg =
          (err.response.data && (err.response.data.message ?? err.response.data.error)) ||
          "Update failed";
        setError(String(msg));
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              defaultValue={user.username}
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
