import * as glob from "glob";
import * as _ from "lodash";

const files = (path: string) =>
  new Promise((resolve, reject) => {
    glob("./dist/schema/*.schema.js", function (err, res) {
      if (err) {
        reject(err);
      } else {
        Promise.all(
          res.map(async (file) => {
            return {
              name: file.split("/")[file.split("/").length - 1].split(".")[0],
              schema: await import(__dirname + "/../../" + file),
            };
          })
        ).then((modules) => {
          resolve(modules);
        });
      }
    });
  }).then((modules) => {
    let schemas: {
      [key: string]: any;
    } = {};
    (
      modules as Array<{
        name: string;
        schema: {
          default: {};
        };
      }>
    ).forEach((module) => {
      schemas[module.name] = module.schema.default;
    });

    return schemas;
  });

export default files;
