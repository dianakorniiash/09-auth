


// checkSession

// updateMe

import { api } from "@/app/api/api";
import { FormValues, Note, User } from "@/types/note";
import { CheckSession, NotesHttpResponse, RegisterData } from "./api";


export const fetchNotes = async (
  topic: string,
  page: number,
  tag?: string,

): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get<NotesHttpResponse>(
    "/notes",
    {
      params: {
        search: topic,
        perPage: 12,
        tag,
        page,
      },

    }
  );
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(
    `/notes/${id}`,

  );

  return response.data;
};
export const createNote = async (note: FormValues): Promise<Note> => {
  const response = await api.post<Note>(
    `/notes`,
    note,
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(
    `/notes/${id}`,
 
  );

  return response.data;
};

export const register = async (loginData: RegisterData): Promise<User> => {
  const { data } = await api.post<User>(`/auth/register`, loginData);
  return data;
};
export const login = async (loginData: RegisterData)=> {
  const { data } = await api.post<User>(`/auth/login`, loginData);
  return data;
};



export const getMe = async (): Promise<User> => {

  const { data } = await api.get(`/users/me`);
  return data;
};
export const logout = async () => {
  const { data } = await api.post(`/auth/logout`);
  return data;
};

export const checkSession = async () => {
  const  res  = await api.get<CheckSession>("/auth/session")
  return res.data.success
}