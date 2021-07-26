import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(filename, dir);

  router.get('/cells', async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });

      res.send(JSON.parse(result));
    } catch (err) {
      if (err.code === 'ENOENT') {
        //   add code to creat a file and default cells
        await fs.writeFile(fullPath, '[]', 'utf-8');
        res.send([]);
      } else {
        throw err;
      }
    }

    //   red the file
    // parse a list of cells out if it
    // send list of cells back to browser
  });

  router.post('/cells', async (req, res) => {
    //   take the lsit of cells from the request obj
    //   serialize them
    const { cells }: { cells: Cell[] } = req.body;

    //   write the ceels in the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'ok' });
  });

  return router;
};
