import { NoteContent, NoteInfo } from './models'

export type GetInvoices = () => Promise<NoteInfo[]>
export type ReadInvoice = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteInvoice = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateInvoice = () => Promise<NoteInfo['title'] | false>
export type DeleteInvoice = (title: NoteInfo['title']) => Promise<boolean>
