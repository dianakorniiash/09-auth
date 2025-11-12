"use client";

import { getMe, updateProfile } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { isAxiosError } from "axios";
import { User } from "@/types/user";

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);


  const handleCancel = () => {
    router.push("/profile");
  };
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (formData: FormData) => {

    try {
      const username = formData.get("username") as string;

      if (user?.email) {
        console.log(username, user.email);

        await updateProfile({ email: user?.email, username: username });

 


      router.push("/profile");
}
     
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }

   



      
    
    
  }
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user?.avatar && (
          <Image
            src={user?.avatar}
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
              defaultValue={user?.username}
            />
          </div>

          <p>Email: { user?.email}</p>

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