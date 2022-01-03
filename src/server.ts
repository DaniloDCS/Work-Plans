import App from "./App";
import "dotenv/config";

const port = process.env.PORT || 3003;

App.listen(port, () => {
  console.clear();
  console.info(`Started application... \nHost: http://localhost:${port}`);
});
