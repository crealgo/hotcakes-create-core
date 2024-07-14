#!/usr/bin/env node

const fs = require("fs");
const childProcess = require("child_process");

/**
 * Eslint
 */
childProcess.execSync("npm init @eslint/config@latest -- --config semistandard", {
	stdio: "inherit",
});

/**
 * Prettier
 */
childProcess.execSync("npm install --save-dev prettier", {
	stdio: "inherit",
});

const prettierConfig = {
	printWidth: 120,
	bracketSameLine: true,
};

fs.writeFileSync(".prettierrc", JSON.stringify(prettierConfig, null, 2), { encoding: "utf-8" });

/**
 * Typescript
 */
childProcess.execSync("npm install --save-dev typescript @hotcakes/tsconfig");

const tsconfig = {
	extends: "@hotcakes/tsconfig",
};

fs.writeFileSync("tsconfig.json", JSON.stringify(tsconfig, null, 2), { encoding: "utf-8" });
