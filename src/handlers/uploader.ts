const handler = (msg: any) => {
    console.log(msg.content.toString() , "received from uploader handler");
}


export default handler;