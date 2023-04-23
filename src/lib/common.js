import { PROFILE_TYPE, ROLE } from '@/constant';

export const checkRoomItemIndex = (array, comparison) => {
    return array.findIndex(item=> {
         return item.id === comparison
     })
 }

 export const deleteItem = (roomItems, currentItem) => {
   return roomItems.splice(checkRoomItemIndex(roomItems, currentItem),1)
 }

 export const replaceItem = (roomItems, currentItem, replacement) => {
    return roomItems.splice(checkRoomItemIndex(roomItems, currentItem),1,replacement)
  }

  export const getRandomAttendants = () => {
    const randomKey = getRandomObj(PROFILE_TYPE)

    if(randomKey !== 'USER' && randomKey !==  'WAITING' ){
        return PROFILE_TYPE[randomKey];
    }else{
      return getRandomAttendants();
    }
  }

  export const getRandomRole = () => {
   const randomKey = getRandomObj(ROLE)

    if(randomKey !== 'USER'){
        return ROLE[randomKey];
    }else{
      return getRandomRole();
    }
  }

  export const getRandomObj = (target) =>{
    const objArr = Object.keys(target);
    const objIdx = Math.floor(Math.random() * objArr.length);
    const randomKey = objArr[objIdx];

    return randomKey;
  }
