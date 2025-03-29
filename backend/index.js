import express from "express";
const app = express();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000, () => {
    console.log("Server is listening");
  });
}
main();
