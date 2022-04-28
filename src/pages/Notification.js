import React from 'react';
import styled from 'styled-components';
import { Grid, Image, Text } from '../elements/index';
import Noticard from "../components/Notification/Noticard";
import IconTabs from '../components/IconTabs';

const Notification = (props) => {
    let noti = [
      { user_name: "mean0", post_id: "post1",image_url:"http://via.placeholder.com/400x300" },
      { user_name: "mean0", post_id: "post2",image_url:"http://via.placeholder.com/400x300" },
      { user_name: "mean0", post_id: "post3",image_url:"http://via.placeholder.com/400x300" },
      { user_name: "mean0", post_id: "post4",image_url:"http://via.placeholder.com/400x300" },
    ];

    return (
      <React.Fragment>
        <Grid padding="16px" bg="#EFF6FF">
          {noti.map((n) => {
            console.log(n.image_url);
            return <Noticard {...n} key={n.post_id} />;
          })}
        </Grid>

        <IconTabs/>
      </React.Fragment>
    );
}

export default Notification;