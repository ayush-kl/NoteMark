import { CreateInvoice, DeleteInvoice, GetInvoices, ReadInvoice, WriteInvoice } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getInvoices: (...args: Parameters<GetInvoices>) => ipcRenderer.invoke('getInvoices', ...args),
    readInvoice: (...args: Parameters<ReadInvoice>) => ipcRenderer.invoke('readInvoice', ...args),
    writeInvoice: (...args: Parameters<WriteInvoice>) => ipcRenderer.invoke('writeInvoice', ...args),
    createInvoice: (...args: Parameters<CreateInvoice>) => ipcRenderer.invoke('createInvoice', ...args),
    deleteInvoice: (...args: Parameters<DeleteInvoice>) => ipcRenderer.invoke('deleteInvoice', ...args)
  })
} catch (error) {
  console.error(error)
}
