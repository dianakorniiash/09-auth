import axios from "axios";
import type { FormValues, Note, User } from "../../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}
const api = axios.create({
  // baseURL: "https://notehub-api.goit.study",
  // baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  baseURL:  "http://localhost:3000//api",
  
  withCredentials: true,
});
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

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(
    `/notes/${id}`,

  );

  return response.data;
};
export interface RegisterData {
  email: string;
  password: string;
}

export const register = async (loginData: RegisterData): Promise<User> => {
  const { data } = await api.post<User>(`/auth/register`, loginData);
  return data;
};
export interface CheckSession{
  success:boolean
}