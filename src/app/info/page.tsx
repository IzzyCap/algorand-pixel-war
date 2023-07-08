'use client'
import classes from './info.module.css';
import Dropdown from "@/components/ui/dropdown-menu/dropdown";

export default function Store() {
  return (
    <>
      <div className={classes.container}>
        <Dropdown title="What is Algorand Pixel War?">
          <p>
            The Algorand Pixel War is a 100x100 grid composed of nodes, where each node is represented by a mutable (ARC19) NFT. By owning a node, you gain the power to customize its color, message, and make your mark on the Algorand Pixel War Grid. Additionally, Algorand communities have the exciting opportunity to purchase grid zones and create stunning pixel art murals.
          </p>
        </Dropdown>
        <Dropdown title="How to get a Node NFT?">
          <p>
            Acquiring nodes in the Algorand Pixel War can be done through community giveaways or by purchasing them from Algorand NFT marketplaces. Furthermore, Algorand communities have the thrilling chance to buy grid zones and unleash their creativity in crafting pixel art murals. For additional details, please visit the Store page.
          </p>
        </Dropdown>
        <Dropdown title="How to update a owned Node?">
          <p>
            After obtaining a Node, you have the ability to modify both its color and message.
          </p>
          <p>
            To begin, connect your Pera Wallet, which holds the Node, by clicking the top-right button. If you possess the Node Algorand Pixel War #33 (3, 2) you can edit it by selecting the corresponding position on the Grid, where x=3 and y=2 (with 0 being the initial position). This action will prompt a modal to appear, presenting a form to modify the Node s data. Once you have made the desired changes, simply click the (Update Node) button to save the updates.
          </p>
        </Dropdown>
      </div>
    </>
  )
}
