import { createContext } from "react";

export type NoteType = {
    _id: string
    user: string
    title: string
    description: string
    tag: string
}

export type NoteContextType = {
    notes: NoteType[]
    addNote: (title: string, description: string, tag: string) => Promise<void>
    deleteNote: (id: string) => Promise<void>
    updateNote: (id: string, title: string, description: string, tag: string) => Promise<void>
    getNotes: () => Promise<void>
}

const noteContext = createContext({} as NoteContextType);
export default noteContext;
