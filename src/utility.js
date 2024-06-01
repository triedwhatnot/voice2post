export function capitalizeFirstLetter(string) {
    try{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    catch(e){
        console.log("Error in capitalizeFirstLetter", e);
    }
}