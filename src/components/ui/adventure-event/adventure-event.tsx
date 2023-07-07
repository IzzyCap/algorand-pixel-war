import React, { Dispatch, SetStateAction, useState } from 'react';
import { StatsEnum } from '@/constants/enums';
import { getStatSum } from '@/lib/utils';

interface AdventureEventProps {
  hero: Hero | undefined;
  setHero: Dispatch<SetStateAction<Hero | undefined>>;
  eventNum: number;
  setEventNum: Dispatch<SetStateAction<number>>;
  eventDesc: React.ReactNode;
  actionButtons: ActionButtons[];
  success: SuccessReward;
  failure: FailureReward;
  gameOver: () => void
}

const AdventureEvent: React.FC<AdventureEventProps> = ({ hero, setHero, eventNum, setEventNum, eventDesc, actionButtons, success, failure, gameOver }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [resume, setResume] = useState<React.ReactNode | null>(null);

  function clickHandler(action: ActionButtons) {
    let diceSum = 0;
    
    if (!hero) {
      return
    }
    
    action.neededStats.forEach((stat: StatsEnum) => {
      switch (stat) {
        case StatsEnum.Charisma:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Charisma)) + 1;
          break;
        case StatsEnum.Constitution:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Constitution)) + 1;
          break;
        case StatsEnum.Dexterity:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Dexterity)) + 1;
          break;
        case StatsEnum.Health:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Health)) + 1;
          break;
        case StatsEnum.Intelligence:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Intelligence)) + 1;
          break;
        case StatsEnum.Strength:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Strength)) + 1;
          break;
        case StatsEnum.Wisdom:
          diceSum += Math.floor(Math.random() * getStatSum(hero, StatsEnum.Wisdom)) + 1;
          break;
      }
    });

    if (diceSum >= action.neededDiceRoll) {
      setContent(action.success);

      success.addReward({
        name: 'Gold',
        quantity: success.gold
      });

      success.addReward({
        name: 'Exp',
        quantity: success.exp
      });

      setResume(<p className='success'><strong className='success'>Success:</strong> You have won {success.gold} gold coins</p>);
    } else {
      setContent(action.failure);
      setResume(<p className='failure'><strong className='failure'>Failure:</strong> You have taken {failure.damage} points of damage</p>);

      success.addReward({
        name: 'Exp',
        quantity: failure.exp
      });

      if (failure.instaKill) {
        hero.stats.health = 0
      } else {
        hero.stats.health -= failure.damage;

        if (hero.stats.health < 0) {
          hero.stats.health = 0
        }
      }

      setHero(hero);
    }

    if (hero.stats.health <= 0) {
      gameOver();
    } else {
      setEventNum(eventNum + 1);
    }
  }

  return (
    <>
      <h3>Event {eventNum}:</h3>
      <br/>
      <div>
        {eventDesc}
      </div>
      <br/>
      {!content
        ? ( 
          <div className={`buttons-row`}>
            {actionButtons.map((action: ActionButtons) => {
              return (
                <button onClick={() => clickHandler(action)} key={action.name}>{action.name}</button>
              )
            })}
          </div>
        )
        : (
          <>
            {content}
            <br/>
            {resume}
            <br/>
            <br/>
          </>
        )
      }   
    </>
  );
};
  
export default AdventureEvent;
