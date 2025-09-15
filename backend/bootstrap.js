require("ts-node").register({
	project: "./tsconfig.json",
	transpileOnly: true,
	files: true
});
require("tsconfig-paths").register();
require("./src/index.ts");