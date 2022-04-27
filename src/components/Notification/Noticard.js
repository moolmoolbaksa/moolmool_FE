import React from "react";
import {Grid, Text, Image} from "../../elements/index";

const Noticard = (props) => {

    const {image_url, user_name, post_id} = props;
    console.log(props.image_url);
    console.log(props.user_name);
    return (
      <Grid padding="16px" is_flex bg="#ffffff" margin="8px 0px">
        <Grid width="auto" margin="0px 8px 0px 0px">
          <Image src={image_url} size={85} shape="square" />
        </Grid>
        <Grid>
        <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다 :)!{" "}
          {/* <Text>
            <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다 :)!{" "}
          </Text> */}
        </Grid>
      </Grid>
    );
}

Noticard.defaultProps = {
  image_url: "http://via.placeholder.com/400x300",
  user_name:"",
  post_id:"",
};

export default Noticard;