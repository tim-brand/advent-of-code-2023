module.exports = function (plop) {
    plop.setGenerator("day", {
      prompts: [
        {
          type: "input",
          name: "day",
          message: "What day of the event?",
          default: (new Date()).getDate().toString().padStart(2, "0")
        },
      ], 
      actions: [
        {
          type: "add",
          path: "days/{{day}}/index.ts",
          templateFile: ".plop/template/index.ts",
        },
        {
          type: "add",
          path: "days/{{day}}/index.test.ts",
          templateFile: ".plop/template/index.test.ts",
        },
        {
          type: "add",
          path: "days/{{day}}/input",
          templateFile: ".plop/template/input",
        },
      ],
    });
  };