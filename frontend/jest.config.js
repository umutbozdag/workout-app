module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFiles: ["./jest.setup.ts"],
  snapshotSerializers: ["jest-serializer-vue"],
};
