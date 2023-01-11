import * as React from 'react';
import 
{
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Avatar,
    Typography,
    IconButton
} from "@material-ui/core";
import { Skeleton
 } from "@material-ui/lab";
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 
 

function Media() {
  const loading=true;

  return (
    <>
    <Skeleton />
<Skeleton animation="wave" />
<Skeleton animation={false} />
    </>
  );
}

export default Media;
