import { useState } from "react";
import { Post } from "../../types";
import { Badge, Card, Group, Modal, Text } from "@mantine/core";
import { deleteMyPost, displayTime, fetcher } from "../../app/methods/methods";
import { SlDislike, SlLike } from "react-icons/sl";
import { HiTrash } from "react-icons/hi";
import useSWR from "swr";
import { notifications } from "@mantine/notifications";

export function MyPostCard({post}: {post:Post}) {
    const [open, setOpen] = useState(false);
    const { data, mutate } = useSWR('api/dashboard/mypost/', fetcher);
    const [changed, setChanged] = useState(true)
    console.log(changed);
    console.log(data);


    const handleDelete = (postId: Number) => {
        setChanged(false)
        deleteMyPost(postId, mutate).then(() => setChanged(true));
        notifications.show({title: "Deleted", message: "Post successfully deleted", color: "green"})
        window.location.href = "/dashboard"
    };

      return (
        <>
        <Modal opened = {open} onClose={() => setOpen(false)} size="60%">
          <Text fw={500}>{post.title}</Text>
          <HiTrash style={{marginRight:"0px"}} onClick={() => {handleDelete(post.id); setOpen(false)}}/>

          <Text size="sm" c="dimmed">by {post.username}</Text>

          {post.tags && post.tags.map((tagInfo) => (
                <Badge color='yellow'>{tagInfo}</Badge>
            ))}
          <br></br>
          <br></br>
    
          <Text>{post.body}</Text>
        </Modal>
        <Card shadow="sm" padding="lg" radius="md" withBorder onClick={() => setOpen(true)}>
          
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500} left={0}>{post.title}</Text>
            <Group ta={'right'}>
                
              {post.tags && post.tags.map((tagInfo) => (
                  <Badge color='yellow' ta={'left'}>{tagInfo}</Badge>
              ))}
            </Group>
    
            
          </Group>
          <Group>
            <div style={{textAlign: 'left'}}>
              <Text size="sm" lineClamp={2} >
                {post.body}
              </Text>
              <br></br>
              <Text ta = "left" size='xs' c="dimmed">
                {displayTime(+post.createdAt)}
              </Text>
              <></>
              
            </div>
          </Group>
    
          <div style={{textAlign:'right', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <SlLike/>
            <Text style={{marginLeft: '8px'}}>0</Text>
            <SlDislike style={{marginLeft: '10px'}}/>
            <Text style={{marginLeft: '8px'}}>0</Text>
          </div>
    
        </Card>
        </>
    )
}