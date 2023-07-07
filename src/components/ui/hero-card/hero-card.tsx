import React from 'react';
import classes from './hero-card.module.css'; // Import the CSS module for styling

interface HeroCardProps {
  hero: Hero | undefined;
  helmet: Item | undefined;
  chest: Item | undefined;
  legs: Item | undefined;
  feet: Item | undefined;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, helmet, chest, legs, feet }) => {
  // [TODO] create function that calculate sum of the x stat with items
  return (
    <div className={classes.heroCard}>
      <h1>Pixie Telenna</h1>
      <h2>Fighter  Level 1</h2>
      <div className={classes.statsSection}>
        Health
      </div>
      <div className={classes.statsSectionContainer}>
        <div className={classes.stat}>
          <label>HP</label>
          <div>{hero?.stats.health}</div>
        </div>
      </div>
      <br/>
      <div className={classes.statsSection}>
        Stats
      </div>
      <div className={classes.statsSectionContainer}>
        <div className={classes.stat}>
          <label>STR</label>
          <div>{hero?.stats.strength} (+{
            (helmet?.stats?.strength || 0) + 
            (chest?.stats?.strength || 0) + 
            (legs?.stats?.strength || 0) + 
            (feet?.stats?.strength || 0)
          })</div>
        </div>
        <div className={classes.stat}>
          <label>DEX</label>
          <div>{hero?.stats.dexterity} (+{
            (helmet?.stats?.dexterity || 0) + 
            (chest?.stats?.dexterity || 0) + 
            (legs?.stats?.dexterity || 0) + 
            (feet?.stats?.dexterity || 0)
          })</div>
        </div>
        <div className={classes.stat}>
          <label>CON</label>
          <div>{hero?.stats.constitution} (+{
            (helmet?.stats?.constitution || 0) + 
            (chest?.stats?.constitution || 0) +
            (legs?.stats?.constitution || 0) + 
            (feet?.stats?.constitution || 0)
          })</div>
        </div>
      </div>
      <div className={classes.statsSectionContainer}>
        <div className={classes.stat}>
          <label>INT</label>
          <div>{hero?.stats.intelligence} (+{
            (helmet?.stats?.intelligence || 0) + 
            (chest?.stats?.intelligence || 0) + 
            (legs?.stats?.intelligence || 0) + 
            (feet?.stats?.intelligence || 0)
          })</div>
        </div>
        <div className={classes.stat}>
          <label>WIS</label>
          <div>{hero?.stats.wisdom} (+{
            (helmet?.stats?.wisdom || 0) + 
            (chest?.stats?.wisdom || 0) + 
            (legs?.stats?.wisdom || 0) + 
            (feet?.stats?.wisdom || 0)
          })</div>
        </div>
        <div className={classes.stat}>
          <label>CHA</label>
          <div>{hero?.stats.charisma} (+{
            (helmet?.stats?.charisma || 0) +
            (chest?.stats?.charisma || 0) +
            (legs?.stats?.charisma || 0) +
            (feet?.stats?.charisma || 0)
          })</div>
        </div>
      </div>
    </div>
  );
};
  
export default HeroCard;
