import Player from './State/player';
import EnvItem from './State/envItem';

/**
 *
 * @param {Player} player
 * @param {EnvItem[]} objectsToCheck
 * @returns {EnvItem[]}
 */
export default function collisionCheck(player, objectsToCheck) {
  const collided = [];

  for (let i = 0; i < objectsToCheck.length; i++) {
    if (player.position.distance(objectsToCheck[i].position) < 0.1) {
      collided.push(objectsToCheck[i]);
      console.log('Collided!');
    }
  }

  return collided;
}
