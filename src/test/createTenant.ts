import config from "../../config.json";
import http from "k6/http";
import { makeString } from "../helper/randomText";
import { group } from "k6";
import vu from "k6/execution";

export default function () {
  const hostUrl = config.Cluster[(vu.vu.idInTest - 1) % 2].host;
  const params = {
    headers: {
      Authorization:
        "Bearer " + `${config.Cluster[(vu.vu.idInTest - 1) % 2].apiKey}`,
      "Content-Type": "application/json",
      "X-OpenAI-Api-Key": `${
        config.Cluster[(vu.vu.idInTest - 1) % 2]["X-OpenAI-Api-Key"]
      }`,
    },
    tags: { name: "CreateTenantLoadTest-K6" },
  };
  let classNameList: string[];

  group("Get class", () => {
    const url = "https://" + `${hostUrl}` + "/v1/schema";
    const res = http.get(url, params);
    let response = JSON.parse(res.body as string);
    // console.log(response);
    classNameList = response.classes.map((name: any) => name.class);
    console.log("Mutitenancy classnames " + `${classNameList}` + "in a cluster " + `${hostUrl}` );
  });

  group("Add Tenant", () => {
    classNameList.forEach((name) => {
      const url =
        "https://" + `${hostUrl}` + "/v1/schema/" + `${name}` + "/tenants";
      console.log(url);
      var name = makeString(5);
      const payload = JSON.stringify([
        {
          name: name,
        },
      ]);
      const res = http.post(url, payload, params);
      let responsebody = JSON.parse(res.body as string);
      console.log(responsebody);
    });
  });
}
