const generateID = (firstCharacter) => {
    let gid = firstCharacter;
    const sampleSpace = [0,1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < 5; i++) {
        gid += sampleSpace[Math.floor(Math.random()*sampleSpace.length)];
    }
    return gid;
}
const checkValue = 2;
const checkValue2 = '2';

const array = [0,1,2,3];

console.log(array.length);



