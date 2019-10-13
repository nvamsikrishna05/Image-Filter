import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (req: Request, res: Response) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get(
    '/filteredimage',
    async (req: Request, res: Response, next: NextFunction) => {
      // const { image_url } = req.query;
      const image_url = req.query.image_url;

      if (!image_url) {
        return res
          .status(400)
          .send(`try GET /filteredimage?image_url=IMAGE_URL`);
      }

      try {
        console.log('Starting the filtering of the image');
        const filtered_image = await filterImageFromURL(image_url);
        const filtered_images = [filtered_image];

        res.status(200).sendFile(filtered_image, async (error: Error) => {
          if (error) {
            next(error);
          }
          await deleteLocalFiles(filtered_images);
        });
      } catch (err) {
        console.log(err.message);
        return res.status(500).send('Error Occured while filtering the image.');
      }
    }
  );

  // Global Error Handling Middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(500).send('Error occured while filtering the image');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
