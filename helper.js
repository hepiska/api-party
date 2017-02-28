module.exports={
  getToday : function(weater){
    let month=new Date().getMonth();
    if (month<10) {
      month=`0${month+1}`;
    } else {
      month=`${month+1}`;
    }
    let date=`${new Date().getFullYear()}-${month}-${new Date().getDate()}`;
    //console.log(weater);
    let outpout=[];
    for (var i = 0; i < weater.length; i++) {
       var weaterdate=weater[i].dt_txt.split(' ');
       if(weaterdate[0]==date){
         outpout.push(weater[i]);
       }else {
         return outpout
       }
    }
  }

}
