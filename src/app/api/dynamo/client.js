import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const dynamo = DynamoDBDocumentClient.from(client);

export async function saveUserToDynamoDB(username, email) {
  await dynamo.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: { username, email },
    })
  );
}
