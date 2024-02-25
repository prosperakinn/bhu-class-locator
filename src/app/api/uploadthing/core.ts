import { createUploadthing, type FileRouter } from "uploadthing/next";
import { MaybePromise } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(({ metadata, file }) => {
      console.log("file url", file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { msg: 'successful!' } as unknown as MaybePromise<void>;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter