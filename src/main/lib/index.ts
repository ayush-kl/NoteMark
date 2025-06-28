import { ensureDir, readFile, writeFile, remove, stat } from 'fs-extra';
import { dialog } from 'electron';
import { homedir } from 'os';
import path from 'path';
import { fileEncoding } from '@shared/constants';

const appDirectoryName = 'dawaiInvoices';
const invoiceFileName = 'invoices.json';

export const getRootDir = () => path.join(homedir(), appDirectoryName);
export const getInvoiceFilePath = () => path.join(getRootDir(), invoiceFileName);

/**
 * Create and append a new invoice to invoices.json
 */
export const createInvoice = async (data: any = {}) => {
  const filePath = getInvoiceFilePath();
  await ensureDir(getRootDir());

  let invoices: any[] = [];

  try {
    const content = await readFile(filePath, { encoding: fileEncoding });
    const parsed = JSON.parse(content);
    invoices = Array.isArray(parsed) ? parsed : [];
  } catch {
    invoices = [];
  }

  const timestamp = Date.now();
  const newInvoice = {
    id: `invoice-${timestamp}`,
    createdAt: timestamp,
    ...data
  };

  invoices.push(newInvoice);
  await writeFile(filePath, JSON.stringify(invoices, null, 2), { encoding: fileEncoding });

  return newInvoice.id;
};

/**
 * Overwrite/update an invoice by ID
 */
export const writeInvoice = async (id: string, content: string) => {
  const filePath = getInvoiceFilePath();
  await ensureDir(getRootDir());

  let invoices: any[] = [];

  try {
    const existingContent = await readFile(filePath, { encoding: fileEncoding });
    invoices = JSON.parse(existingContent);
  } catch {
    invoices = [];
  }

  const parsedContent = JSON.parse(content);
  const index = invoices.findIndex((inv) => inv.id === id);
  if (index >= 0) {
    invoices[index] = parsedContent;
  } else {
    invoices.push({ id, ...parsedContent });
  }

  return writeFile(filePath, JSON.stringify(invoices, null, 2), { encoding: fileEncoding });
};

/**
 * Read a specific invoice by ID
 */
export const readInvoice = async (id: string) => {
  const filePath = getInvoiceFilePath();

  try {
    const content = await readFile(filePath, { encoding: fileEncoding });
    const invoices = JSON.parse(content);
    return invoices.find((inv: any) => inv.id === id) || null;
  } catch {
    return null;
  }
};

/**
 * Get metadata for all invoices (used for listing)
 */
export const getInvoices = async () => {
  const filePath = getInvoiceFilePath();
  await ensureDir(getRootDir());

  try {
    const content = await readFile(filePath, { encoding: fileEncoding });
    const invoices = JSON.parse(content);

    return invoices.map((inv: any) => ({
      title: inv.id,
      lastEditTime: inv.createdAt
    }));
  } catch {
    return [];
  }
};

/**
 * Delete an invoice by ID (with confirmation dialog)
 */
export const deleteInvoice = async (id: string) => {
  const filePath = getInvoiceFilePath();

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Invoice',
    message: `Are you sure you want to delete invoice "${id}"?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  });

  if (response !== 0) return false;

  try {
    const content = await readFile(filePath, { encoding: fileEncoding });
    let invoices = JSON.parse(content);
    const filtered = invoices.filter((inv: any) => inv.id !== id);
    await writeFile(filePath, JSON.stringify(filtered, null, 2), { encoding: fileEncoding });
    return true;
  } catch {
    return false;
  }
};
