// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  // Tell Jest to treat these extensions as ESM
  extensionsToTreatAsEsm: [".ts", ".tsx"],

  // Transform TypeScript files with ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Handle .js extensions in import paths
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  // File extensions Jest should look for
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Tells Jest we're using Node environment
  testEnvironment: "node",
};

export default config;
