import config from "../../config.json";
import http from "k6/http";
import { group } from "k6";
import vu from "k6/execution";
import { makeString } from "../helper/randomText";

export const className = "MultitenancyClass" + makeString(5);
export default function () {
    const hostUrl = config.Cluster[(vu.vu.idInTest - 1)%2].host;
    const params = {
      headers: {
        "Authorization": "Bearer " + `${config.Cluster[(vu.vu.idInTest -1)%2].apiKey}`,
        "Content-Type": "application/json",
        "X-OpenAI-Api-Key": `${config.Cluster[(vu.vu.idInTest-1)%2]["X-OpenAI-Api-Key"]}`
      },
      tags: { name: "CreateTenantLoadTest-K6" },
    };

  group("Create class", () => {
    const url = "https://" + `${hostUrl}` +"/v1/schema";
    const payload = JSON.stringify(
      {
          class: className,
          description: "Multitenancy Class Load Testing",
          multiTenancyConfig: { enabled: true },
        
    });
    const res = http.post(url, payload, params);
    let response = res.json();
    // console.log(response);
  });
}
