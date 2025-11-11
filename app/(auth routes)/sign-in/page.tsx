"use client"

import { useState } from "react";
import css from "./SignInPage.module.css"
import { useRouter } from "next/navigation";
import { RegisterData } from "@/lib/api/api";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignIn() {
    const [error, setError] = useState('');
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser)
    const handleSubmit = async (formdata: FormData) => {
      // try {
        const userdata = Object.fromEntries(formdata) as unknown as RegisterData;
        const res = await login(userdata);
      console.log(res);
      if (res) {
        setUser(res)
        router.push('/profile');
      }
        
      //   if (res) {
      //     setUser(res)
      //     router.push('/profile');
      //   } else {
      //     setError('Invalid email or password');
      //   }
      // } catch  {
      //   setError(
      //     'Oops... some error'
      //   )
      // }
  
    }
  return (<main className={css.mainContent}>
    <form className={css.form} action={handleSubmit}>
      <h1 className={css.formTitle}>Sign in</h1>

      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" className={css.input} required />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" className={css.input} required />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>
      {error && <p className={css.error}>{error}</p>}
    </form>
  </main>)
}