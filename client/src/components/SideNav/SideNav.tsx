import classes from './SideNav.module.css';

import {
  Text,
} from '@mantine/core';
import CreatePostTab from "../ui/createPostTab";
import { MyPostButton } from "./MyPostButton";
import { LogoutButton } from './LogoutButton';

const username = sessionStorage.getItem("user")


export function SideNav() {

  return (
    <nav className={classes.sidenav}>
      <div className={classes.section}>
        <br></br>
        <Text>Welcome {username}</Text>
        <br></br>
      </div>

      <CreatePostTab/>

      <div className={classes.section}>
          <MyPostButton/>
          <hr></hr>
          <LogoutButton/>
      </div>
    </nav>
  );
}