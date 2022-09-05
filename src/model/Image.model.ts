import { Document, Schema, Model, model } from "mongoose";

export interface imageDocument extends Document {
  name: string;
  createdDate: Date;
}

export interface imageModel extends imageDocument {}

export const ImageSchema: Schema = new Schema(
  {
    name: String,
    createdDate: Date
  },
  { collection: "images" }
);

ImageSchema.pre<imageDocument>("save", async function() {
  this.createdDate = new Date();
});

export const Image: Model<imageModel> = model<imageModel>(
  "image",
  ImageSchema
);
