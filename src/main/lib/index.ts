import { ensureDir, readFile, writeFile, readdir, remove, stat } from 'fs-extra';
import { dialog } from 'electron';
import { homedir } from 'os';
import path from 'path';
import { fileEncoding } from '@shared/constants';

const appDirectoryName = 'dawaiInvoices';

export const getRootDir = () => path.join(homedir(), appDirectoryName);

export const getInvoices = async () => {
  const dir = getRootDir();
  await ensureDir(dir);

  const files = (await readdir(dir)).filter(f => f.endsWith('.json'));

  return Promise.all(
    files.map(async (file) => {
      const stats = await stat(path.join(dir, file));
      return {
        title: file.replace(/\.json$/, ''),
        lastEditTime: stats.mtimeMs
      };
    })
  );
};

export const readInvoice = async (filename: string) => {
  const fullPath = path.join(getRootDir(), `${filename}.json`);
  return readFile(fullPath, { encoding: fileEncoding });
};

export const writeInvoice = async (filename: string, content: string) => {
  const fullPath = path.join(getRootDir(), `${filename}.json`);
  await ensureDir(getRootDir());
  return writeFile(fullPath, content, { encoding: fileEncoding });
};

export const createInvoice = async () => {
  const dir = getRootDir();
  await ensureDir(dir);

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'Create Invoice File',
    defaultPath: path.join(dir, 'Untitled.json'),
    filters: [{ name: 'JSON', extensions: ['json'] }],
    properties: ['showOverwriteConfirmation']
  });

  if (canceled || !filePath) {
    console.info('Invoice creation canceled');
    return false;
  }

  await writeFile(filePath, '{}', { encoding: fileEncoding });

  const { name } = path.parse(filePath);
  return name; // Return just the filename without path or extension
};

export const deleteInvoice = async (filename: string) => {
  const filePath = path.join(getRootDir(), `${filename}.json`);

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Invoice',
    message: `Are you sure you want to delete invoice "${filename}"?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  });

  if (response === 0) {
    await remove(filePath);
    return true;
  }

  return false;
};
