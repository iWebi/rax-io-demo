import { LambdaEvent, LambdaRequestContext, StringMap } from "./types";

export async function authorize(event: LambdaEvent) {
  const authToken = findHeader("Authorization", event.headers);
  // TODO: add custom auth logic here
  // dummy logic for demo purpose
  if (authToken === "_t_o_k_e_n_") {
    return generatePolicy(event.requestContext);
  }
  // all other scenarios, invalid
  throw new Error("Unauthorized");
}

export function findHeader(headerName: string, headers: StringMap): string | undefined {
  headerName = headerName?.toLocaleLowerCase();
  for (const property of Object.keys(headers)) {
    if (property.toLocaleLowerCase() === headerName) {
      return headers[property];
    }
  }
  return undefined;
}

export function generatePolicy(requestContext: LambdaRequestContext) {
  const baseARN = `arn:aws:execute-api:us-east-1:${requestContext.accountId}:${requestContext.apiId}/${requestContext.stage}`;

  const resources: string[] = [`${baseARN}/*/v*/*`];

  return {
    principalId: "fooUser",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: resources,
        },
      ],
    },
    context: {
      stringKey: "value",
      numberKey: "1",
      booleanKey: "true",
    },
    usageIdentifierKey: "{api-key}",
  };
}
