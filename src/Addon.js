
let uniqueList = [];
let dupList = [];

Array.prototype.contains = function(item){
  let filtered_item = this.filter((i) => {
    return i.nameLog === item.nameLog
  });
  return !!filtered_item.length;
}

function contains(list, item){
  let filtered_item = list.filter((i) => {
    return i.id === item.id
  });
  return !!filtered_item.length;
}

function pushToUniqueList(item){
  if(!uniqueList.contains(item)) uniqueList.push(item);
}

function pushToDuplicateList(item){
  if(!dupList.contains(item)) dupList.push(item);
}

for(let i = 0; i < a.length; i++){
  if(uniqueList.contains(a[i])){
    pushToDuplicateList(a[i]);
  } else {
    pushToUniqueList(a[i]);
  }
}

for(let i = 0; i < dupList.length; i++){
  if(uniqueList[i].nameLog==dupList[i].nameLog){
    uniqueList[i].status=[...uniqueList[i].status,dupList[i].status[i]];
  }
}


console.log('Duplicate list is ', dupList);
console.log('Unique list is ', uniqueList);