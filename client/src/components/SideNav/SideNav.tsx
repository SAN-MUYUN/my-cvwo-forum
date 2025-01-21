import { HiPencil, HiUser, HiZoomIn } from "react-icons/hi";


import {

  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import classes from './SideNav.module.css';
import CreatePostTab from "../ui/createPostTab";

const username = sessionStorage.getItem("user")

const links = [
  { icon: HiPencil, label: 'Create Post', href: "/dashboard/createPost"}
];

const tags: {label:string}[] = [];

export function SideNav() {
  
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <a href="create"className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke="1.5" />

        <span>{link.label}</span>

      </a>
      {/* {link.notifications && (               //notification component
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )} */}
    </UnstyledButton>
  ));

  const tagsTabs = tags.map((collection) => (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      key={collection.label}
      className={classes.collectionLink}
    >
      
      {collection.label}
    </a>
  ));

  return (
    <nav className={classes.sidenav}>
      <div className={classes.section}>
        <Text>Welcome {username}</Text>
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<HiZoomIn size={12} stroke={"1.5"} />}
        rightSectionWidth={70}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      {/* <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div> */}

      <CreatePostTab/>

      <div className={classes.section}>
          <a href = "/dashboard/mypost" className={classes.mainLink} >
              <UnstyledButton key="createPostTab" className={classes.mainLink}>
                  <a className={classes.link} key={'addTodo'}>
                      <HiUser className={classes.linkIcon} />
                      <span style={{padding:'10px'}}>My Post</span>
                  </a>
              </UnstyledButton>
          </a>
        <div className={classes.collections}>{tagsTabs}</div>
      </div>
    </nav>
  );
}