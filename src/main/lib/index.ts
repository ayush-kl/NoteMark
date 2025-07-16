import { ensureDir, readFile, writeFile } from 'fs-extra';
import { dialog } from 'electron';
import { homedir } from 'os';
import path from 'path';
import { readdir } from 'fs/promises';
import { fileEncoding } from '@shared/constants';

const appDirectoryName = 'dawaiInvoices';

export const getRootDir = () => path.join(homedir(), appDirectoryName);

const getMonthFolderName = (date = new Date()) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2); // '24' for 2024
  return `${month}-${year}`;
};

const getDateFileName = (date = new Date()) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}-${month}.json`;
};

const getInvoiceFilePath = (date = new Date()) => {
  return path.join(getRootDir(), getMonthFolderName(date), getDateFileName(date));
};

const getMonthDirPath = (date = new Date()) => {
  return path.join(getRootDir(), getMonthFolderName(date));
};

/**
 * Create and append a new invoice to today's file (~/dawaiInvoices/MM-YY/DD-MM.json)
 */
export const createInvoice = async (data: any = {}) => {
  const filePath = getInvoiceFilePath();
  const monthDir = getMonthDirPath();
  await ensureDir(monthDir);

  let invoices: any[] = [];

  try {
    const content = await readFile(filePath, { encoding: fileEncoding });
    invoices = JSON.parse(content);
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
  const root = getRootDir();
  await ensureDir(root);
  const parsedContent = JSON.parse(content);

  const monthDirs = await readdir(root);
  for (const monthDir of monthDirs) {
    const monthPath = path.join(root, monthDir);
    try {
      const files = await readdir(monthPath);
      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(monthPath, file);
        try {
          const existingContent = await readFile(filePath, { encoding: fileEncoding });
          let invoices = JSON.parse(existingContent);

          const index = invoices.findIndex((inv: any) => inv.id === id);
          if (index !== -1) {
            invoices[index] = parsedContent;
            await writeFile(filePath, JSON.stringify(invoices, null, 2), { encoding: fileEncoding });
            return;
          }
        } catch {
          continue;
        }
      }
    } catch {
      continue;
    }
  }

  // If not found, append to today's file
  const todayFile = getInvoiceFilePath();
  await ensureDir(path.dirname(todayFile));
  let invoices: any[] = [];
  try {
    const content = await readFile(todayFile, { encoding: fileEncoding });
    invoices = JSON.parse(content);
  } catch {
    invoices = [];
  }

  invoices.push({ id, ...parsedContent });
  await writeFile(todayFile, JSON.stringify(invoices, null, 2), { encoding: fileEncoding });
};

/**
 * Read a specific invoice by ID
 */
export const readInvoice = async (id: string) => {
  try {
    const monthDirs = await readdir(getRootDir());
    for (const month of monthDirs) {
      const monthPath = path.join(getRootDir(), month);
      const files = await readdir(monthPath);
      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(monthPath, file);
        try {
          const content = await readFile(filePath, { encoding: fileEncoding });
          const invoices = JSON.parse(content);
          const found = invoices.find((inv: any) => inv.id === id);
          if (found) return found;
        } catch {
          continue;
        }
      }
    }
  } catch {
    return null;
  }
  return null;
};

/**
 * Get metadata for all invoices (used for listing)
 */
export const getInvoices = async (dateStr?: string, filters?: { patientName?: string; mobile?: string }) => {
  const result: { title: string; lastEditTime: number; data: any }[] = [];

  try {
    const root = getRootDir();
    const monthDirs = await readdir(root);

    for (const month of monthDirs) {
      const monthPath = path.join(root, month);
      const files = await readdir(monthPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        if (dateStr && !file.includes(dateStr)) continue; // filter by date

        const filePath = path.join(monthPath, file);
        try {
          const content = await readFile(filePath, { encoding: fileEncoding });
          const invoices = JSON.parse(content);

          for (const inv of invoices) {
            const matchPatient = !filters?.patientName || inv.patientName?.toLowerCase().includes(filters.patientName.toLowerCase());
            const matchMobile = !filters?.mobile || inv.mobile?.includes(filters.mobile);

            if (matchPatient && matchMobile) {
              result.push({
                title: inv.id,
                lastEditTime: inv.createdAt,
                data: inv
              });
            }
          }
        } catch {
          continue;
        }
      }
    }
  } catch {
    return [];
  }

  return result;
};

/**
 * Delete an invoice by ID (with confirmation dialog)
 */
export const deleteInvoice = async (id: string) => {
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
    const monthDirs = await readdir(getRootDir());
    for (const month of monthDirs) {
      const monthPath = path.join(getRootDir(), month);
      const files = await readdir(monthPath);

      for (const file of files) {
        if (!file.endsWith('.json')) continue;

        const filePath = path.join(monthPath, file);
        try {
          const content = await readFile(filePath, { encoding: fileEncoding });
          const invoices = JSON.parse(content);
          const filtered = invoices.filter((inv: any) => inv.id !== id);

          if (filtered.length !== invoices.length) {
            await writeFile(filePath, JSON.stringify(filtered, null, 2), { encoding: fileEncoding });
            return true;
          }
        } catch {
          continue;
        }
      }
    }
  } catch {
    return false;
  }

  return false;
};
