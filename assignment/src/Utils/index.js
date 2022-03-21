

function sortData(list,data){
    const dynamicSort=(property)=> {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
  
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    return list.sort(dynamicSort(data))
}
const SORTS = {
    NONE: (list) => list,
    FIRST_NAME: (list) => sortData(list, 'first_name'),
    LAST_NAME: (list) => sortData(list, 'last_name'),
    AGE: (list) => sortData(list, 'age').reverse(),
    EMAIL: (list) => sortData(list, 'email'),
    WEB: (list) => sortData(list,'web')
};
const pagination =(data,s)=>{ 
    let size = s; 
    let arrayOfArrays = [];
    for (var i=0; i<data.length; i+=size) {
         arrayOfArrays.push(data.slice(i,i+size));
    }
    return arrayOfArrays
}
export {SORTS, pagination}
