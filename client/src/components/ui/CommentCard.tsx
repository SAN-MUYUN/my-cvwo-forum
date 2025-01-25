import { Card, Group, Text } from "@mantine/core";
import { Comment } from "../../types";
import { SlDislike, SlLike } from "react-icons/sl";
import { displayTime } from "../../app/methods/methods";
import { sendNotification } from "./notification";

export function CommentCard({comment}: {comment:Comment}) {
    console.log(comment)
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500} left={0}>By: {comment.user}</Text>
            <br></br>
            <Group>
            <div style={{textAlign: 'left'}}>
                <Text size="sm" lineClamp={2} >
                    {comment.body}
                </Text>
               
                <Text ta = "left" size='xs' c="dimmed">
                    {displayTime(+comment.createdAt)}
                </Text>
                <></>
                
            </div>
            </Group>
    
            <div style={{textAlign:'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <SlLike onClick={() => sendNotification("Oops", "Like function to be implemented soon", "blue")}/>
            <Text style={{marginLeft: '8px'}}>0</Text>
            <SlDislike style={{marginLeft: '10px'}} onClick={() => sendNotification("Oops", "Dislike function to be implemented soon", "blue")}/>
            <Text style={{marginLeft: '8px'}}>0</Text>
            </div>
    
        </Card>
    )
}