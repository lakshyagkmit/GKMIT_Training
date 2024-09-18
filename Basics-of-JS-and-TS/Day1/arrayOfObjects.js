const user = [{
	name: "paras",
	address: "udaipur",
	phone: 789013
},{
	name: "Lakshya",
	address: "Shobhagpura",
	phone: 789012
},{
	name: "Ayush",
	address: "Udaipur",
	phone: 78944
}];

user.filter((ele) => {
	if(ele.phone %2 === 0){
		console.log(ele.name);
	}
});

user.forEach((ele) => {
	console.log(`${ele.name}:${ele.address}`);
})

