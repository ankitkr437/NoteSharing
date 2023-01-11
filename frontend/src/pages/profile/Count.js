 export const Count=({post})=>{
    const totalviews=0;
    const totallikes=0;
    post.map((x)=>{
      totallikes=  totallikes+x.likes.length
     totalviews =totalviews+x.buy.length
       })
    return{
       totallikes,totalviews
    }
 }