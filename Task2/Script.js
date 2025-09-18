
const checkNumber=()=>{
    let num=prompt("Enter a number");
    num=Number(num);
    if(num==0){
       alert("The number is zero");
    }else if(num>0){
       alert("The number is positive");

    } else{
       alert("The number is negative");
    }   
}
