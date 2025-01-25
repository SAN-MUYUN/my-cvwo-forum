import { notifications } from "@mantine/notifications";

export function sendNotification(title: string, body: string,color: string) {
    return notifications.show({title: title, message: body, color:color});
}