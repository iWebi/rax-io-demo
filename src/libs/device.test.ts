import * as ulid from "ulid";
import { addDevice } from "./device";
import * as dynamodb from "./dynamodb";
import * as sqs from "./sqs";
import { okResponse } from "./utils";

jest.mock("./dynamodb");
jest.mock("./sqs");
jest.mock("ulid");

const mockedDynamoDB = dynamodb as jest.Mocked<typeof dynamodb>;
const mockedSqs = sqs as jest.Mocked<typeof sqs>;
const mockedUlid = ulid as jest.Mocked<typeof ulid>;

const mockDate = "2022-03-11T06:28:16.263Z";
jest.spyOn(Date.prototype, "toISOString").mockImplementation(() => mockDate);
mockedUlid.ulid.mockReturnValue("test-random-ulid-value");

const tenant = "test-tenant-12345";

describe("addDevice", () => {
  it("returns error for invalid json", async () => {
    // given
    const deviceRequest = "not a valid json";
    // when
    const response = await addDevice(deviceRequest, tenant);
    // then
    expect(response).toMatchSnapshot();
  });

  it("returns error for missing name field", async () => {
    // given
    const deviceRequest = '{"ip": "10.0.0.1"}';
    // when
    const response = await addDevice(deviceRequest, tenant);
    // then
    expect(response).toMatchSnapshot();
  });

  it("inserts item to DynamoDB for valid request", async () => {
    // given
    const deviceRequest = '{"ip": "10.0.0.1", "name": "test-device-1"}';
    mockedDynamoDB.putItem.mockResolvedValueOnce(okResponse(""));
    // when
    const response = await addDevice(deviceRequest, tenant);
    // then
    expect(response).toMatchSnapshot();
    expect(mockedDynamoDB.putItem.mock.calls).toMatchSnapshot("dynamodb insert payload");
    expect(mockedSqs.sendNewDeviceMessage.mock.calls).toMatchSnapshot("sqs notification payload");
  });
});
