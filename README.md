# Goal: 
Load testing the new tenant creation scenario on weavaite cluster deployed on a multi node cluster on k8s.

# Framework: 
The framework uses k6 load testing tool to simulate the tenant creation scenario


Install the [k6 performance test tool](https://docs.k6.io/docs/installation).

Install dependencies using:

`yarn install`

in the terminal (you need to have [yarn](https://yarnpkg.com/getting-started/install) installed on your machine).

Build the tests using the following command:

`yarn build`

Run the test using the following command:

`yarn test`

## Threshold Configuration

The threshold configuration is captured in `config.json` file. Please see [k6 Options](https://k6.io/docs/using-k6/options/) documentation on various K6 options that can be used to configure the tests. E.g constant-vus, ramping-vus etc

## Configuration:
The framework contains the `config.json` file where weavaite cluster's host url, weaviate api Key, openai api keys are configured. If there are multiple cluster then mention weaviates's instance hosturl, api key for every cluster. e.g

`
{
  "Cluster": [
    {
      "host": "",
      "apiKey": "",
      "X-OpenAI-Api-Key": ""
    },
    {
      "host": "",
      "apiKey": "",
      "X-OpenAI-Api-Key": ""
    },
    {
      "host": "",
      "apiKey": "",
      "X-OpenAI-Api-Key": ""
    }
  ]
}

`
## Metrics:
The key metrics include:
    - `http_req_duration`, the end to end time of all the requests (that is the total layency)
    - `http_req_failed`, the total number of failed requests
    - `iterations`, the total number of iterations
    -  `Peak RPS` , the peak request per sec
    - `http_req` , Total http request made
    - `response time`, Response time to process the request
    - The test results show aggregated statistical values including, Median and average values , Minimum and Maximum values , p90, p95 and p99 values

## Dashboard:
    The test execution summary is visalized in grafana for deeper analysis. This gives you a granular time-series data, which has metrics and timestamps for evey point of the test. https://rthiiyer.grafana.net/a/k6-app/tests/830424


## Improvements:
<!-- 
    - Create a docker compose file to deploy the laod test framework on multinode k8 cluster
    - Run the test on cloud instead of local execution
    - Schedule to run the tests on regualr basis to monitor the performance of the system.
    - Add more scenarios to the framework including loading of dataset (large, medium and small) in JSON, CSV format (currently supported)
 -->