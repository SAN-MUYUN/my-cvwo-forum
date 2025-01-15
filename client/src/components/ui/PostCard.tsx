import { Card, Image, Text, Badge, Button, Group, Modal } from '@mantine/core';
import { Post } from '../../types';
import { useState } from 'react';
import { displayTime } from '../../app/methods/methods';
import { SlDislike, SlLike } from "react-icons/sl";

export function PostCard({post}:{post: Post}) {
  console.log(post.tags)
  const [open, setOpen] = useState(false)
  return (
    <>
    <Modal opened = {open} onClose={() => setOpen(false)}>
      <Text fw={500}>{post.title}</Text>
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
  );
}