
export const mergeTweetArrayObjects = (dataArray, includesArray) => {
    return dataArray.map((item, i) => {
        if (item.author_id === includesArray[i].id) {
            //merging two objects
            
            return Object.assign({}, item, includesArray[i]);
        }
    });
}