import Button from "@/components/ui/button/button";
import classes from './store.module.css';

export default function Store() {
  return (
    <>
      <div className={`fill-space-body`}>
        <div className={classes.container}>
          <p>
            <img className={classes.profile} alt='profile' src='/profile.png'/>
          </p>
          <h1 className={classes.title}>
            Change the color and message of a Node and be part of this community mural.
          </h1>
          <Button link='https://algoxnft.com/address/CV2QUFUD6C477DLPH5PMG2VSSHSHLXDHCEHUYF5FGV3UEWBNJ23SK47JKE?tab=buy_now'>
            GET A NODE
          </Button>
          <br/>
          <br/>
          <br/>
          <p>
            Do you want a 4x4 to 10x10 grid zone? Contact with <a className={classes.link} href="https://twitter.com/AInteractiveLab" target="_blank">@AInteractiveLab</a> on Twitter
          </p>
        </div>
      </div>
    </>
  )
}
