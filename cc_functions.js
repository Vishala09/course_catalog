function filterSearch()
{
	let filter=document.getElementById('filter').value;
	let category = getRadioValue();
	let result=[];let temp=[];
      if(category!="All")
      {
		console.log("NOT ALL");

        for (let index = 0; index < coursesdata.length; index++) {
          const element = coursesdata[index];
          if(element.category==category)
          {
             temp.push(element);
          }
        }
      }
      else
      {
		  temp=coursesdata;
		  console.log("category:",category,"temp ",temp);
      }
     
      if(filter!==undefined || filter!=="")
      {
		console.log("filter:",filter)
		
        for (let index = 0; index < temp.length; index++) {
		  let element = temp[index];
		  
		  filter=filter.toString().toLowerCase();
        
		 if(element.duration.toLowerCase().includes(filter))
         {
			 console.log("duration")
            result.push(element);
		 }
		 else if(element.weeks.toString().toLowerCase().includes(filter))
         {
			console.log("weeks")
            result.push(element);
		 }
         else if(element.title.toLowerCase().includes(filter))
         {
			console.log("title",index);
            result.push(element);
         }
         else if(element.instructor_name.toLowerCase().includes(filter))
         {
			console.log("instructor");
            result.push(element);
         }
		 else if(document.getElementById("desc"+index)!=null && document.getElementById("desc"+index).textContent.toLowerCase().includes(filter))
				{	
							console.log("desc");
							result.push(element);
				}
		 else if(element.text.toLowerCase().includes(filter))
         {
			console.log("text");
            result.push(element);
		 }
		 
		 
         }
        // console.log("result with filter",result);
      }
      else
      {
         result=temp;
      }
      courses=result;
	  printCourses(courses,0);
	  console.log("filtered courses",courses);
}

function getRadioValue() { 
            var ele = document.getElementsByName('categories'); 
              
            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked) 
					{
						return ele[i].value;
					}
            } 
		} 
		
function printCourses(courses,flag)
{
	console.log("flag",flag);
	document.getElementById("courselength").innerHTML=courses.length+" courses open for registration";
	const myNode = document.getElementById("courses");
  	myNode.innerHTML = '';
	for (let index = 0; index < courses.length; index++) {
			   const element = courses[index];

			   let div_card = document.createElement("DIV");
			   div_card.setAttribute("id","card"+index);
			   div_card.className="card col-6";
			   document.getElementById("courses").appendChild(div_card);

			   let title = document.createElement("H3");
			   //title.className="card";
               title.innerHTML=element.title;
			   title.setAttribute("id","title"+index);
			   document.getElementById("card"+index).appendChild(title);
			   

			   let instructor = document.createElement("H3");
			   //instructor.className="card";
			   instructor.innerHTML=element.instructor_name;
			   document.getElementById("card"+index).appendChild(instructor);

			   let desc = document.createElement("DIV");
			   desc.className="card-text";
			   desc.setAttribute("id","desc"+index);
			   desc.innerHTML=element.description;
			   document.getElementById("card"+index).appendChild(desc);
			  


	  
			   let text_el = document.createElement("H4");
			   // text_el.className="card-text";
			   let text=getStatusText(element.start_date,element.end_date);
			   text_el.innerHTML=text;
			   if(flag===1)
			   		coursesdata[index].text=text;
			   document.getElementById("card"+index).appendChild(text_el);
			   
			   let dates = document.createElement("P");
			   dates.style.fontWeight="bold";
			   // start_date.className="card-text";
			   let duration=getDuration(element.start_date,element.end_date);
			   dates.innerHTML=duration;
			   if(flag===1)
			   		coursesdata[index].duration=duration; 
			   document.getElementById("card"+index).appendChild(dates);

	
			   let time = document.createElement("P");
			   time.style.fontWeight="bold";
			   // time.className="card-text";
			   let weeks=getWeeks(element.start_date,element.end_date);
			   time.innerHTML=weeks+"week course , "+element.estimated_workload;
			   if(flag===1)
			   		coursesdata[index].weeks=weeks+"week course , "+element.estimated_workload;
			   document.getElementById("card"+index).appendChild(time);

		   }

		   
}

function getDuration(start_date,end_date)
{
	let d_s = new Date(start_date);
    let start_month= monthNames[d_s.getMonth()];
    let start_year= d_s.getFullYear();

    let d_e = new Date(end_date);
    let end_month= monthNames[d_e.getMonth()];
	let end_year= d_e.getFullYear();

	let duration = start_month+" , "+start_year +" - "+end_month+" , "+end_year;
	return duration;
}

function getStatusText(start_date,end_date)
{
	  let sd=new Date(start_date);
      let ed=new Date(end_date);
      let td=new Date();
      let text;
      if(td<sd)
      {
        text="Pre registration";
      }
      else if(sd<=td && td<=ed)
      {
          text="Ongoing"
      }
      else
      {
          text="Completed"
	  }
	  
	  return text;
}

function getWeeks(start_date,end_date)
{
	d_s = new Date(start_date);
    d_e = new Date(end_date);
    let Difference_In_Time = d_e.getTime() - d_s.getTime(); 
    let weeks = ( (Difference_In_Time) / (1000 * 60 * 60 * 24 * 7));
	

	return weeks+" ";
}