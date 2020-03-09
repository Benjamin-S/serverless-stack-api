import uuid from "uuid";
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    // Request body is passed in as a JSON encoded string in event.body
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachement: data.attachement,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        console.log(e);
        return failure({ staus: false });
    }
}