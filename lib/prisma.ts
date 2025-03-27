import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";

const prisma =
  global.prisma ||
  new PrismaClient().$extends({
    ...withAccelerate(),
    query: {
      user: {
        async $allOperations({ operation, args, query }) {
          // Check if the operation is "create" or "update" and if password is in args.data
          if (
            ["create", "update"].includes(operation) &&
            "data" in args &&
            args.data &&
            "password" in args.data &&
            typeof args.data.password === "string"
          ) {
            // Hash the password asynchronously using bcryptjs
            args.data.password = await bcrypt.hash(args.data.password, 10);
          }
          return query(args);
        },
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
