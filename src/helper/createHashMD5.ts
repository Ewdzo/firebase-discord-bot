import { createHash } from "node:crypto";

const md5 = (data: string) => {
  return createHash("md5").update(data).digest("hex");
}

export { md5 };
