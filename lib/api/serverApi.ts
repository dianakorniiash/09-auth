import { api } from "@/app/api/api";
import { Note, User } from "@/types/note";
import { cookies } from "next/headers";
import { CheckSession, NotesHttpResponse } from "./api";


// checkSession.
export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    }
  });
  return data;
};


export const fetchNotes = async (
  topic: string,
  page: number,
  tag?: string,

): Promise<{ notes: Note[]; totalPages: number }> => {
    const cookieStore = await cookies();
  const response = await api.get<NotesHttpResponse>(
    "/notes",
    {
      params: {
        search: topic,
        perPage: 12,
        tag,
        page,
      },
    headers: {
      Cookie: cookieStore.toString(),
    }
  

    }
  );
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
     const cookieStore = await cookies();
  const response = await api.get<Note>(
    `/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    }
  }

  );

  return response.data;
};

export const checkSession = async () => {
     const cookieStore = await cookies();
  const res = await api.get<CheckSession>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    }
  })
  return res.data.success
}