import { Card, Text, Badge, Group, Modal } from '@mantine/core';
import { Post } from '../../types';
import { createContext, useEffect, useState } from 'react';
import { displayTime } from '../../app/methods/methods';
import { SlDislike, SlLike } from "react-icons/sl";
import { CommentSection } from './CommentSection';

export const PostContext = createContext<Post | undefined>(undefined)

export function PostCard({post}:{post: Post}, {setCurrPost}:{setCurrPost:any}) {
  

  const [open, setOpen] = useState(false)
  return (
    <>
    <Modal opened = {open} onClose={() => setOpen(false)} size="60%">
      <Text fw={500}>{post.title}</Text>
      <Text size="sm" c="dimmed">by {post.username}</Text>
      {post.tags && post.tags.map((tagInfo) => (
            <Badge color='yellow'>{tagInfo}</Badge>
        ))}
      <br></br>
      <br></br>

      <Text>{post.body}</Text>
      <br></br>
      <hr></hr>
      <br></br>
      <PostContext.Provider value={post}>
        <CommentSection setOpen={setOpen}/>
      </PostContext.Provider>
      
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