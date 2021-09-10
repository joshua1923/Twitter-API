"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeTweetArrayObjects = void 0;
const mergeTweetArrayObjects = (dataArray, includesArray) => {
    return dataArray.map((item, i) => {
        if (item.author_id === includesArray[i].id) {
            //merging two objects
            return Object.assign({}, item, includesArray[i]);
        }
    });
};
exports.mergeTweetArrayObjects = mergeTweetArrayObjects;
//# sourceMappingURL=helpers.js.map