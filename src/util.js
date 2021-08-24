 export const sortData = (data) => {
    const sortedData = [...data];
    
    //Step 01
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

    //Step 02
    //sortedData.sort((a, b) => {
       //if (a.cases > b.cases) {
            //return -1; //return false.0
        //}else{
            //return 1; //return true
        //}
    //})
//return sortedData;

};